/** Raw response shapes returned by external APIs. Validated by Zod before use. */

export interface NominatimAddressDTO {
	country?: string;
	state?: string;
	city?: string;
	town?: string;
	village?: string;
	municipality?: string;
	county?: string;
}

export interface GeoResultDTO {
	name?: string;
	display_name: string;
	lat: string;
	lon: string;
	address?: NominatimAddressDTO;
}

export interface ForecastResponseDTO {
	current: {
		temperature_2m: number;
		apparent_temperature: number;
		relative_humidity_2m: number;
		wind_speed_10m: number;
		weather_code: number;
		is_day: number;
	};
	daily: {
		time: string[];
		weather_code: number[];
		temperature_2m_max: number[];
		temperature_2m_min: number[];
	};
}

export interface MarineDTO {
	hourly?: {
		time: string[];
		sea_level_height_msl: Array<number | null>;
		wave_height: Array<number | null>;
	};
}
