<script lang="ts">
	import { Clock } from 'lucide-svelte';
	import Card from '$components/composes/Card.svelte';
	import WeatherIcon from '$components/composes/WeatherIcon.svelte';
	import { formatHour, formatTemperature } from '$components/composes/format';
	import { insightsModule } from '$packages/weather/module/insights.module.svelte';
	import { weatherModule } from '$packages/weather/module/weather.module.svelte';

	interface Props {
		class?: string;
	}

	const { class: className = '' }: Props = $props();

	const points = $derived(insightsModule.hourly);
</script>

{#if points.length > 0}
	<Card class="flex flex-col gap-3 {className}">
		<h2 class="title-sm flex items-center gap-2 text-content">
			<Clock class="size-5 text-brand" />
			{weatherModule.isToday ? 'Próximas 24 horas' : 'Hora a hora'}
		</h2>

		<ul class="flex gap-2 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden">
			{#each points as point, index (point.isoTime)}
				{@const now = index === 0 && weatherModule.isToday}
				<li
					class="flex min-w-[4.25rem] flex-1 shrink-0 flex-col items-center gap-1 rounded-2xl px-2 py-3
						{now ? 'day-active text-white' : 'bg-brand/10 text-content dark:bg-black/30'}"
				>
					<span class="label-md {now ? 'text-white' : 'text-content-muted'}">
						{now ? 'Agora' : formatHour(point.isoTime)}
					</span>
					<WeatherIcon code={point.weatherCode} isDay={point.isDay} size={40} />
					<span class="label-xl">{formatTemperature(point.temp)}</span>
				</li>
			{/each}
		</ul>
	</Card>
{/if}
