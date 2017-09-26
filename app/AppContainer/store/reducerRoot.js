import {combineReducers} from 'redux'
import {NotificationReducer as notifications} from '../scene/Notification/module/notification'
export const reducerRoot =()=>{
  return combineReducers({
    notifications,
  })
}
export default reducerRoot
