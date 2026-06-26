<script lang="ts">
	import type { ComponentType } from 'svelte';

	interface Props {
		icon: ComponentType;
		label: string;
		value: string;
	}

	const { icon: Icon, label, value }: Props = $props();
</script>

<div class="flex items-center gap-3 rounded-xl bg-surface px-4 py-3">
	<Icon class="size-5 text-brand" />
	<div class="flex flex-col">
		<span class="label-sm text-content-muted">{label}</span>
		<span class="label-xl text-content">{value}</span>
	</div>
</div>
