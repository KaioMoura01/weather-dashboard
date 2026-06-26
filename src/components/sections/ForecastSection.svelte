<script lang="ts">
	import Card from '$components/composes/Card.svelte';
	import ForecastDayCard from '$components/composes/ForecastDayCard.svelte';
	import type { ForecastDay } from '$packages/weather/types/domain';

	interface Props {
		days: ForecastDay[];
	}

	const { days }: Props = $props();
</script>

<Card>
	<h2 class="title-sm mb-4 text-content">Próximos 5 dias</h2>
	<div class="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
		{#each days as day (day.isoDate)}
			<ForecastDayCard {day} />
		{/each}
	</div>
</Card>
