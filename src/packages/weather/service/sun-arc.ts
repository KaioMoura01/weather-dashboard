import type { SunArc } from '../types/insights';

const MS_PER_MINUTE = 60_000;

/** Posição do sol entre nascer e pôr. Horários são locais da cidade (ISO sem fuso). */
export function sunArc(sunrise: string, sunset: string, localTime: string, isToday: boolean): SunArc {
	const rise = new Date(sunrise).getTime();
	const set = new Date(sunset).getTime();
	const daylightMinutes = Math.round((set - rise) / MS_PER_MINUTE);

	if (!isToday) {
		return { state: 'other', progress: null, daylightMinutes, remainingMinutes: null };
	}

	const now = new Date(localTime).getTime();

	if (now < rise) {
		return { state: 'before', progress: 0, daylightMinutes, remainingMinutes: null };
	}

	if (now > set) {
		return { state: 'after', progress: 1, daylightMinutes, remainingMinutes: null };
	}

	return {
		state: 'day',
		progress: (now - rise) / (set - rise),
		daylightMinutes,
		remainingMinutes: Math.round((set - now) / MS_PER_MINUTE)
	};
}
