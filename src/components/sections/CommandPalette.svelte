<script lang="ts">
	import { Search } from 'lucide-svelte';
	import Spinner from '$components/composes/Spinner.svelte';
	import { weatherModule } from '$packages/weather/module/weather.module.svelte';
	import SearchHistory from './SearchHistory.svelte';
	import SearchResults from './SearchResults.svelte';

	let open = $state(false);
	let query = $state('');
	let inputEl = $state<HTMLInputElement | null>(null);

	const canSubmit = $derived(query.trim().length >= 2 && !weatherModule.isBusy);

	function openPalette(): void {
		open = true;
	}

	function closePalette(): void {
		open = false;
		query = '';
	}

	function onKeydown(event: KeyboardEvent): void {
		if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
			event.preventDefault();
			toggle();
			return;
		}

		if (event.key === 'Escape' && open) {
			closePalette();
		}
	}

	function toggle(): void {
		if (open) {
			closePalette();
			return;
		}
		openPalette();
	}

	const SEARCH_DEBOUNCE_MS = 400;
	const MIN_QUERY_LENGTH = 2;

	function submit(event: SubmitEvent): void {
		event.preventDefault();
		if (canSubmit) {
			weatherModule.search(query);
		}
	}

	// Foca o input ao abrir.
	$effect(() => {
		if (open && inputEl) {
			inputEl.focus();
		}
	});

	// Busca automaticamente enquanto o usuário digita (com debounce), sem precisar
	// de Enter/Buscar. Erros ficam silenciosos aqui — a busca explícita já avisa.
	$effect(() => {
		const value = query.trim();

		if (value.length < MIN_QUERY_LENGTH) {
			weatherModule.clearSearch();
			return;
		}

		const timer = setTimeout(() => weatherModule.search(value, { silent: true }), SEARCH_DEBOUNCE_MS);
		return () => clearTimeout(timer);
	});

	// Fecha assim que uma cidade é escolhida (status vira 'loading'), revelando
	// a tela principal com skeleton por trás — não espera o snapshot terminar de carregar.
	$effect(() => {
		if (open && weatherModule.status === 'loading') {
			closePalette();
		}
	});
</script>

<svelte:window onkeydown={onKeydown} />

<button
	type="button"
	onclick={openPalette}
	class="flex w-full items-center gap-3 rounded-xl border border-border-subtle bg-surface-elevated px-4 py-3 text-left text-content-muted transition-colors hover:bg-surface"
>
	<Search class="size-5" />
	<span class="paragraph-md flex-1">Buscar cidade…</span>
	<kbd class="label-md rounded-md border border-border-subtle px-2 py-0.5">Ctrl K</kbd>
</button>

{#if open}
	<div class="fixed inset-0 z-50">
		<button
			type="button"
			aria-label="Fechar pesquisa"
			class="absolute inset-0 cursor-default bg-black/50 backdrop-blur-sm"
			onclick={closePalette}
		></button>

		<div
			class="relative mx-auto mt-24 w-[min(32rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-border-subtle bg-surface-elevated shadow-2xl"
			role="dialog"
			aria-modal="true"
			aria-label="Pesquisar cidade"
		>
			<form onsubmit={submit} class="flex items-center gap-3 border-b border-border-subtle px-4 py-3">
				<Search class="size-5 shrink-0 text-content-muted" />
				<input
					bind:this={inputEl}
					bind:value={query}
					type="search"
					placeholder="Buscar cidade…"
					autocomplete="off"
					class="min-w-0 flex-1 bg-transparent paragraph-md text-content outline-none"
				/>
				<button
					type="submit"
					disabled={!canSubmit}
					class="shrink-0 rounded-lg bg-brand px-4 py-1.5 label-lg text-brand-contrast transition-opacity hover:opacity-90 disabled:opacity-50"
				>
					Buscar
				</button>
			</form>

			<div class="max-h-[60vh] overflow-y-auto p-4">
				{#if weatherModule.isBusy}
					<div class="grid place-items-center py-8"><Spinner label="Buscando…" /></div>
				{:else if weatherModule.results.length > 0}
					<SearchResults />
				{:else}
					<SearchHistory />
				{/if}
			</div>
		</div>
	</div>
{/if}
