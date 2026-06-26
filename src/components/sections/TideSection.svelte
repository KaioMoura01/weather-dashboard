<script lang="ts">
	import { Waves } from 'lucide-svelte';
	import Card from '$components/composes/Card.svelte';
	import TideChart from '$components/composes/TideChart.svelte';
	import type { TideReport } from '$packages/weather/types/domain';

	interface Props {
		tide: TideReport;
	}

	const { tide }: Props = $props();
</script>

{#if tide.isCoastal}
	<Card>
		<div class="mb-4 flex items-center justify-between">
			<h2 class="title-sm flex items-center gap-2 text-content">
				<Waves class="size-5 text-brand" /> Marés
			</h2>
			{#if tide.maxWaveHeight !== null}
				<span class="label-md text-content-muted">
					Onda máx {tide.maxWaveHeight.toFixed(1)} m
				</span>
			{/if}
		</div>
		<TideChart points={tide.points} />
	</Card>
{/if}
