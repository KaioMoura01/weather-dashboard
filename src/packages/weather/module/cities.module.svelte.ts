import { PRESET_CITIES } from '../constants/cities';
import { weatherService } from '../service/weather.service';
import type { City, CityBrief } from '../types/domain';
import { weatherModule } from './weather.module.svelte';

/** Facade for the "Outras grandes cidades" panel. */
class CitiesModule {
	private briefsValue = $state<CityBrief[]>([]);

	get briefs(): CityBrief[] {
		return this.briefsValue;
	}

	async load(): Promise<void> {
		if (this.briefsValue.length > 0) {
			return;
		}

		try {
			this.briefsValue = await weatherService.loadBriefs(PRESET_CITIES);
		} catch {
			this.briefsValue = [];
		}
	}

	open(city: City): void {
		weatherModule.select(city);
	}
}

export const citiesModule = new CitiesModule();
