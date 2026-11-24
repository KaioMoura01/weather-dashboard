<script lang="ts">
	import Skeleton from '$components/composes/Skeleton.svelte';

	interface Props {
		class?: string;
	}

	const { class: className = '' }: Props = $props();

	const METRIC_SLOTS = [0, 1, 2, 3, 4, 5];
</script>

<!-- Espelha SelectedDayCard: mesmo raio, padding, toggle no canto, ícone e 6 métricas. -->
<section
	class="relative overflow-hidden rounded-3xl border border-white/10 bg-linear-to-br from-[hsl(250_45%_16%)] to-[hsl(232_50%_9%)] p-5 sm:p-6 {className}"
>
	<Skeleton class="absolute top-4 right-4 h-10 w-24 rounded-full bg-white/10 sm:top-5 sm:right-5" />

	<div class="flex flex-col gap-2 pr-28">
		<Skeleton class="h-7 w-44 bg-white/10" />
		<Skeleton class="h-6 w-32 bg-white/10" />
	</div>

	<div class="flex items-center justify-between gap-4">
		<div class="flex items-center gap-4 sm:gap-6">
			<Skeleton class="h-[4.5rem] w-32 bg-white/10 sm:h-20 sm:w-44" />
			<div class="flex flex-col gap-2">
				<Skeleton class="h-6 w-24 bg-white/10" />
				<Skeleton class="h-5 w-32 bg-white/10" />
			</div>
		</div>
		<Skeleton class="size-24 shrink-0 rounded-full bg-white/10 sm:size-[7.5rem]" />
	</div>

	<div class="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
		{#each METRIC_SLOTS as slot (slot)}
			<Skeleton class="h-[3.875rem] rounded-2xl bg-white/10" />
		{/each}
	</div>
</section>
