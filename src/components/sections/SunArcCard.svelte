<script lang="ts">
	import Card from '$components/composes/Card.svelte';
	import { formatDuration, formatTime } from '$components/composes/format';
	import { metricIconSrc } from '$components/assets/weather-assets';
	import { insightsModule } from '$packages/weather/module/insights.module.svelte';
	import { weatherModule } from '$packages/weather/module/weather.module.svelte';

	interface Props {
		class?: string;
	}

	const { class: className = '' }: Props = $props();

	const CENTER = { x: 120, y: 112 };
	const RADIUS = 96;

	const day = $derived(weatherModule.selectedDay);
	const sun = $derived(insightsModule.sun);
	const progress = $derived(sun?.progress ?? null);
	const marker = $derived(markerAt(progress ?? 0));
	const caption = $derived(describe());

	function markerAt(ratio: number): { x: number; y: number } {
		const angle = Math.PI * (1 - ratio);
		return { x: CENTER.x + RADIUS * Math.cos(angle), y: CENTER.y - RADIUS * Math.sin(angle) };
	}

	function describe(): string {
		if (!sun) {
			return '';
		}
		if (sun.state === 'day' && sun.remainingMinutes !== null) {
			return `Restam ${formatDuration(sun.remainingMinutes)} de luz`;
		}
		if (sun.state === 'after') {
			return 'O sol já se pôs';
		}
		return `${formatDuration(sun.daylightMinutes)} de luz solar`;
	}
</script>

{#if day && sun}
	<Card class="flex flex-col gap-3 {className}">
		<h2 class="title-sm flex items-center gap-2 text-content">
			<img src={metricIconSrc('sunrise')} alt="" aria-hidden="true" class="size-6 object-contain" />
			Arco do sol
		</h2>

		<svg viewBox="0 0 240 122" class="mx-auto w-full max-w-60" role="img" aria-label={caption}>
			<defs>
				<linearGradient id="sun-track" x1="0" x2="1">
					<stop offset="0" stop-color="#8b5cf6" />
					<stop offset="0.5" stop-color="#fbbf24" />
					<stop offset="1" stop-color="#f97316" />
				</linearGradient>
			</defs>
			<path
				d="M 24 112 A 96 96 0 0 1 216 112"
				fill="none"
				stroke="currentColor"
				class="text-content-muted/30"
				stroke-width="3"
				stroke-dasharray="2 6"
				stroke-linecap="round"
			/>
			{#if progress !== null && progress > 0}
				<path
					d="M 24 112 A 96 96 0 0 1 216 112"
					fill="none"
					stroke="url(#sun-track)"
					stroke-width="5"
					stroke-linecap="round"
					pathLength="100"
					stroke-dasharray="{progress * 100} 100"
				/>
			{/if}
			<line x1="8" y1="112" x2="232" y2="112" stroke="currentColor" class="text-content-muted/40" />
			{#if sun.state === 'day'}
				<circle cx={marker.x} cy={marker.y} r="14" fill="#fbbf24" opacity="0.25" />
				<circle cx={marker.x} cy={marker.y} r="8" fill="#fbbf24" stroke="white" stroke-width="2.5" />
			{/if}
		</svg>

		<div class="flex items-center justify-between">
			<div class="flex flex-col">
				<span class="label-md text-content-muted">Nascer</span>
				<span class="label-xl text-content">{formatTime(day.sunrise)}</span>
			</div>
			<span class="paragraph-sm text-center text-content-muted">{caption}</span>
			<div class="flex flex-col items-end">
				<span class="label-md text-content-muted">Pôr</span>
				<span class="label-xl text-content">{formatTime(day.sunset)}</span>
			</div>
		</div>
	</Card>
{/if}
