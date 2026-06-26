<script lang="ts">
	import { LoaderCircle } from 'lucide-svelte';

	interface Props {
		label?: string;
	}

	const { label = 'Carregando…' }: Props = $props();
</script>

<div class="flex items-center gap-2 text-content-muted" role="status">
	<LoaderCircle class="size-5 animate-spin" />
	<span class="paragraph-md">{label}</span>
</div>
