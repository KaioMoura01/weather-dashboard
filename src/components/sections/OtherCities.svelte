<script lang="ts">
	import Card from '$components/composes/Card.svelte';
	import WeatherIcon from '$components/composes/WeatherIcon.svelte';
	import { formatTemperature } from '$components/composes/format';
	import { citiesModule } from '$packages/weather/module/cities.module.svelte';

	interface Props {
		class?: string;
	}

	const { class: className = '' }: Props = $props();
</script>

<Card class="flex flex-col gap-3 {className}">
	<h2 class="title-sm text-content">Outras grandes cidades</h2>

	<ul class="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
		{#each citiesModule.briefs as brief (brief.city.name)}
			<li>
				<button
					type="button"
					onclick={() => citiesModule.open(brief.city)}
					class="flex h-full w-full items-center gap-3 rounded-xl border border-border-subtle bg-surface px-3 py-2 text-left transition-colors hover:bg-surface-elevated"
				>
					<WeatherIcon code={brief.weatherCode} isDay={brief.isDay} size={32} />
					<div class="flex flex-1 flex-col">
						<span class="label-lg text-content">{brief.city.name}</span>
						<span class="paragraph-sm capitalize text-content-muted">{brief.description}</span>
					</div>
					<span class="title-sm text-content">{formatTemperature(brief.temp)}</span>
				</button>
			</li>
		{/each}
	</ul>
</Card>
