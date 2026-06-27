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

<div class="flex gap-3 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden {className}">
	{#each days as day, index (day.isoDate)}
		<button
			type="button"
			onclick={() => weatherModule.selectDay(index)}
			aria-pressed={index === weatherModule.selectedIndex}
			class="flex min-w-[5rem] flex-1 shrink-0 flex-col items-center gap-1 rounded-2xl border px-3 py-4 transition-colors
				{index === weatherModule.selectedIndex
				? 'border-brand bg-brand text-brand-contrast'
				: 'border-border-subtle bg-surface-elevated text-content hover:bg-surface'}"
		>
			<span class="label-lg capitalize">
				{index === 0 ? 'Hoje' : formatWeekday(day.isoDate)}
			</span>
			<WeatherIcon
				code={day.weatherCode}
				size={40}
				class={index === weatherModule.selectedIndex ? 'text-brand-contrast' : 'text-brand'}
			/>
			<span class="label-xl">{formatTemperature(day.max)}</span>
			<span class="paragraph-sm {index === weatherModule.selectedIndex ? 'text-brand-contrast' : 'text-content-muted'}">
				{formatTemperature(day.min)}
			</span>
		</button>
	{/each}
</div>
