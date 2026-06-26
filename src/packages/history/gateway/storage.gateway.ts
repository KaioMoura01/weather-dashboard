import { HISTORY_STORAGE_KEY } from '../constants/config';
import type { SearchEntry } from '../types/search-entry';
import { searchEntriesSchema } from '../validators/schemas';

/** Persistence boundary: reads/writes the history collection to LocalStorage. */
export const storageGateway = {
	read(): SearchEntry[] {
		if (typeof localStorage === 'undefined') {
			return [];
		}

		const raw = localStorage.getItem(HISTORY_STORAGE_KEY);
		return raw ? parse(raw) : [];
	},

	write(entries: SearchEntry[]): void {
		if (typeof localStorage === 'undefined') {
			return;
		}

		localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(entries));
	}
};

function parse(raw: string): SearchEntry[] {
	const result = safeJson(raw);
	const parsed = searchEntriesSchema.safeParse(result);
	return parsed.success ? parsed.data : [];
}

function safeJson(raw: string): unknown {
	try {
		return JSON.parse(raw);
	} catch {
		return null;
	}
}
