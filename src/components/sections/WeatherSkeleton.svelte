<script lang="ts">
	import Card from '$components/composes/Card.svelte';
	import Skeleton from '$components/composes/Skeleton.svelte';
	import HeroSkeleton from './HeroSkeleton.svelte';
	import InsightsSkeleton from './InsightsSkeleton.svelte';

	const RAIN_BAR_HEIGHTS = [100, 57, 5, 5, 29, 84, 86, 37];
	const HOUR_SLOTS = range(12);
	const DAY_SLOTS = range(7);
	const CITY_SLOTS = range(4);

	function range(length: number): number[] {
		return Array.from({ length }, (_, index) => index);
	}
</script>

<!-- Mesma grade e mesma ordem de WeatherDashboard. -->
<div class="grid grid-cols-1 gap-5 lg:grid-cols-3" aria-busy="true" aria-label="Carregando dados do clima">
	<HeroSkeleton class="lg:col-span-2" />

	<Card class="flex h-full flex-col gap-3 lg:col-span-1">
		<Skeleton class="h-6 w-36" />
		<div class="flex min-h-40 flex-1 items-stretch justify-between gap-2">
			{#each RAIN_BAR_HEIGHTS as height}
				<div class="flex min-w-0 flex-1 flex-col items-center gap-2">
					<Skeleton class="h-4 w-full max-w-8" />
					<div class="flex w-full max-w-9 flex-1 items-end rounded-full bg-surface p-0.5">
						<Skeleton tone="elevated" class="w-full rounded-full" style="height: {height}%" />
					</div>
					<Skeleton class="h-4 w-full max-w-6" />
				</div>
			{/each}
		</div>
	</Card>

	<Card class="flex flex-col gap-3 lg:col-span-3">
		<Skeleton class="h-6 w-44" />
		<div class="flex gap-2 overflow-hidden pb-1">
			{#each HOUR_SLOTS as slot (slot)}
				<Skeleton class="h-[7.125rem] min-w-[4.25rem] flex-1 shrink-0 rounded-2xl" />
			{/each}
		</div>
	</Card>

	<div class="flex gap-3 overflow-hidden px-1 py-2 lg:col-span-3">
		{#each DAY_SLOTS as slot (slot)}
			<Skeleton tone="elevated" class="h-[9.625rem] min-w-[5.25rem] flex-1 shrink-0 rounded-3xl" />
		{/each}
	</div>

	<InsightsSkeleton />

	<Card class="flex flex-col gap-4 lg:col-span-3">
		<Skeleton class="h-6 w-52" />
		<div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
			{#each CITY_SLOTS as slot (slot)}
				<Skeleton class="h-20 rounded-2xl" />
			{/each}
		</div>
	</Card>

	<Skeleton class="h-7 w-72 lg:col-span-3" />
</div>
