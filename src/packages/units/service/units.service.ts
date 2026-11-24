import { DEFAULT_UNIT } from '../constants/config';
import type { TemperatureUnit } from '../types/unit';

/** Pure unit rules. The API always speaks °C; conversion happens only for display. */
export const unitsService = {
	resolveInitial(stored: TemperatureUnit | null): TemperatureUnit {
		return stored ?? DEFAULT_UNIT;
	},

	convert(celsius: number, unit: TemperatureUnit): number {
		if (unit === 'C') {
			return Math.round(celsius);
		}

		return Math.round((celsius * 9) / 5 + 32);
	}
};
