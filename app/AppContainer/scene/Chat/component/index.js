import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  Modal,
  TouchableWithoutFeedback,
  Dimensions,
  ScrollView,
  Image
} from 'react-native'
import  {UserExist,Logout,getUser} from '../../User/Helper/user'
import  io from 'socket.io-client/dist/socket.io'
import {Actions} from 'react-native-router-flux'
import {GiftedChat} from 'react-native-gifted-chat'
export default class ChatApp extends React.Component{
constructor(props){
  super(props)
  this.fetchData()


  this.socket=io('http://114.33.199.92:6001',
  {
  broadcaster: 'socket.io',
  key:'36e77906f0963e755c057cf3bb2cf1da',
  host: 'http://114.33.199.92:6001',

}

)

  this.state = {
      messages: [],
      ff:[],
      user:{}
    }

 getUser().then(data=>{
   this.setState({user: data})
 })

  this.socket.on('connect', (data) => {
  })
  this.socket.emit('subscribe',{
            channel: `project-${this.props.item.id}`,
        })




{/* this.socket.emit('disconnecting') 要離開頻道*/ }

}
async fetchData(){
  await fetch(`http://114.33.199.92:8080/laravel/policeevent/public/api/showChatList/${this.props.item.id}?page=1`)
  .then(res=>res.json())
  .then(res=>{
    let messages=res.data.data
  messages=  messages.map((item)=>{
    let date =item.created_at.replace(/-/g,'/')
      return  {
          _id: item.id,
          text: item.text,
          createdAt: new Date(date),
          user: {
            _id: item.user.id,
            name: item.user.name,
            avatar: item.user.avatar,
          },
        }
    })
    this.setState({messages:[...messages]})
  })
}
_onSend(message){

      const body={
    "channel": `project-${this.props.item.id}`,
    "name": "test",
    "data": {
        "chatbox": message
    }
  }
  const chatbody={
   project_id:this.props.item.id,
   text:message[0].text,
   user_id:this.state.user.id
}
  fetch(`http://114.33.199.92:6001/apps/a76ad3137eccf4e2/events?auth_key=36e77906f0963e755c057cf3bb2cf1da`,{
    method:'POST',
    headers: {
     'Accept': 'application/json',
     'Content-Type': 'application/json'
   },
    body:JSON.stringify(body)
  })
  fetch(`http://114.33.199.92:8080/laravel/policeevent/public/api/chat`,{
    method:'POST',
    headers: {
     'Accept': 'application/json',
     'Content-Type': 'application/json'
   },
    body:JSON.stringify(chatbody)
  })
  .then(res=>res.json())
  .then(res=>console.log(res))
}
componentDidMount(){

  this.socket.on('test',(channel_name,data)=>{

    let chat_message=data.chatbox[0]
    let chatbox= {
        _id: chat_message._id,
        text: chat_message.text,
        createdAt: new Date(),
        user: {
          _id: chat_message.user._id,
          name: chat_message.user.name,
          avatar: chat_message.user.avatar,
        },
      }

    this.setState({messages:[chatbox,...this.state.messages]})
  })
}
componentWillUnmount(){
  this.socket.emit('disconnecting')

}
  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 3,
            name: 'React Native',
            avatar: 'https://facebook.github.io/react/img/logo_og.png',
          },
        },
        {
          _id: 2,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://facebook.github.io/react/img/logo_og.png',
          },
        },
      ],
    });
  }
  render(){
    return(
      <GiftedChat
        messages={this.state.messages}
        onSend={(messages)=>{
          this._onSend(messages)
        }}
        user={{
           _id:this.state.user.id,
           name:this.state.user.name,
           avatar:this.state.user.avatar
        }}

        >
      </GiftedChat>
    )
  }
}
