<script lang="ts">
	import { CloudRain } from 'lucide-svelte';
	import Card from '$components/composes/Card.svelte';
	import { formatHour, isoDateOf } from '$components/composes/format';
	import { weatherModule } from '$packages/weather/module/weather.module.svelte';
	import type { HourlyPrecip } from '$packages/weather/types/domain';

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

<Card class="flex h-full flex-col gap-4 {className}">
	<h2 class="title-sm flex items-center gap-2 text-content">
		<CloudRain class="size-5 text-brand" /> Chance de chuva
	</h2>

	<div class="flex min-h-40 flex-1 items-end justify-between gap-2">
		{#each bars as bar (bar.isoTime)}
			<div class="flex h-full flex-1 flex-col items-center gap-2">
				<span class="label-sm text-content-muted">{bar.probability}%</span>
				<div class="flex w-full flex-1 items-end overflow-hidden rounded-lg bg-surface">
					<div
						class="w-full rounded-lg bg-brand transition-all"
						style="height: {Math.max(bar.probability, 2)}%"
					></div>
				</div>
				<span class="label-sm text-content-muted">{formatHour(bar.isoTime)}</span>
			</div>
		{/each}
	</div>
</Card>
