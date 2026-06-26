import type { City } from '../types/domain';
import type { GeoResultDTO } from '../types/dto';

/** Converts Open-Meteo geocoding DTOs into domain Cities. */
export function toCity(dto: GeoResultDTO): City {
	return {
		name: dto.name,
		country: dto.country ?? dto.country_code ?? '',
		state: dto.admin1,
		lat: dto.latitude,
		lon: dto.longitude
	};
}

export function toCities(dtos: GeoResultDTO[]): City[] {
	return dtos.map(toCity);
}
