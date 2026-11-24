<script lang="ts">
	import { Moon, Sun } from 'lucide-svelte';
	import { themeModule } from '$packages/theme/module/theme.module.svelte';

	function toggle(event: MouseEvent): void {
		const box = (event.currentTarget as HTMLElement).getBoundingClientRect();
		themeModule.toggle({ x: box.left + box.width / 2, y: box.top + box.height / 2 });
	}
</script>

<button
	type="button"
	onclick={toggle}
	aria-label={themeModule.isDark ? 'Ativar tema claro' : 'Ativar tema escuro'}
	class="glass-card grid size-11 place-items-center rounded-full text-content transition-colors hover:border-brand/60"
>
	{#if themeModule.isDark}
		<Sun class="size-5" />
	{:else}
		<Moon class="size-5" />
	{/if}
</button>
