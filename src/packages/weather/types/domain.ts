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
	pressure: number;
	description: string;
	weatherCode: number;
	isDay: boolean;
}

export interface ForecastDay {
	isoDate: string;
	min: number;
	max: number;
	description: string;
	weatherCode: number;
	sunrise: string;
	sunset: string;
	windMax: number;
	rainChance: number;
}

export interface HourlyPrecip {
	isoTime: string;
	probability: number;
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
	hourly: HourlyPrecip[];
	tide: TideReport;
}

export interface CityBrief {
	city: City;
	temp: number;
	description: string;
	weatherCode: number;
	isDay: boolean;
}
