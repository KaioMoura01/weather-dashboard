import { weatherGateway } from '../gateway/weather.gateway';
import type { City, WeatherSnapshot } from '../types/domain';
import { citySearchSchema } from '../validators/schemas';
import { toCities } from './city.mapper';
import { toCurrentWeather } from './current.mapper';
import { toForecastDays } from './forecast.mapper';
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
			tide: toTideReport(marine)
		};
	}
};
