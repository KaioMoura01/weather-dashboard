<script lang="ts">
	import { CloudSun } from 'lucide-svelte';
</script>

<div class="flex flex-col items-center gap-3 py-16 text-center">
	<span class="grid size-16 place-items-center rounded-full bg-surface-elevated text-brand">
		<CloudSun class="size-8" />
	</span>
	<p class="title-sm text-content">Busque uma cidade para começar</p>
	<p class="paragraph-md max-w-sm text-content-muted">
		Veja a temperatura atual, a previsão de 5 dias e, se a cidade for costeira, os dados das marés.
	</p>
</div>
