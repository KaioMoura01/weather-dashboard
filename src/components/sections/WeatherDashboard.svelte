<script lang="ts">
	import EmptyState from '$components/composes/EmptyState.svelte';
	import Spinner from '$components/composes/Spinner.svelte';
	import { weatherModule } from '$packages/weather/module/weather.module.svelte';
	import CommandPalette from './CommandPalette.svelte';
	import CurrentWeatherSection from './CurrentWeatherSection.svelte';
	import ForecastSection from './ForecastSection.svelte';

	const snapshot = $derived(weatherModule.snapshot);
</script>

<div class="flex flex-col gap-5">
	<CommandPalette />

	{#if weatherModule.isBusy}
		<div class="grid place-items-center py-16">
			<Spinner label="Buscando dados do clima…" />
		</div>
	{:else if snapshot}
		<CurrentWeatherSection current={snapshot.current} city={snapshot.city} />
		<!-- <TideSection tide={snapshot.tide} /> -->
		<ForecastSection days={snapshot.forecast} />
	{:else if !snapshot}
		<EmptyState />
	{/if}
</div>
