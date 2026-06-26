import type { City } from '../../weather/types/domain';
import { HISTORY_MAX_ENTRIES } from '../constants/config';
import type { SearchEntry } from '../types/search-entry';

/** Business rules for search history: dedupe by location and cap the size. */
export const historyService = {
	add(existing: SearchEntry[], city: City): SearchEntry[] {
		const withoutDuplicate = existing.filter((entry) => !sameLocation(entry.city, city));
		const entry: SearchEntry = { city, searchedAt: Date.now() };
		return [entry, ...withoutDuplicate].slice(0, HISTORY_MAX_ENTRIES);
	},

	remove(existing: SearchEntry[], city: City): SearchEntry[] {
		return existing.filter((entry) => !sameLocation(entry.city, city));
	}
};

function sameLocation(a: City, b: City): boolean {
	return a.lat === b.lat && a.lon === b.lon;
}
