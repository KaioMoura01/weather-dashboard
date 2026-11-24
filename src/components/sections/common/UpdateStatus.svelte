<script lang="ts">
	import { RefreshCw } from 'lucide-svelte';
	import { weatherModule } from '$packages/weather/module/weather.module.svelte';

	const TICK_MS = 30_000;
	let now = $state(Date.now());

	const minutes = $derived(
		weatherModule.updatedAt === null ? 0 : Math.max(0, Math.floor((now - weatherModule.updatedAt) / 60_000))
	);
	const label = $derived(minutes < 1 ? 'Atualizado agora' : `Atualizado há ${minutes} min`);

	$effect(() => {
		const timer = setInterval(() => (now = Date.now()), TICK_MS);
		return () => clearInterval(timer);
	});

	// Cada nova carga zera o relógio imediatamente.
	$effect(() => {
		if (weatherModule.updatedAt !== null) {
			now = Date.now();
		}
	});
</script>

<div class="paragraph-sm flex flex-wrap items-center gap-x-2 text-content-muted">
	<span>Dados por Open-Meteo</span>
	<span aria-hidden="true">·</span>
	<span>{label}</span>
	<button
		type="button"
		onclick={() => weatherModule.refresh()}
		disabled={weatherModule.isRefreshing}
		aria-label="Atualizar dados"
		class="grid size-7 place-items-center rounded-full transition-colors hover:text-content"
	>
		<RefreshCw class="size-4 {weatherModule.isRefreshing ? 'animate-spin' : ''}" />
	</button>
</div>
