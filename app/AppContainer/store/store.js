import {createStore,applyMiddleware,compose} from 'redux'
import thunk from 'redux-thunk'
import {createLogger} from 'redux-logger'
import reducerRoot from './reducerRoot'
const log=createLogger({diff:true,collapse:true})
export default (initialState={})=>{
  const middleware=[thunk,log]
  const enhancers=[]
  const store=createStore(reducerRoot(),initialState,compose(applyMiddleware(...middleware),...enhancers))
  return store
}
