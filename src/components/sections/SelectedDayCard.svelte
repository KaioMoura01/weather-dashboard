<script lang="ts">
	import { Droplets, Gauge, Sunrise, Sunset, Thermometer, Wind } from 'lucide-svelte';
	import Card from '$components/composes/Card.svelte';
	import Metric from '$components/composes/Metric.svelte';
	import WeatherIcon from '$components/composes/WeatherIcon.svelte';
	import { formatFullDate, formatTemperature, formatTime, formatWeekday } from '$components/composes/format';
	import { weatherModule } from '$packages/weather/module/weather.module.svelte';

	interface Props {
		class?: string;
	}

	const { class: className = '' }: Props = $props();

	const day = $derived(weatherModule.selectedDay);
	const current = $derived(weatherModule.snapshot?.current ?? null);
	const today = $derived(weatherModule.isToday);

	const headline = $derived(today && current ? current.temp : (day?.max ?? 0));
	const code = $derived(today && current ? current.weatherCode : (day?.weatherCode ?? 0));
	const isDay = $derived(today && current ? current.isDay : true);
	const description = $derived(today && current ? current.description : (day?.description ?? ''));

	const dash = '—';
</script>

{#if day}
	<Card class="flex flex-col gap-6 {className}">
		<div class="flex flex-wrap items-center justify-between gap-4">
			<div class="flex flex-col gap-1">
				<span class="label-lg capitalize text-content-muted">
					{today ? 'Hoje' : formatWeekday(day.isoDate)} · {formatFullDate(day.isoDate)}
				</span>
				<div class="flex items-center gap-4">
					<span class="title-xl text-content">{formatTemperature(headline)}</span>
					<div class="flex flex-col paragraph-md text-content-muted">
						<span class="capitalize text-content">{description}</span>
						<span>Máx {formatTemperature(day.max)} · Mín {formatTemperature(day.min)}</span>
					</div>
				</div>
			</div>
			<WeatherIcon {code} {isDay} size={104} />
		</div>

		<div class="grid grid-cols-2 gap-3 sm:grid-cols-3">
			<Metric icon={Thermometer} label="Sensação" value={today && current ? formatTemperature(current.feelsLike) : dash} />
			<Metric icon={Wind} label="Vento" value="{today && current ? current.windSpeed : day.windMax} km/h" />
			<Metric icon={Droplets} label="Umidade" value={today && current ? `${current.humidity}%` : dash} />
			<Metric icon={Gauge} label="Pressão" value={today && current ? `${current.pressure} hPa` : dash} />
			<Metric icon={Sunrise} label="Nascer do sol" value={formatTime(day.sunrise)} />
			<Metric icon={Sunset} label="Pôr do sol" value={formatTime(day.sunset)} />
		</div>
	</Card>
{/if}
