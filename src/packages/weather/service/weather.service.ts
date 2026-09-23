import { weatherGateway } from '../gateway/weather.gateway';
import type { City, CityBrief, WeatherSnapshot } from '../types/domain';
import { citySearchSchema } from '../validators/schemas';
import { toCities, toCity } from './city.mapper';
import { toCurrentWeather } from './current.mapper';
import { describeWeatherCode } from './weather-code';
import { toForecastDays } from './forecast.mapper';
import { toHourlyPrecip } from './hourly.mapper';
import { EMPTY_TIDE_REPORT, toTideReport } from './tide.mapper';
import type { TideReport } from '../types/domain';

/** Business rules for the weather domain. Orchestrates Gateway + mappers. */
export const weatherService = {
	async searchCities(rawQuery: string): Promise<City[]> {
		const query = citySearchSchema.parse(rawQuery);
		const results = await weatherGateway.searchCities(query);
		return toCities(results);
	},

	async loadSnapshot(city: City): Promise<WeatherSnapshot> {
		const [forecast, tide] = await Promise.all([
			weatherGateway.fetchForecast(city),
			loadTide(city)
		]);

		return {
			city,
			current: toCurrentWeather(forecast, city),
			forecast: toForecastDays(forecast),
			hourly: toHourlyPrecip(forecast),
			tide
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

/** Maré é um extra: falha de rede ou local sem cobertura marinha não deve derrubar a consulta principal. */
async function loadTide(city: City): Promise<TideReport> {
	try {
		const marine = await weatherGateway.fetchMarine(city);
		return toTideReport(marine);
	} catch {
		return EMPTY_TIDE_REPORT;
	}
}

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
