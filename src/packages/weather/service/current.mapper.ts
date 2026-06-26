import type { City, CurrentWeather } from '../types/domain';
import type { ForecastResponseDTO } from '../types/dto';
import { describeWeatherCode } from './weather-code';

/** Builds the current-weather domain model from the Open-Meteo forecast response. */
export function toCurrentWeather(dto: ForecastResponseDTO, city: City): CurrentWeather {
	const current = dto.current;

	return {
		cityName: city.name,
		country: city.country,
		temp: Math.round(current.temperature_2m),
		feelsLike: Math.round(current.apparent_temperature),
		humidity: current.relative_humidity_2m,
		windSpeed: Math.round(current.wind_speed_10m),
		description: describeWeatherCode(current.weather_code),
		weatherCode: current.weather_code
	};
}
