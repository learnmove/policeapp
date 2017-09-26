import React, { Component } from 'react';
import { FlatList,Image ,StyleSheet,  Text,Dimensions,
  ScrollView,
  View,Button,AsyncStorage} from 'react-native';
import {Actions} from 'react-native-router-flux'
import { Container, Header, Content, Form, Item, Input,Body } from 'native-base';
import  {UserExist,Logout,getUser} from '../../Helper/user'
const {width,height}=Dimensions.get('window')
export default class Login extends Component {
  constructor(props){
    super(props)
    this.state={
      account:'ll',
      password:'secret'
    }


  }
  _login(){

    fetch('http://114.33.199.92:8080/laravel/policeevent/public/api/login',
    {
      headers:{'Accept':'application/json','Content-type':'application/json'}
      ,method:'POST'
      ,body:JSON.stringify(this.state)
    })
    .then(res=>res.json())
    .then(res=>{
      try{
        AsyncStorage.setItem('user',JSON.stringify(res.data))
        if(UserExist()){
          Actions.tabbar()

        }
      }catch(error){
        alert(error)
      }
    })
    .catch(err=>{alert('登錄失敗，請檢查帳號密碼')})

  }
  componentDidMount(){
    this._login()

  }
  render(){
    return(
      <Container>
            <Header >
              <Image style={{height:97,width:340,resizeMode:'contain'}} source={{uri:'http://www.kmph.gov.tw/images/logo.png'}}></Image>

            </Header>
            <Content>
              <Form>
                <Item>
                  <Input placeholder="帳號" onChangeText={(username)=>{this.setState({account:username})}} />
                </Item>
                <Item last>
                  <Input placeholder="密碼" secureTextEntry onChangeText={(password)=>{this.setState({password:password})}}/>
                </Item>
              <Body>
                <Button  title="登入" onPress={()=>{
                    this._login()
                  }}> </Button>
              </Body>
              </Form>
            </Content>
          </Container>

    )
  }
}
