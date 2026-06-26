<script lang="ts">
	import { Droplets, Thermometer, Wind } from 'lucide-svelte';
	import Card from '$components/composes/Card.svelte';
	import Metric from '$components/composes/Metric.svelte';
	import WeatherIcon from '$components/composes/WeatherIcon.svelte';
	import { formatTemperature } from '$components/composes/format';
	import type { City, CurrentWeather } from '$packages/weather/types/domain';

	interface Props {
		current: CurrentWeather;
		city: City;
	}

	const { current, city }: Props = $props();

	const location = $derived([city.name, current.country].filter(Boolean).join(', '));
</script>

<Card>
	<div class="flex flex-wrap items-center justify-between gap-4">
		<div class="flex flex-col gap-1">
			<h2 class="title-md text-content">{location}</h2>
			<p class="paragraph-md capitalize text-content-muted">{current.description}</p>
			<div class="mt-2 flex items-center gap-4">
				<span class="title-xl text-content">{formatTemperature(current.temp)}</span>
				<span class="paragraph-md text-content-muted">
					Sensação {formatTemperature(current.feelsLike)}
				</span>
			</div>
		</div>
		<WeatherIcon code={current.weatherCode} size={96} />
	</div>

	<div class="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
		<Metric icon={Droplets} label="Umidade" value="{current.humidity}%" />
		<Metric icon={Wind} label="Vento" value="{current.windSpeed} km/h" />
		<Metric icon={Thermometer} label="Sensação" value={formatTemperature(current.feelsLike)} />
	</div>
</Card>
