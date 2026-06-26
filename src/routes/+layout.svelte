<script lang="ts">
	import { onMount } from 'svelte';
	import type { Snippet } from 'svelte';
	import '../app.css';
	import AppHeader from '$components/sections/common/AppHeader.svelte';
	import ToastViewport from '$components/sections/common/ToastViewport.svelte';
	import { historyModule } from '$packages/history/module/history.module.svelte';
	import { themeModule } from '$packages/theme/module/theme.module.svelte';

	interface Props {
		children: Snippet;
	}

	const { children }: Props = $props();

	onMount(() => {
		themeModule.hydrate();
		historyModule.hydrate();
	});
</script>

<ToastViewport />

<div class="mx-auto flex min-h-dvh w-full max-w-3xl flex-col gap-8 px-4 py-8">
	<AppHeader />
	<main class="flex-1">
		{@render children()}
	</main>
	<footer class="paragraph-sm text-center text-content-muted">
		Dados por Open-Meteo
	</footer>
</div>
