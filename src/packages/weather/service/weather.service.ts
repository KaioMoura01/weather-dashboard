import { weatherGateway } from '../gateway/weather.gateway';
import type { City, CityBrief, WeatherSnapshot } from '../types/domain';
import { citySearchSchema } from '../validators/schemas';
import { toCities, toCity } from './city.mapper';
import { toCurrentWeather } from './current.mapper';
import { describeWeatherCode } from './weather-code';
import { toForecastDays } from './forecast.mapper';
import { toHourlyPrecip } from './hourly.mapper';
import { toTideReport } from './tide.mapper';

/** Business rules for the weather domain. Orchestrates Gateway + mappers. */
export const weatherService = {
	async searchCities(rawQuery: string): Promise<City[]> {
		const query = citySearchSchema.parse(rawQuery);
		const results = await weatherGateway.searchCities(query);
		return toCities(results);
	},

	async loadSnapshot(city: City): Promise<WeatherSnapshot> {
		const [forecast, marine] = await Promise.all([
			weatherGateway.fetchForecast(city),
			weatherGateway.fetchMarine(city)
		]);

		return {
			city,
			current: toCurrentWeather(forecast, city),
			forecast: toForecastDays(forecast),
			hourly: toHourlyPrecip(forecast),
			tide: toTideReport(marine)
		};
	},

	async reverseGeocode(lat: number, lon: number): Promise<City> {
		const result = await weatherGateway.reverseGeocode(lat, lon);
		return toCity(result);
	},

	loadBriefs(cities: City[]): Promise<CityBrief[]> {
		return Promise.all(cities.map((city) => loadBrief(city)));
	}
};

async function loadBrief(city: City): Promise<CityBrief> {
	const brief = await weatherGateway.fetchBrief(city);

	return {
		city,
		temp: Math.round(brief.current.temperature_2m),
		description: describeWeatherCode(brief.current.weather_code),
		weatherCode: brief.current.weather_code,
		isDay: brief.current.is_day === 1
	};
}
