<script lang="ts">
	import { MapPin } from 'lucide-svelte';
	import { weatherSceneSrc } from '$components/assets/weather-assets';
	import UnitToggle from './common/UnitToggle.svelte';
	import Metric from '$components/composes/Metric.svelte';
	import WeatherIcon from '$components/composes/WeatherIcon.svelte';
	import { formatFullDate, formatTemperature, formatTime, formatWeekday } from '$components/composes/format';
	import { weatherModule } from '$packages/weather/module/weather.module.svelte';

	interface Props {
		class?: string;
	}

	const { class: className = '' }: Props = $props();

	const day = $derived(weatherModule.selectedDay);
	const city = $derived(weatherModule.snapshot?.city ?? null);
	const current = $derived(weatherModule.snapshot?.current ?? null);
	const live = $derived(weatherModule.isToday ? current : null);

	const headline = $derived(live ? live.temp : (day?.max ?? 0));
	const code = $derived(live ? live.weatherCode : (day?.weatherCode ?? 0));
	const isDay = $derived(live ? live.isDay : true);
	const description = $derived(live ? live.description : (day?.description ?? ''));
	const location = $derived(city ? [city.name, city.country].filter(Boolean).join(', ') : '');

	const dash = '—';
</script>

{#if day}
	<section
		class="relative isolate overflow-hidden rounded-3xl border border-white/10 p-5 text-white [text-shadow:0_1px_10px_rgb(0_0_0/0.45)] shadow-[0_24px_50px_-26px_rgba(70,30,200,0.8)] sm:p-6 {className}"
	>
		<img
			src={weatherSceneSrc(code, isDay)}
			alt=""
			aria-hidden="true"
			class="absolute inset-0 -z-20 size-full object-cover"
		/>
		<div
			class="absolute inset-0 -z-10 bg-linear-to-br from-[hsl(250_60%_12%/0.6)] via-[hsl(250_60%_12%/0.1)] to-[hsl(232_60%_8%/0.6)]"
		></div>

		<UnitToggle variant="hero" class="absolute top-4 right-4 z-10 sm:top-5 sm:right-5" />

		<div class="flex items-start justify-between gap-4 pr-28">
			<div class="flex min-w-0 flex-col gap-2">
				<h2 class="title-md flex items-center gap-2">
					<MapPin class="size-5 shrink-0 text-white/90" />
					<span class="truncate">{location}</span>
				</h2>
				<span class="paragraph-md first-letter:uppercase text-white/80">
					{weatherModule.isToday ? 'Hoje' : formatWeekday(day.isoDate)}, {formatFullDate(day.isoDate)}
				</span>
			</div>
		</div>

		<div class="flex items-center justify-between gap-4">
			<div class="flex items-center gap-4 sm:gap-6">
				<span class="text-[4.5rem] leading-none font-bold tracking-tight sm:text-[5rem]">
					{formatTemperature(headline)}
				</span>
				<div class="flex flex-col paragraph-lg">
					<span class="font-semibold capitalize">{description}</span>
					<span class="paragraph-md text-white/75">
						Máx {formatTemperature(day.max)} · Mín {formatTemperature(day.min)}
					</span>
				</div>
			</div>
			<WeatherIcon {code} {isDay} size={120} class="float-soft hidden sm:block" />
			<WeatherIcon {code} {isDay} size={96} class="float-soft sm:hidden" />
		</div>

		<div class="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
			<Metric icon="temp-hot" label="Sensação" value={live ? formatTemperature(live.feelsLike) : dash} />
			<Metric icon="wind-metric" label="Vento" value="{live ? live.windSpeed : day.windMax} km/h" />
			<Metric icon="humidity" label="Umidade" value={live ? `${live.humidity}%` : dash} />
			<Metric icon="pressure" label="Pressão" value={live ? `${live.pressure} hPa` : dash} />
			<Metric icon="sunrise" label="Nascer do sol" value={formatTime(day.sunrise)} />
			<Metric icon="sunset-metric" label="Pôr do sol" value={formatTime(day.sunset)} />
		</div>
	</section>
{/if}
