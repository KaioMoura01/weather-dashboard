<script lang="ts">
	import { weatherIconSrc } from '$components/assets/weather-assets';

	interface Props {
		code: number;
		isDay?: boolean;
		size?: number;
		class?: string;
	}

	const { code, isDay = true, size = 64, class: className = '' }: Props = $props();
</script>

<img
	src={weatherIconSrc(code, isDay)}
	alt=""
	aria-hidden="true"
	width={size}
	height={size}
	loading="lazy"
	decoding="async"
	style="width: {size}px; height: {size}px"
	class="shrink-0 object-contain drop-shadow-[0_6px_14px_rgba(80,40,200,0.35)] {className}"
/>
