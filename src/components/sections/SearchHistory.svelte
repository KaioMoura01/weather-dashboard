<script lang="ts">
	import { Clock, Trash2, X } from 'lucide-svelte';
	import { historyModule } from '$packages/history/module/history.module.svelte';
	import { weatherModule } from '$packages/weather/module/weather.module.svelte';
	import type { City } from '$packages/weather/types/domain';

	function label(city: City): string {
		return [city.name, city.country].filter(Boolean).join(', ');
	}
</script>

{#if historyModule.list.length > 0}
	<section class="flex flex-col gap-2">
		<div class="flex items-center justify-between">
			<h2 class="label-lg flex items-center gap-2 text-content-muted">
				<Clock class="size-4" /> Buscas recentes
			</h2>
			<button
				type="button"
				onclick={() => historyModule.clear()}
				class="flex items-center gap-1 paragraph-sm text-content-muted hover:text-content"
			>
				<Trash2 class="size-4" /> Limpar
			</button>
		</div>
		<ul class="flex overflow-x-auto [[ms-overflow-style:-ms-autohiding-scrollbar]] [&::-webkit-scrollbar]:hidden gap-2">
			{#each historyModule.list as entry (entry.searchedAt)}
				<li
					class="flex shrink-0 items-center gap-1 rounded-full border border-border-subtle bg-surface-elevated py-1 pl-3 pr-1"
				>
					<button
						type="button"
						onclick={() => weatherModule.select(entry.city)}
						class="label-md text-content"
					>
						{label(entry.city)}
					</button>
					<button
						type="button"
						onclick={() => historyModule.forget(entry.city)}
						aria-label="Remover {entry.city.name} do histórico"
						class="grid size-5 place-items-center rounded-full text-content-muted hover:text-content"
					>
						<X class="size-3" />
					</button>
				</li>
			{/each}
		</ul>
	</section>
{/if}
