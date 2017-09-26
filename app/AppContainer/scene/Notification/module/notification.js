import update from "react-addons-update"
import {GET_BADGE} from './Constants'
import {AsyncStorage} from 'react-native'
const initialState={
  badgeCount:0

}
export function getbadge(payload){
  let badge=fetch(`http://localhost/laravel/policeevent/public/api/getBadge/2`)
  .then((res)=>res.json())
  .then((res)=>{
    return res
  })
  return{
    type:'GET_BADGE',
    payload:{badgeCount:badge}
  }

}
function handlebadge(state,action){
  return update(state,{
    badgeCount:{$set:action.payload.badgeCount}
  })

}
const ACTION_HANDLERS={
  GET_BADGE:handlebadge,
}
export function NotificationReducer(state=initialState,action){
  const handler=ACTION_HANDLERS[action.type]
  return handler?handler(state,action):state
}
