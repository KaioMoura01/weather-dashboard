<script lang="ts">
	import type { ForecastDay } from '$packages/weather/types/domain';
	import WeatherIcon from './WeatherIcon.svelte';
	import { formatTemperature, formatWeekday } from './format';

	interface Props {
		day: ForecastDay;
	}

	const { day }: Props = $props();
</script>

<div
	class="flex h-full flex-col items-center gap-1 rounded-xl border border-border-subtle bg-surface px-3 py-4"
>
	<span class="label-lg capitalize text-content">{formatWeekday(day.isoDate)}</span>
	<WeatherIcon code={day.weatherCode} size={48} />
	<p
		class="line-clamp-2 min-h-[2.5rem] hyphens-auto break-words text-center capitalize text-content-muted paragraph-sm"
		title={day.description}
		lang="pt-BR"
	>
		{day.description}
	</p>
	<div class="mt-auto flex items-baseline gap-2">
		<span class="label-xl text-content">{formatTemperature(day.max)}</span>
		<span class="paragraph-md text-content-muted">{formatTemperature(day.min)}</span>
	</div>
</div>
