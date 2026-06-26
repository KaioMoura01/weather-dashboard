import {
	FORECAST_DAYS,
	GEO_LANGUAGE,
	GEO_RESULT_LIMIT,
	WIND_SPEED_UNIT
} from '../constants/config';
import {
	OPEN_METEO_FORECAST_URL,
	OPEN_METEO_GEO_URL,
	OPEN_METEO_MARINE_URL
} from '../constants/endpoints';
import type { City } from '../types/domain';
import type { ForecastResponseDTO, GeoResponseDTO, MarineDTO } from '../types/dto';
import { forecastResponseSchema, geoResponseSchema, marineSchema } from '../validators/schemas';
import { getJson } from './http-client';

const CURRENT_FIELDS =
	'temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code';
const DAILY_FIELDS = 'weather_code,temperature_2m_max,temperature_2m_min';

/** HTTP boundary for the weather domain. Builds URLs, never applies business rules. */
export const weatherGateway = {
	searchCities(query: string): Promise<GeoResponseDTO> {
		const url = withParams(OPEN_METEO_GEO_URL, {
			name: query,
			count: String(GEO_RESULT_LIMIT),
			language: GEO_LANGUAGE,
			format: 'json'
		});
		return getJson(url, geoResponseSchema);
	},

	fetchForecast(city: City): Promise<ForecastResponseDTO> {
		const url = withParams(OPEN_METEO_FORECAST_URL, {
			...coords(city),
			current: CURRENT_FIELDS,
			daily: DAILY_FIELDS,
			wind_speed_unit: WIND_SPEED_UNIT,
			timezone: 'auto',
			forecast_days: String(FORECAST_DAYS)
		});
		return getJson(url, forecastResponseSchema);
	},

	fetchMarine(city: City): Promise<MarineDTO> {
		const url = withParams(OPEN_METEO_MARINE_URL, {
			...coords(city),
			hourly: 'sea_level_height_msl,wave_height',
			timezone: 'auto',
			forecast_days: '1'
		});
		return getJson(url, marineSchema);
	}
};

function coords(city: City): Record<string, string> {
	return { latitude: String(city.lat), longitude: String(city.lon) };
}

function withParams(base: string, params: Record<string, string>): string {
	const url = new URL(base);
	Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, value));
	return url.toString();
}
