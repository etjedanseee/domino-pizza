import { NotificationActionTypes } from './../../types/Notification/INotificationReducer';
import { NotificationAction, NotificationState } from "../../types/Notification/INotificationReducer"


const initialState: NotificationState = {
  notifications: []
}

export const notificationReducer = (state = initialState, action: NotificationAction): NotificationState => {
  switch (action.type) {
    case NotificationActionTypes.SHOW: {
      return {
        ...state,
        notifications: [...state.notifications, action.payload]
      }
    }
    case NotificationActionTypes.HIDE: {
      return {
        ...state,
        notifications: state.notifications.filter(n => n.id !== action.payload)
      }
    }
    default: return state
  }
}