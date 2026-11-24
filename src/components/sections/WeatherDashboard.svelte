<script lang="ts">
	import { onMount } from 'svelte';
	import { RotateCcw } from 'lucide-svelte';
	import { citiesModule } from '$packages/weather/module/cities.module.svelte';
	import { weatherModule } from '$packages/weather/module/weather.module.svelte';
	import DayStrip from './DayStrip.svelte';
	import HourlyStrip from './HourlyStrip.svelte';
	import MoonCard from './MoonCard.svelte';
	import SunArcCard from './SunArcCard.svelte';
	import UvCard from './UvCard.svelte';
	import OtherCities from './OtherCities.svelte';
	import RainChart from './RainChart.svelte';
	import StatusBar from './StatusBar.svelte';
	import SelectedDayCard from './SelectedDayCard.svelte';
	import WeatherSkeleton from './WeatherSkeleton.svelte';
	import TopBar from './common/TopBar.svelte';

	const snapshot = $derived(weatherModule.snapshot);
	const cityKey = $derived(snapshot ? `${snapshot.city.lat},${snapshot.city.lon}` : '');
	const failed = $derived(weatherModule.status === 'error' && !snapshot);

	let previousCity = '';

	// Ao trocar de cidade (não no primeiro load nem no refresh), volta suavemente ao topo.
	$effect(() => {
		const changed = previousCity !== '' && cityKey !== '' && cityKey !== previousCity;
		previousCity = cityKey || previousCity;

		if (changed) {
			const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
			window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
		}
	});

	onMount(() => {
		weatherModule.locate();
		citiesModule.load();
	});
</script>

<div class="flex flex-col gap-6">
	<TopBar />

	{#if snapshot}
		<div
			class="transition-all duration-300 {weatherModule.isRefreshing
				? 'pointer-events-none scale-[0.995] opacity-50 blur-[2px] saturate-50'
				: ''}"
		>
			{#key cityKey}
				<div class="reveal-stagger grid grid-cols-1 gap-5 lg:grid-cols-3">
					<SelectedDayCard class="lg:col-span-2" />
					<RainChart class="lg:col-span-1" />
					<HourlyStrip class="lg:col-span-3" />
					<DayStrip class="lg:col-span-3" />
					<UvCard />
					<SunArcCard />
					<MoonCard />
					<OtherCities class="lg:col-span-3" />
					<StatusBar class="lg:col-span-3" />
				</div>
			{/key}
		</div>
	{:else if failed}
		<div class="grid place-items-center gap-3 py-24 text-center">
			<p class="paragraph-md text-content-muted">
				Não foi possível carregar o clima. Verifique sua conexão ou busque uma cidade.
			</p>
			<button
				type="button"
				onclick={() => weatherModule.locate()}
				class="label-lg bg-brand text-brand-contrast glow-brand flex items-center gap-2 rounded-lg px-4 py-2 transition-opacity hover:opacity-90"
			>
				<RotateCcw class="size-4" /> Tentar novamente
			</button>
		</div>
	{:else}
		<WeatherSkeleton />
	{/if}
</div>
