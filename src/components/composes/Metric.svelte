<script lang="ts">
	import { metricIconSrc, type MetricIcon } from '$components/assets/weather-assets';

	interface Props {
		icon: MetricIcon;
		label: string;
		value: string;
		hint?: string;
	}

	const { icon, label, value, hint = '' }: Props = $props();
</script>

<div class="metric-tile flex items-center gap-3 rounded-2xl px-4 py-2.5">
	<img src={metricIconSrc(icon)} alt="" aria-hidden="true" class="size-8 shrink-0 object-contain" />
	<div class="flex min-w-0 flex-1 flex-col">
		<span class="label-md text-white/70">{label}</span>
		<span class="label-xl text-white">{value}</span>
	</div>
	{#if hint}
		<span class="label-md shrink-0 text-white/70">{hint}</span>
	{/if}
</div>
