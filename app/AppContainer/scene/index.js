import React from 'react'
import {connect} from 'react-redux'
import {Actions,Scene,ActionConst} from 'react-native-router-flux'
import {Button,Text} from 'react-native'
import Home from './Home/component'
import Event from './Event/component'
import ChatApp from './Chat/component'
import Login from './User/Login/component'
import Notification from './Notification/component'
import {getbadge} from  './Notification/module/notification'
const BadgeComp=(props)=>{
  if(props.badgeCount==0){
    return <Text>0</Text>

  }else{
    return (
   <Text style={{color:'white',backgroundColor:'red',padding:5,borderRadius:50}}>{props.badgeCount}</Text>
  )
  }

}
const mapStateToProps=(state)=>({
badgeCount:state.notifications.badgeCount
})
const mapActionCreators={
  getbadge
}
const ConnectedIcon=connect(mapStateToProps,mapActionCreators)(BadgeComp)

const scene=Actions.create(

  <Scene key="root" >
    <Scene key="login" component={Login} hideNavBar initial title="歡迎來到犯罪檔案查詢系統"  >    </Scene>

      <Scene key="tabbar" tabs  hideNavBar tabBarPosition={'bottom'}  tabBarStyle={{backgroundColor:'#FAFAFA'}} >
        <Scene key="master" title="追蹤系統"  >
          <Scene key="home" component={Home} title="歡迎來到犯罪檔案查詢系統"   ></Scene>
          <Scene key="event" component={Event} title="事件追縱" onBack={() =>{
            Actions.pop({refresh: {test:Math.random()}})

            }} back></Scene>
          <Scene key="chat" component={ChatApp} title="專案討論" ></Scene>
        </Scene>
        <Scene key="message" title="動態消息" icon={ConnectedIcon}  >
          <Scene key="home" component={Notification} title="動態消息"  ></Scene>

        </Scene>
      </Scene>
  </Scene>
)
export default scene
