<script lang="ts">
	import { MapPin } from 'lucide-svelte';
	import { weatherModule } from '$packages/weather/module/weather.module.svelte';
	import CommandPalette from '../CommandPalette.svelte';
	import ThemeToggle from './ThemeToggle.svelte';

	const city = $derived(weatherModule.snapshot?.city ?? null);
	const location = $derived(city ? [city.name, city.country].filter(Boolean).join(', ') : 'Localizando…');
</script>

<header class="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
	<div class="flex shrink-0 items-center gap-2 text-content">
		<MapPin class="size-5 text-brand" />
		<span class="title-sm">{location}</span>
	</div>

	<div class="flex-1 sm:max-w-md sm:mx-auto">
		<CommandPalette />
	</div>

	<div class="shrink-0 self-end sm:self-auto">
		<ThemeToggle />
	</div>
</header>
