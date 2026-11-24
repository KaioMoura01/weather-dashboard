<script lang="ts">
	import { Building2 } from 'lucide-svelte';
	import { weatherSceneSrc } from '$components/assets/weather-assets';
	import Card from '$components/composes/Card.svelte';
	import WeatherIcon from '$components/composes/WeatherIcon.svelte';
	import { formatTemperature } from '$components/composes/format';
	import { citiesModule } from '$packages/weather/module/cities.module.svelte';

	interface Props {
		class?: string;
	}

	const { class: className = '' }: Props = $props();
</script>

<Card class="flex flex-col gap-4 {className}">
	<h2 class="title-sm flex items-center gap-2 text-content">
		<Building2 class="size-5 text-brand" /> Outras grandes cidades
	</h2>

	<ul class="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
		{#each citiesModule.briefs as brief (brief.city.name)}
			<li>
				<button
					type="button"
					onclick={() => citiesModule.open(brief.city)}
					class="group relative isolate flex h-20 w-full items-center gap-3 overflow-hidden rounded-2xl border border-white/10 px-4 text-left text-white transition-transform hover:-translate-y-0.5"
				>
					<img
						src={weatherSceneSrc(brief.weatherCode, brief.isDay, 'sm')}
						alt=""
						aria-hidden="true"
						class="absolute inset-0 -z-20 size-full object-cover transition-transform duration-500 group-hover:scale-110"
					/>
					<div class="absolute inset-0 -z-10 bg-linear-to-r from-[hsl(240_60%_8%/0.8)] to-[hsl(262_60%_20%/0.35)]"></div>
					<WeatherIcon code={brief.weatherCode} isDay={brief.isDay} size={48} />
					<div class="flex min-w-0 flex-1 flex-col">
						<span class="label-xl truncate">{brief.city.name}</span>
						<span class="paragraph-sm truncate capitalize text-white/75">{brief.description}</span>
					</div>
					<span class="title-md">{formatTemperature(brief.temp)}</span>
				</button>
			</li>
		{/each}
	</ul>
</Card>
