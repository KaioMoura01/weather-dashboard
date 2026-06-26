import type { City } from '../../weather/types/domain';
import { storageGateway } from '../gateway/storage.gateway';
import { historyService } from '../service/history.service';
import type { SearchEntry } from '../types/search-entry';

/** Reactive facade for search history. Single interface between UI and storage. */
class HistoryModule {
	private entries = $state<SearchEntry[]>([]);

	get list(): SearchEntry[] {
		return this.entries;
	}

	hydrate(): void {
		this.entries = storageGateway.read();
	}

	record(city: City): void {
		this.entries = historyService.add(this.entries, city);
		storageGateway.write(this.entries);
	}

	forget(city: City): void {
		this.entries = historyService.remove(this.entries, city);
		storageGateway.write(this.entries);
	}

	clear(): void {
		this.entries = [];
		storageGateway.write(this.entries);
	}
}

export const historyModule = new HistoryModule();
