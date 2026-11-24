import type { HourlyForecast, HourlyPrecip } from '../types/domain';
import type { ForecastResponseDTO } from '../types/dto';

/** Maps the Open-Meteo hourly arrays into precipitation-probability points. */
export function toHourlyPrecip(dto: ForecastResponseDTO): HourlyPrecip[] {
	const hourly = dto.hourly;

	return hourly.time.map((isoTime, index) => ({
		isoTime,
		probability: hourly.precipitation_probability[index] ?? 0
	}));
}

/** Maps the Open-Meteo hourly arrays into temperature + condition points. */
export function toHourlyForecast(dto: ForecastResponseDTO): HourlyForecast[] {
	const hourly = dto.hourly;

	return hourly.time.map((isoTime, index) => ({
		isoTime,
		temp: Math.round(hourly.temperature_2m[index]),
		weatherCode: hourly.weather_code[index],
		isDay: hourly.is_day[index] === 1
	}));
}
