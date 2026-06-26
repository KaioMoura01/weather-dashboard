<script lang="ts">
	import { CircleAlert, CircleCheck, Info, X } from 'lucide-svelte';
	import { notificationsModule } from '$packages/notifications/module/notifications.module';
	import type { NotificationTone } from '$packages/notifications/types/notification';

	const icons = { info: Info, success: CircleCheck, error: CircleAlert };
	const tones: Record<NotificationTone, string> = {
		info: 'border-brand',
		success: 'border-emerald-500',
		error: 'border-red-500'
	};
</script>

<div class="pointer-events-none fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2">
	{#each notificationsModule.list as toast (toast.id)}
		{@const Icon = icons[toast.tone]}
		<div
			class="pointer-events-auto flex w-[min(24rem,calc(100vw-2rem))] items-center gap-3 rounded-xl border-l-4 bg-surface-elevated px-4 py-3 shadow-lg {tones[toast.tone]}"
			role="alert"
		>
			<Icon class="size-5 shrink-0 text-content" />
			<p class="paragraph-md flex-1 text-content">{toast.message}</p>
			<button
				type="button"
				onclick={() => notificationsModule.dismiss(toast.id)}
				aria-label="Fechar notificação"
				class="text-content-muted hover:text-content"
			>
				<X class="size-4" />
			</button>
		</div>
	{/each}
</div>
