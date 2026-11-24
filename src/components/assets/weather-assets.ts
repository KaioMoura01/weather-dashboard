/** Mapa WMO → arquivos de /static/weather. Só apresentação, sem regra de domínio. */
const BASE = '/weather';

type Pair = readonly [day: string, night: string];

const CLEAR: Pair = ['clear-day', 'clear-night'];
const PARTLY: Pair = ['partly-day', 'partly-night'];
const FOG: Pair = ['fog', 'fog-night'];
const DRIZZLE: Pair = ['drizzle', 'rain-night'];
const RAIN_LIGHT: Pair = ['rain-light', 'rain-night'];
const RAIN: Pair = ['rain', 'rain-night'];
const RAIN_HEAVY: Pair = ['rain-heavy', 'rain-night'];
const FREEZING: Pair = ['freezing-rain', 'rain-night'];
const SNOW: Pair = ['snow', 'snow-night'];
const HAIL: Pair = ['hail', 'snow-night'];
const STORM: Pair = ['storm', 'storm-night'];
const STORM_HEAVY: Pair = ['storm-heavy', 'storm-night'];

const ICONS: Record<number, Pair> = {
	0: CLEAR,
	1: CLEAR,
	2: PARTLY,
	3: ['overcast', 'cloudy-night'],
	45: FOG,
	48: FOG,
	51: DRIZZLE,
	53: DRIZZLE,
	55: DRIZZLE,
	56: FREEZING,
	57: FREEZING,
	61: RAIN_LIGHT,
	63: RAIN,
	65: RAIN_HEAVY,
	66: FREEZING,
	67: FREEZING,
	71: SNOW,
	73: SNOW,
	75: SNOW,
	77: HAIL,
	80: RAIN,
	81: RAIN,
	82: RAIN_HEAVY,
	85: SNOW,
	86: SNOW,
	95: STORM,
	96: STORM_HEAVY,
	99: STORM_HEAVY
};

type SceneRange = readonly [from: number, to: number, scene: string];

const SCENES: SceneRange[] = [
	[0, 1, 'bg-clear'],
	[2, 2, 'bg-partly'],
	[3, 3, 'bg-cloudy'],
	[45, 48, 'bg-fog'],
	[51, 67, 'bg-rain'],
	[71, 77, 'bg-snow'],
	[80, 82, 'bg-rain'],
	[85, 86, 'bg-snow'],
	[95, 99, 'bg-storm']
];

export function weatherIconSrc(code: number, isDay = true): string {
	const pair = ICONS[code] ?? ['overcast', 'cloudy-night'];
	return `${BASE}/${isDay ? pair[0] : pair[1]}.webp`;
}

export type SceneSize = 'lg' | 'sm';

/** Cenário atmosférico; à noite céu limpo/parcial vira o cenário noturno. 'sm' é a versão leve para tiles. */
export function weatherSceneSrc(code: number, isDay = true, size: SceneSize = 'lg'): string {
	const suffix = size === 'sm' ? '-sm' : '';

	if (!isDay && code <= 2) {
		return `${BASE}/bg-night${suffix}.webp`;
	}

	const match = SCENES.find(([from, to]) => code >= from && code <= to);
	return `${BASE}/${match?.[2] ?? 'bg-cloudy'}${suffix}.webp`;
}

export type MetricIcon =
	| 'temp-hot'
	| 'temp-cold'
	| 'humidity'
	| 'wind-metric'
	| 'pressure'
	| 'sunrise'
	| 'sunset-metric'
	| 'uv'
	| 'moon-new'
	| 'moon-half'
	| 'moon-gibbous'
	| 'moon-full';

export function metricIconSrc(name: MetricIcon): string {
	return `${BASE}/${name}.webp`;
}
