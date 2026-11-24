import { UNIT_STORAGE_KEY } from '../constants/config';
import type { TemperatureUnit } from '../types/unit';

/** Boundary for persisting the chosen temperature unit. */
export const unitsGateway = {
	readStored(): TemperatureUnit | null {
		if (typeof localStorage === 'undefined') {
			return null;
		}

		const value = localStorage.getItem(UNIT_STORAGE_KEY);
		return value === 'C' || value === 'F' ? value : null;
	},

	persist(unit: TemperatureUnit): void {
		if (typeof localStorage === 'undefined') {
			return;
		}

		localStorage.setItem(UNIT_STORAGE_KEY, unit);
	}
};
