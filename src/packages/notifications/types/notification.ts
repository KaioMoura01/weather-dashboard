export type NotificationTone = 'info' | 'success' | 'error';

export interface Notification {
	id: number;
	tone: NotificationTone;
	message: string;
}
