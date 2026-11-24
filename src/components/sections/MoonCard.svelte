<script lang="ts">
	import Card from '$components/composes/Card.svelte';
	import { metricIconSrc } from '$components/assets/weather-assets';
	import { insightsModule } from '$packages/weather/module/insights.module.svelte';

	interface Props {
		class?: string;
	}

	const { class: className = '' }: Props = $props();

	const moon = $derived(insightsModule.moon);

	function inDays(days: number): string {
		if (days === 0) {
			return 'hoje';
		}
		return days === 1 ? 'amanhã' : `em ${days} dias`;
	}
</script>

{#if moon}
	<Card class="flex flex-col gap-4 {className}">
		<h2 class="title-sm flex items-center gap-2 text-content">
			<img src={metricIconSrc('moon-full')} alt="" aria-hidden="true" class="size-6 object-contain" />
			Fase da lua
		</h2>

		<div class="flex items-center gap-4">
			<img
				src={metricIconSrc(moon.icon)}
				alt=""
				aria-hidden="true"
				class="float-soft size-16 shrink-0 object-contain drop-shadow-[0_6px_16px_rgba(140,110,255,0.55)]
					{moon.mirrored ? '-scale-x-100' : ''} {moon.dim ? 'opacity-50' : ''}"
			/>
			<div class="flex flex-1 flex-col gap-1.5">
				<span class="title-md text-content">{moon.label}</span>
				<div class="h-2 overflow-hidden rounded-full bg-brand/15 dark:bg-black/40">
					<div class="rain-bar h-full rounded-full" style="width: {Math.max(moon.illumination, 3)}%"></div>
				</div>
				<span class="paragraph-sm text-content-muted">{moon.illumination}% iluminada</span>
			</div>
		</div>

		<dl class="grid grid-cols-2 gap-2">
			<div class="rounded-xl bg-brand/10 px-3 py-2 dark:bg-black/30">
				<dt class="label-md text-content-muted">Próxima cheia</dt>
				<dd class="label-lg text-content">{inDays(moon.daysToFull)}</dd>
			</div>
			<div class="rounded-xl bg-brand/10 px-3 py-2 dark:bg-black/30">
				<dt class="label-md text-content-muted">Próxima nova</dt>
				<dd class="label-lg text-content">{inDays(moon.daysToNew)}</dd>
			</div>
		</dl>
	</Card>
{/if}
