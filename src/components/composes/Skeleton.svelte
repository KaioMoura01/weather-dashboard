<script lang="ts">
	interface Props {
		class?: string;
		style?: string;
		/** 'surface' contrasta dentro de um Card (bg-surface-elevated); 'elevated' contrasta direto no fundo da página (bg-surface). */
		tone?: 'surface' | 'elevated';
	}

	const { class: className = '', style = '', tone = 'surface' }: Props = $props();
	const toneClass = $derived(tone === 'elevated' ? 'bg-surface-elevated' : 'bg-surface');
</script>

<div class="animate-pulse rounded-md {toneClass} {className}" {style} aria-hidden="true"></div>
