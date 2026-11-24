import type { MoonReading } from '../types/insights';

const SYNODIC_DAYS = 29.530588853;
/** Lua nova de referência: 2000-01-06 18:14 UTC. */
const REFERENCE_NEW_MOON_MS = Date.UTC(2000, 0, 6, 18, 14);
const MS_PER_DAY = 86_400_000;

type Stage = Pick<MoonReading, 'label' | 'icon' | 'dim'>;

const NEW: Stage = { label: 'Lua nova', icon: 'moon-new', dim: true };
const CRESCENT: Stage = { label: 'Crescente', icon: 'moon-new', dim: false };
const QUARTER: Stage = { label: 'Quarto', icon: 'moon-half', dim: false };
const GIBBOUS: Stage = { label: 'Gibosa', icon: 'moon-gibbous', dim: false };
const FULL: Stage = { label: 'Lua cheia', icon: 'moon-full', dim: false };

/** Fração do ciclo lunar, 0 = nova, 0.5 = cheia. */
export function lunarCycle(isoDate: string): number {
	const noonUtc = new Date(`${isoDate}T12:00:00Z`).getTime();
	const cycles = (noonUtc - REFERENCE_NEW_MOON_MS) / MS_PER_DAY / SYNODIC_DAYS;
	return cycles - Math.floor(cycles);
}

export function moonReading(isoDate: string): MoonReading {
	const cycle = lunarCycle(isoDate);
	const waning = cycle > 0.5;
	const illumination = Math.round(((1 - Math.cos(2 * Math.PI * cycle)) / 2) * 100);
	const stage = stageFor(cycle);
	const label = qualify(stage, waning);

	return {
		label,
		illumination,
		icon: stage.icon,
		mirrored: waning,
		dim: stage.dim,
		daysToFull: daysUntil(cycle, 0.5),
		daysToNew: daysUntil(cycle, 0)
	};
}

function stageFor(cycle: number): Stage {
	const distance = Math.min(cycle, 1 - cycle);

	if (distance < 0.03) {
		return NEW;
	}
	if (Math.abs(cycle - 0.5) < 0.03) {
		return FULL;
	}
	if (distance < 0.22) {
		return CRESCENT;
	}
	if (distance < 0.28) {
		return QUARTER;
	}
	return distance < 0.47 ? GIBBOUS : FULL;
}

function qualify(stage: Stage, waning: boolean): string {
	if (stage === NEW || stage === FULL) {
		return stage.label;
	}

	if (stage === QUARTER) {
		return waning ? 'Quarto minguante' : 'Quarto crescente';
	}

	const base = stage === CRESCENT ? ['Crescente', 'Minguante'] : ['Gibosa crescente', 'Gibosa minguante'];
	return waning ? base[1] : base[0];
}

/** Dias até o ciclo chegar ao ponto `target` (0 = nova, 0.5 = cheia). */
function daysUntil(cycle: number, target: number): number {
	const remaining = (target - cycle + 1) % 1;
	return Math.round(remaining * SYNODIC_DAYS);
}
