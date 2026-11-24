<script lang="ts">
	import WeatherIcon from '$components/composes/WeatherIcon.svelte';
	import { formatTemperature, formatWeekday } from '$components/composes/format';
	import { weatherModule } from '$packages/weather/module/weather.module.svelte';

	interface Props {
		class?: string;
	}

	const { class: className = '' }: Props = $props();

	const days = $derived(weatherModule.snapshot?.forecast ?? []);
</script>

<div class="flex gap-3 overflow-x-auto px-1 py-2 [&::-webkit-scrollbar]:hidden {className}">
	{#each days as day, index (day.isoDate)}
		{@const active = index === weatherModule.selectedIndex}
		<button
			type="button"
			onclick={() => weatherModule.selectDay(index)}
			aria-pressed={active}
			class="flex min-w-[5.25rem] flex-1 shrink-0 flex-col items-center gap-1 rounded-3xl px-3 py-3 transition-all duration-200
				{active
				? 'day-active -translate-y-0.5 text-white'
				: 'glass-card text-content hover:-translate-y-0.5 hover:border-brand/60'}"
		>
			<span class="label-lg capitalize">{index === 0 ? 'Hoje' : formatWeekday(day.isoDate)}</span>
			<WeatherIcon code={day.weatherCode} size={52} />
			<span class="title-sm">{formatTemperature(day.max)}</span>
			<span class="paragraph-sm {active ? 'text-white/80' : 'text-content-muted'}">
				{formatTemperature(day.min)}
			</span>
		</button>
	{/each}
</div>
