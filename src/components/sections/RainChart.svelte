<script lang="ts">
	import Card from '$components/composes/Card.svelte';
	import { formatHour, isoDateOf } from '$components/composes/format';
	import { weatherModule } from '$packages/weather/module/weather.module.svelte';
	import type { HourlyPrecip } from '$packages/weather/types/domain';
	import { metricIconSrc } from '$components/assets/weather-assets';

	interface Props {
		class?: string;
	}

	const { class: className = '' }: Props = $props();

	const bars = $derived(buildBars());

	function buildBars(): HourlyPrecip[] {
		const day = weatherModule.selectedDay;
		const hourly = weatherModule.snapshot?.hourly ?? [];

		if (!day) {
			return [];
		}

		return hourly.filter((point, index) => isoDateOf(point.isoTime) === day.isoDate && index % 3 === 0);
	}
</script>

<Card class="flex h-full flex-col gap-3 {className}">
	<h2 class="title-sm flex items-center gap-2 text-content">
		<img src={metricIconSrc('humidity')} alt="" aria-hidden="true" class="size-6 object-contain" />
		Chance de chuva
	</h2>

	<div class="flex min-h-40 flex-1 items-stretch justify-between gap-2">
		{#each bars as bar, index (bar.isoTime)}
			<div class="group flex flex-1 flex-col items-center gap-2" title="{bar.probability}% às {formatHour(bar.isoTime)}">
				<span class="label-md text-content">{bar.probability}%</span>
				<div class="flex w-full max-w-9 flex-1 items-end rounded-full bg-brand/10 p-0.5 dark:bg-black/40">
					<div
						class="rain-bar bar-grow w-full rounded-full transition-all duration-500 group-hover:brightness-125"
						style="height: {Math.max(bar.probability, 2)}%; --bar: {index}"
					></div>
				</div>
				<span class="label-md text-content-muted">{formatHour(bar.isoTime).toUpperCase()}</span>
			</div>
		{/each}
	</div>
</Card>
