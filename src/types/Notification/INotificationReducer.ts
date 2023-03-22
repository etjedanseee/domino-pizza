import { INotification } from './INotification';

export interface NotificationState {
  notifications: INotification[]
}

export enum NotificationActionTypes {
  SHOW = 'SHOW',
  HIDE = 'HIDE'
}

interface showNotificationAction {
  type: NotificationActionTypes.SHOW,
  payload: INotification
}

interface hideNotificationAction {
  type: NotificationActionTypes.HIDE,
  payload: number
}

export type NotificationAction = showNotificationAction | hideNotificationAction