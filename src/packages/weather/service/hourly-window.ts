import type { HourlyForecast } from '../types/domain';

const WINDOW_SIZE = 24;
const HOUR_PREFIX_LENGTH = 13;

/** Hoje: próximas 24h a partir da hora atual. Outros dias: as 24h daquela data. */
export function hourlyWindow(
	points: HourlyForecast[],
	isoDate: string,
	isToday: boolean,
	localTime: string
): HourlyForecast[] {
	if (!isToday) {
		return points.filter((point) => point.isoTime.startsWith(isoDate)).slice(0, WINDOW_SIZE);
	}

	const currentHour = localTime.slice(0, HOUR_PREFIX_LENGTH);
	const start = points.findIndex((point) => point.isoTime.slice(0, HOUR_PREFIX_LENGTH) >= currentHour);

	return start < 0 ? [] : points.slice(start, start + WINDOW_SIZE);
}
