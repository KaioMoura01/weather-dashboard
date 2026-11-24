<script lang="ts">
	import UpdateStatus from './common/UpdateStatus.svelte';

	interface Props {
		class?: string;
	}

	const { class: className = '' }: Props = $props();
</script>

<div class="flex flex-wrap items-center justify-between gap-3 {className}">
	<UpdateStatus />
</div>
