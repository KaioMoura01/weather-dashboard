/** Domain models consumed by the UI. Decoupled from raw API DTOs. */

export interface City {
	name: string;
	country: string;
	state?: string;
	lat: number;
	lon: number;
}

export interface CurrentWeather {
	cityName: string;
	country: string;
	temp: number;
	feelsLike: number;
	humidity: number;
	windSpeed: number;
	description: string;
	weatherCode: number;
}

export interface ForecastDay {
	isoDate: string;
	min: number;
	max: number;
	description: string;
	weatherCode: number;
}

export interface TidePoint {
	isoTime: string;
	heightMeters: number;
}

export interface TideReport {
	isCoastal: boolean;
	points: TidePoint[];
	maxWaveHeight: number | null;
}

export interface WeatherSnapshot {
	city: City;
	current: CurrentWeather;
	forecast: ForecastDay[];
	tide: TideReport;
}
