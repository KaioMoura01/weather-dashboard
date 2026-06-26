import type { City } from '../../weather/types/domain';

export interface SearchEntry {
	city: City;
	searchedAt: number;
}
