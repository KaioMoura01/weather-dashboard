<script lang="ts">
	import { CloudSun } from 'lucide-svelte';
	import ThemeToggle from './ThemeToggle.svelte';
</script>

<header class="flex items-center justify-between">
	<div class="flex items-center gap-3">
		<span class="grid size-11 place-items-center rounded-2xl bg-brand text-brand-contrast">
			<CloudSun class="size-6" />
		</span>
		<div class="flex flex-col">
			<h1 class="title-md text-content">Dashboard de Clima</h1>
			<p class="paragraph-sm text-content-muted">Previsão de 5 dias e marés</p>
		</div>
	</div>
	<ThemeToggle />
</header>
