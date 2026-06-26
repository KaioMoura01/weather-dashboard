import type { Notification, NotificationTone } from '../types/notification';

const AUTO_DISMISS_MS = 4500;

/** Reactive, self-pruning collection of transient notifications. */
class NotificationStore {
	private items = $state<Notification[]>([]);
	private nextId = 0;

	get list(): Notification[] {
		return this.items;
	}

	push(tone: NotificationTone, message: string): void {
		const id = this.nextId++;
		this.items = [...this.items, { id, tone, message }];
		this.scheduleDismissal(id);
	}

	dismiss(id: number): void {
		this.items = this.items.filter((item) => item.id !== id);
	}

	private scheduleDismissal(id: number): void {
		if (typeof window === 'undefined') {
			return;
		}

		window.setTimeout(() => this.dismiss(id), AUTO_DISMISS_MS);
	}
}

export const notificationStore = new NotificationStore();
