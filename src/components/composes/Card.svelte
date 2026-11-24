<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		class?: string;
		children: Snippet;
	}

	const { class: className = '', children }: Props = $props();
</script>

<div class="glass-card rounded-3xl p-5 sm:p-6 {className}">
	{@render children()}
</div>
