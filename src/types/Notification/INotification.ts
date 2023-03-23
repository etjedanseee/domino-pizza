

export type NotificationColorType = 'red' | 'green' | 'yellow'


export interface INotification extends IShowNotification {
  id: number,
}

export interface IShowNotification {
  text: string,
  color: NotificationColorType,
  time?: number
}
