<script lang="ts">
	import Card from '$components/composes/Card.svelte';
	import Skeleton from '$components/composes/Skeleton.svelte';
</script>

<!-- Espelha UvCard, SunArcCard e MoonCard, na mesma ordem. -->
<Card class="flex flex-col gap-4">
	<Skeleton class="h-6 w-36" />
	<Skeleton class="h-12 w-32" />
	<Skeleton class="h-2.5 rounded-full" />
	<Skeleton class="h-4 w-full" />
	<Skeleton class="h-10 rounded-xl" />
</Card>

<Card class="flex flex-col gap-3">
	<Skeleton class="h-6 w-32" />
	<Skeleton class="mx-auto aspect-[240/122] w-full max-w-60 rounded-t-full" />
	<div class="flex justify-between">
		<Skeleton class="h-10 w-14" />
		<Skeleton class="h-10 w-14" />
	</div>
</Card>

<Card class="flex flex-col gap-4">
	<Skeleton class="h-6 w-32" />
	<div class="flex items-center gap-4">
		<Skeleton class="size-16 shrink-0 rounded-full" />
		<div class="flex flex-1 flex-col gap-2">
			<Skeleton class="h-7 w-28" />
			<Skeleton class="h-2 rounded-full" />
			<Skeleton class="h-4 w-24" />
		</div>
	</div>
	<div class="grid grid-cols-2 gap-2">
		<Skeleton class="h-14 rounded-xl" />
		<Skeleton class="h-14 rounded-xl" />
	</div>
</Card>
