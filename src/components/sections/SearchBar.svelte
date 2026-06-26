<script lang="ts">
	import { Search } from 'lucide-svelte';
	import { weatherModule } from '$packages/weather/module/weather.module.svelte';

	let query = $state('');

	function submit(event: SubmitEvent): void {
		event.preventDefault();
		weatherModule.search(query);
	}
</script>

<form onsubmit={submit} class="flex flex-col md:flex-row gap-2">
	<div class="relative flex-1">
		<Search
			class="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-content-muted"
		/>
		<input
			bind:value={query}
			type="search"
			placeholder="Buscar cidade…"
			autocomplete="off"
			class="w-full rounded-xl border border-border-subtle bg-surface-elevated py-3 pl-12 pr-4 paragraph-md text-content outline-none transition-shadow focus:ring-2 focus:ring-brand"
		/>
	</div>
	<button
		type="submit"
		disabled={weatherModule.isBusy}
		class="rounded-xl bg-brand py-3 px-4 label-xl text-brand-contrast transition-opacity hover:opacity-90 disabled:opacity-50"
	>
		Buscar
	</button>
</form>
