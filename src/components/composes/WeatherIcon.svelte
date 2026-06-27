<script lang="ts">
	import type { ComponentType } from 'svelte';
	import {
		Cloud,
		CloudDrizzle,
		CloudFog,
		CloudLightning,
		CloudMoon,
		CloudRain,
		CloudRainWind,
		CloudSnow,
		CloudSun,
		Moon,
		Snowflake,
		Sun
	} from 'lucide-svelte';

	interface Props {
		code: number;
		isDay?: boolean;
		size?: number;
		class?: string;
	}

	const { code, isDay = true, size = 64, class: className = '' }: Props = $props();

	// Only sky-visible conditions get a day/night variant (sol/lua).
	// Overcast, fog, rain, snow and storm hide the astros → ícone neutro.
	const DAY_NIGHT: Record<number, [ComponentType, ComponentType]> = {
		0: [Sun, Moon],
		1: [Sun, Moon],
		2: [CloudSun, CloudMoon]
	};

	const NEUTRAL: Record<number, ComponentType> = {
		3: Cloud,
		45: CloudFog,
		48: CloudFog,
		51: CloudDrizzle,
		53: CloudDrizzle,
		55: CloudDrizzle,
		56: CloudDrizzle,
		57: CloudDrizzle,
		61: CloudRain,
		63: CloudRain,
		65: CloudRainWind,
		66: CloudRain,
		67: CloudRainWind,
		71: CloudSnow,
		73: CloudSnow,
		75: CloudSnow,
		77: Snowflake,
		80: CloudRain,
		81: CloudRain,
		82: CloudRainWind,
		85: CloudSnow,
		86: CloudSnow,
		95: CloudLightning,
		96: CloudLightning,
		99: CloudLightning
	};

	const Icon = $derived(resolveIcon(code, isDay));

	function resolveIcon(weatherCode: number, day: boolean): ComponentType {
		const pair = DAY_NIGHT[weatherCode];

		if (pair) {
			return day ? pair[0] : pair[1];
		}

		return NEUTRAL[weatherCode] ?? Cloud;
	}
</script>

<Icon size={size} class="text-brand {className}" />
