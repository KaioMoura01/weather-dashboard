<script lang="ts">
	import Card from '$components/composes/Card.svelte';
	import { metricIconSrc } from '$components/assets/weather-assets';
	import { insightsModule } from '$packages/weather/module/insights.module.svelte';
	import { weatherModule } from '$packages/weather/module/weather.module.svelte';
	import type { UvTone } from '$packages/weather/types/insights';

	interface Props {
		class?: string;
	}

	const { class: className = '' }: Props = $props();

	const TONE_COLOR: Record<UvTone, string> = {
		low: '#22c55e',
		moderate: '#eab308',
		high: '#f97316',
		'very-high': '#ef4444',
		extreme: '#a855f7'
	};

	const SCALE_MARKS = [0, 3, 6, 8, 11];

	const uv = $derived(insightsModule.uv);
</script>

{#if uv}
	<Card class="flex flex-col gap-4 {className}">
		<h2 class="title-sm flex items-center gap-2 text-content">
			<img src={metricIconSrc('uv')} alt="" aria-hidden="true" class="size-6 object-contain" />
			Índice UV <span class="label-md font-normal text-content-muted">
				· {weatherModule.isToday ? 'agora' : 'máximo do dia'}
			</span>
		</h2>

		<div class="flex items-baseline gap-3">
			<span class="title-xl text-content">{uv.value}</span>
			<span class="title-sm" style="color: {TONE_COLOR[uv.tone]}">{uv.label}</span>
		</div>

		<div class="relative h-2.5 rounded-full bg-linear-to-r from-green-500 via-yellow-400 via-45% to-purple-500">
			<span
				class="absolute top-1/2 size-4.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-white shadow-lg transition-all duration-500"
				style="left: {uv.ratio * 100}%; background: {TONE_COLOR[uv.tone]}"
			></span>
		</div>

		<ul class="label-md -mt-2 flex justify-between text-content-muted" aria-hidden="true">
			{#each SCALE_MARKS as mark (mark)}
				<li>{mark}{mark === 11 ? '+' : ''}</li>
			{/each}
		</ul>

		<p class="paragraph-sm rounded-xl bg-brand/10 px-3 py-2 text-content dark:bg-black/30">{uv.advice}</p>
	</Card>
{/if}
