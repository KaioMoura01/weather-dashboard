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
	uvIndex: number;
	/** Hora local da cidade (ISO sem fuso), usada para posicionar o sol. */
	localTime: string;
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
	uvMax: number;
}

export interface HourlyPrecip {
	isoTime: string;
	probability: number;
}

export interface HourlyForecast {
	isoTime: string;
	temp: number;
	weatherCode: number;
	isDay: boolean;
}

export interface WeatherSnapshot {
	city: City;
	current: CurrentWeather;
	forecast: ForecastDay[];
	hourly: HourlyPrecip[];
	hourlyForecast: HourlyForecast[];
}

export interface CityBrief {
	city: City;
	temp: number;
	description: string;
	weatherCode: number;
	isDay: boolean;
}
