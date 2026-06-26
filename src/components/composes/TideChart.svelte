<script lang="ts">
	import type { TidePoint } from '$packages/weather/types/domain';
	import { formatTime } from './format';

	interface Props {
		points: TidePoint[];
	}

	const { points }: Props = $props();

	const WIDTH = 320;
	const HEIGHT = 90;

	const path = $derived(buildPath(points));
	const edges = $derived(pickEdges(points));

	function buildPath(items: TidePoint[]): string {
		if (items.length < 2) {
			return '';
		}

		const heights = items.map((point) => point.heightMeters);
		const min = Math.min(...heights);
		const span = Math.max(Math.max(...heights) - min, 0.01);

		return items
			.map((point, index) => {
				const x = (index / (items.length - 1)) * WIDTH;
				const y = HEIGHT - ((point.heightMeters - min) / span) * HEIGHT;
				return `${index === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`;
			})
			.join(' ');
	}

	function pickEdges(items: TidePoint[]): TidePoint[] {
		return items.length === 0 ? [] : [items[0], items[items.length - 1]];
	}
</script>

<div class="flex flex-col gap-2">
	<svg viewBox="0 0 {WIDTH} {HEIGHT}" class="h-24 w-full" preserveAspectRatio="none">
		<path d={path} fill="none" stroke="var(--color-brand)" stroke-width="2.5" stroke-linecap="round" />
	</svg>
	<div class="flex justify-between paragraph-sm text-content-muted">
		{#each edges as point (point.isoTime)}
			<span>{formatTime(point.isoTime)}</span>
		{/each}
	</div>
</div>
