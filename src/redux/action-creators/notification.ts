import { NotificationAction, NotificationActionTypes } from './../../types/Notification/INotificationReducer';
import { IShowNotification } from './../../types/Notification/INotification';
import { Dispatch } from 'redux';


export const showNotification = (obj: IShowNotification) => {
  return (dispatch: Dispatch<NotificationAction>) => {
    const id = Date.now()

    dispatch({
      type: NotificationActionTypes.SHOW,
      payload: { ...obj, id }
    })
    setTimeout(() => {
      dispatch({ type: NotificationActionTypes.HIDE, payload: id })
    }, 2000)
  }
}
