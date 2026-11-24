import type { UvReading, UvTone } from '../types/insights';

const SCALE_TOP = 12;

interface Band {
	upTo: number;
	tone: UvTone;
	label: string;
	advice: string;
}

const BANDS: Band[] = [
	{ upTo: 2.9, tone: 'low', label: 'Baixo', advice: 'Sem necessidade de proteção especial.' },
	{ upTo: 5.9, tone: 'moderate', label: 'Moderado', advice: 'Use protetor solar ao ficar muito tempo fora.' },
	{ upTo: 7.9, tone: 'high', label: 'Alto', advice: 'Protetor, óculos e sombra entre 10h e 16h.' },
	{ upTo: 10.9, tone: 'very-high', label: 'Muito alto', advice: 'Evite o sol do meio-dia e reaplique o protetor.' },
	{ upTo: Infinity, tone: 'extreme', label: 'Extremo', advice: 'Fique na sombra e use proteção total.' }
];

export function uvReading(value: number): UvReading {
	const band = BANDS.find((candidate) => value <= candidate.upTo) ?? BANDS[BANDS.length - 1];

	return {
		value,
		label: band.label,
		tone: band.tone,
		advice: band.advice,
		ratio: Math.min(value / SCALE_TOP, 1)
	};
}
