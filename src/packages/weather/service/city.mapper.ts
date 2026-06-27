import type { City } from '../types/domain';
import type { GeoResultDTO, NominatimAddressDTO } from '../types/dto';

/** Converts Nominatim (OpenStreetMap) results into domain Cities. */
export function toCity(dto: GeoResultDTO): City {
	return {
		name: resolveName(dto),
		country: dto.address?.country ?? '',
		state: dto.address?.state ?? dto.address?.county,
		lat: Number(dto.lat),
		lon: Number(dto.lon)
	};
}

export function toCities(dtos: GeoResultDTO[]): City[] {
	return dtos.map(toCity);
}

function resolveName(dto: GeoResultDTO): string {
	return placeFromAddress(dto.address) ?? dto.name ?? dto.display_name.split(',')[0];
}

function placeFromAddress(address?: NominatimAddressDTO): string | undefined {
	if (!address) {
		return undefined;
	}

	return address.city ?? address.town ?? address.village ?? address.municipality;
}
