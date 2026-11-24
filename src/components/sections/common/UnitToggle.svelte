<script lang="ts">
	import { unitsModule } from '$packages/units/module/units.module.svelte';
	import type { TemperatureUnit } from '$packages/units/types/unit';

	interface Props {
		/** 'hero' é para uso sobre o cenário escuro do card principal. */
		variant?: 'page' | 'hero';
		class?: string;
	}

	const { variant = 'page', class: className = '' }: Props = $props();

	const OPTIONS: TemperatureUnit[] = ['C', 'F'];
	const shell = $derived(variant === 'hero' ? 'metric-tile' : 'glass-card');
	const idle = $derived(
		variant === 'hero' ? 'text-white/70 hover:text-white' : 'text-content-muted hover:text-content'
	);
</script>

<div
	role="group"
	aria-label="Unidade de temperatura"
	class="{shell} flex gap-1 rounded-full p-1 {className}"
>
	{#each OPTIONS as unit (unit)}
		{@const active = unitsModule.current === unit}
		<button
			type="button"
			aria-pressed={active}
			onclick={() => unitsModule.set(unit)}
			class="label-lg rounded-full px-3.5 py-1 transition-colors {active ? 'day-active text-white' : idle}"
		>
			°{unit}
		</button>
	{/each}
</div>
