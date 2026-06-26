import type { ForecastDay } from '../types/domain';
import type { ForecastResponseDTO } from '../types/dto';
import { describeWeatherCode } from './weather-code';

/** Maps the Open-Meteo daily arrays into one domain entry per day. */
export function toForecastDays(dto: ForecastResponseDTO): ForecastDay[] {
	const daily = dto.daily;

	return daily.time.map((isoDate, index) => ({
		isoDate,
		min: Math.round(daily.temperature_2m_min[index]),
		max: Math.round(daily.temperature_2m_max[index]),
		description: describeWeatherCode(daily.weather_code[index]),
		weatherCode: daily.weather_code[index]
	}));
}
