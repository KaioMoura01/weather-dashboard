<script lang="ts">
	import { MapPin } from 'lucide-svelte';
	import Card from '$components/composes/Card.svelte';
	import { weatherModule } from '$packages/weather/module/weather.module.svelte';
	import type { City } from '$packages/weather/types/domain';

	function label(city: City): string {
		return [city.name, city.state, city.country].filter(Boolean).join(', ');
	}
</script>

<Card>
	<h2 class="title-sm mb-3 text-content">Selecione a cidade</h2>
	<ul class="flex flex-col gap-1">
		{#each weatherModule.results as city, i (label(city)+i)}
			<li>
				<button
					type="button"
					onclick={() => weatherModule.select(city)}
					class="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left paragraph-md text-content transition-colors hover:bg-surface"
				>
					<MapPin class="size-4 text-brand" />
					{label(city)}
				</button>
			</li>
		{/each}
	</ul>
</Card>
