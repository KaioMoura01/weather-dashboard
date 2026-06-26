import type { TidePoint, TideReport } from '../types/domain';
import type { MarineDTO } from '../types/dto';

const EMPTY_REPORT: TideReport = { isCoastal: false, points: [], maxWaveHeight: null };

/** Builds a tide report; a location is "coastal" only when sea-level data exists. */
export function toTideReport(dto: MarineDTO): TideReport {
	const hourly = dto.hourly;

	if (!hourly) {
		return EMPTY_REPORT;
	}

	const points = collectPoints(hourly.time, hourly.sea_level_height_msl);

	if (points.length === 0) {
		return EMPTY_REPORT;
	}

	return {
		isCoastal: true,
		points,
		maxWaveHeight: maxOf(hourly.wave_height)
	};
}

function collectPoints(times: string[], heights: Array<number | null>): TidePoint[] {
	return times
		.map((isoTime, index) => ({ isoTime, heightMeters: heights[index] }))
		.filter((point): point is TidePoint => point.heightMeters !== null);
}

function maxOf(values: Array<number | null>): number | null {
	const present = values.filter((value): value is number => value !== null);
	return present.length === 0 ? null : Math.max(...present);
}
