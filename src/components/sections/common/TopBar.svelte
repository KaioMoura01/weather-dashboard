<script lang="ts">
	import { Cloud } from 'lucide-svelte';
	import CommandPalette from '../CommandPalette.svelte';
	import ThemeToggle from './ThemeToggle.svelte';
</script>

<header class="flex flex-wrap items-center gap-3 sm:flex-nowrap sm:gap-5">
	<div class="flex shrink-0 items-center gap-3">
		<Cloud class="size-9 text-brand" strokeWidth={1.75} />
		<div class="flex flex-col leading-none">
			<span class="font-brand text-[0.625rem] tracking-[0.2em] text-content-muted">ULTIMATRIZ</span>
			<span class="title-md text-content">Clima</span>
		</div>
	</div>

	<div class="order-last basis-full sm:order-none sm:flex-1 sm:basis-0">
		<CommandPalette />
	</div>

	<div class="ml-auto shrink-0 sm:ml-0">
		<ThemeToggle />
	</div>
</header>
