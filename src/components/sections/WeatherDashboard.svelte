<script lang="ts">
	import { onMount } from 'svelte';
	import Spinner from '$components/composes/Spinner.svelte';
	import { citiesModule } from '$packages/weather/module/cities.module.svelte';
	import { weatherModule } from '$packages/weather/module/weather.module.svelte';
	import DayStrip from './DayStrip.svelte';
	import OtherCities from './OtherCities.svelte';
	import RainChart from './RainChart.svelte';
	import SelectedDayCard from './SelectedDayCard.svelte';
	import TopBar from './common/TopBar.svelte';

	const snapshot = $derived(weatherModule.snapshot);

	onMount(() => {
		weatherModule.locate();
		citiesModule.load();
	});
</script>

<div class="flex flex-col gap-6">
	<TopBar />

	{#if snapshot}
		<div class="grid gap-5 lg:grid-cols-3">
			<SelectedDayCard class="lg:col-span-2" />
			<RainChart class="lg:col-span-1" />
			<DayStrip class="lg:col-span-3" />
			<OtherCities class="lg:col-span-3" />
		</div>
	{:else}
		<div class="grid place-items-center py-24">
			<Spinner label="Carregando o clima da sua região…" />
		</div>
	{/if}
</div>
