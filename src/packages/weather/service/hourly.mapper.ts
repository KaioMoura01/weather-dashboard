import type { HourlyPrecip } from '../types/domain';
import type { ForecastResponseDTO } from '../types/dto';

/** Maps the Open-Meteo hourly arrays into precipitation-probability points. */
export function toHourlyPrecip(dto: ForecastResponseDTO): HourlyPrecip[] {
	const hourly = dto.hourly;

	return hourly.time.map((isoTime, index) => ({
		isoTime,
		probability: hourly.precipitation_probability[index] ?? 0
	}));
}
