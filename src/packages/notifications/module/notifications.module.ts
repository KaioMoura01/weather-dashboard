import { notificationStore } from '../service/notification-store.svelte';
import type { Notification } from '../types/notification';

/** Facade: the only entry point UI and other packages use for notifications. */
export const notificationsModule = {
	get list(): Notification[] {
		return notificationStore.list;
	},
	notifyError(message: string): void {
		notificationStore.push('error', message);
	},
	notifySuccess(message: string): void {
		notificationStore.push('success', message);
	},
	notifyInfo(message: string): void {
		notificationStore.push('info', message);
	},
	dismiss(id: number): void {
		notificationStore.dismiss(id);
	}
};
