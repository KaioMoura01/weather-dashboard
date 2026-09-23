<script lang="ts">
	import Card from '$components/composes/Card.svelte';
	import Skeleton from '$components/composes/Skeleton.svelte';

	const RAIN_BAR_HEIGHTS = [45, 70, 55, 85, 60, 75, 35, 50];
	const METRIC_SLOTS = range(6);
	const DAY_SLOTS = range(7);
	const CITY_SLOTS = range(4);

	function range(length: number): number[] {
		return Array.from({ length }, (_, index) => index);
	}
</script>

<div class="grid gap-5 lg:grid-cols-3" aria-busy="true" aria-label="Carregando dados do clima">
	<Card class="flex flex-col gap-6 lg:col-span-2">
		<div class="flex flex-wrap items-center justify-between gap-4">
			<div class="flex flex-col gap-3">
				<Skeleton class="h-4 w-40" />
				<div class="flex items-center gap-4">
					<Skeleton class="h-10 w-20" />
					<div class="flex flex-col gap-2">
						<Skeleton class="h-4 w-28" />
						<Skeleton class="h-4 w-36" />
					</div>
				</div>
			</div>
			<Skeleton class="size-24 rounded-full" />
		</div>

		<div class="grid grid-cols-2 gap-3 sm:grid-cols-3">
			{#each METRIC_SLOTS as slot (slot)}
				<Skeleton class="h-16 rounded-xl" />
			{/each}
		</div>
	</Card>

	<Card class="flex h-full flex-col gap-4 lg:col-span-1">
		<Skeleton class="h-5 w-32" />
		<div class="flex min-h-40 flex-1 items-end justify-between gap-2">
			{#each RAIN_BAR_HEIGHTS as height}
				<div class="flex h-full flex-1 flex-col items-center justify-end gap-2">
					<Skeleton class="h-3 w-6" />
					<Skeleton class="w-full rounded-lg" style="height: {height}%" />
					<Skeleton class="h-3 w-6" />
				</div>
			{/each}
		</div>
	</Card>

	<div class="flex gap-3 overflow-x-auto pb-1 lg:col-span-3">
		{#each DAY_SLOTS as slot (slot)}
			<Skeleton tone="elevated" class="h-28 min-w-[5rem] flex-1 shrink-0 rounded-2xl" />
		{/each}
	</div>

	<Card class="flex flex-col gap-3 lg:col-span-3">
		<Skeleton class="h-5 w-48" />
		<div class="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
			{#each CITY_SLOTS as slot (slot)}
				<Skeleton class="h-14 rounded-xl" />
			{/each}
		</div>
	</Card>
</div>
