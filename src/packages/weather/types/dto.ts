/** Raw response shapes returned by Open-Meteo APIs. Validated by Zod before use. */

export interface GeoResultDTO {
	name: string;
	latitude: number;
	longitude: number;
	country?: string;
	country_code?: string;
	admin1?: string;
}

export interface GeoResponseDTO {
	results?: GeoResultDTO[];
}

export interface ForecastResponseDTO {
	current: {
		temperature_2m: number;
		apparent_temperature: number;
		relative_humidity_2m: number;
		wind_speed_10m: number;
		weather_code: number;
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
