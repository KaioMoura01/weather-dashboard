import {
	FORECAST_DAYS,
	GEO_LANGUAGE,
	GEO_RESULT_LIMIT,
	WIND_SPEED_UNIT
} from '../constants/config';
import {
	NOMINATIM_REVERSE_URL,
	NOMINATIM_SEARCH_URL,
	OPEN_METEO_FORECAST_URL,
	OPEN_METEO_MARINE_URL
} from '../constants/endpoints';
import type { City } from '../types/domain';
import type { BriefResponseDTO, ForecastResponseDTO, GeoResultDTO, MarineDTO } from '../types/dto';
import {
	briefResponseSchema,
	forecastResponseSchema,
	geoResponseSchema,
	marineSchema,
	reverseGeoSchema
} from '../validators/schemas';
import { getJson } from './http-client';

const CURRENT_FIELDS =
	'temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,surface_pressure,weather_code,is_day';
const HOURLY_FIELDS = 'precipitation_probability';
const DAILY_FIELDS =
	'weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,wind_speed_10m_max,precipitation_probability_max';

/** HTTP boundary for the weather domain. Builds URLs, never applies business rules. */
export const weatherGateway = {
	searchCities(query: string): Promise<GeoResultDTO[]> {
		const url = withParams(NOMINATIM_SEARCH_URL, {
			q: query,
			format: 'jsonv2',
			addressdetails: '1',
			limit: String(GEO_RESULT_LIMIT),
			'accept-language': GEO_LANGUAGE
		});
		return getJson(url, geoResponseSchema);
	},

	fetchForecast(city: City): Promise<ForecastResponseDTO> {
		const url = withParams(OPEN_METEO_FORECAST_URL, {
			...coords(city),
			current: CURRENT_FIELDS,
			hourly: HOURLY_FIELDS,
			daily: DAILY_FIELDS,
			wind_speed_unit: WIND_SPEED_UNIT,
			timezone: 'auto',
			forecast_days: String(FORECAST_DAYS)
		});
		return getJson(url, forecastResponseSchema);
	},

	fetchBrief(city: City): Promise<BriefResponseDTO> {
		const url = withParams(OPEN_METEO_FORECAST_URL, {
			...coords(city),
			current: 'temperature_2m,weather_code,is_day',
			timezone: 'auto',
			forecast_days: '1'
		});
		return getJson(url, briefResponseSchema);
	},

	reverseGeocode(lat: number, lon: number): Promise<GeoResultDTO> {
		const url = withParams(NOMINATIM_REVERSE_URL, {
			lat: String(lat),
			lon: String(lon),
			format: 'jsonv2',
			zoom: '10',
			'accept-language': GEO_LANGUAGE
		});
		return getJson(url, reverseGeoSchema) as Promise<GeoResultDTO>;
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
