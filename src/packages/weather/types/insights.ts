/** View-ready readings derived from the snapshot. */

export type SunState = 'before' | 'day' | 'after' | 'other';

export interface SunArc {
	state: SunState;
	/** 0..1 ao longo do dia; nulo fora do dia de hoje. */
	progress: number | null;
	daylightMinutes: number;
	/** Minutos de luz restantes, só durante o dia de hoje. */
	remainingMinutes: number | null;
}

export interface MoonReading {
	label: string;
	illumination: number;
	icon: 'moon-new' | 'moon-half' | 'moon-gibbous' | 'moon-full';
	mirrored: boolean;
	dim: boolean;
	daysToFull: number;
	daysToNew: number;
}

export type UvTone = 'low' | 'moderate' | 'high' | 'very-high' | 'extreme';

export interface UvReading {
	value: number;
	label: string;
	tone: UvTone;
	advice: string;
	/** Posição na escala, 0..1. */
	ratio: number;
}
