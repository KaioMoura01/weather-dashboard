<script lang="ts">
	import type { ComponentType } from 'svelte';
	import {
		Cloud,
		CloudDrizzle,
		CloudFog,
		CloudLightning,
		CloudRain,
		CloudRainWind,
		CloudSnow,
		CloudSun,
		Snowflake,
		Sun
	} from 'lucide-svelte';

	interface Props {
		code: number;
		size?: number;
		class?: string;
	}

	const { code, size = 64, class: className = '' }: Props = $props();

	const ICONS: Record<number, ComponentType> = {
		0: Sun,
		1: CloudSun,
		2: CloudSun,
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

	const Icon = $derived(ICONS[code] ?? Cloud);
</script>

<Icon size={size} class="text-brand {className}" />
