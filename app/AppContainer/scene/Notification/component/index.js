import React, { Component } from 'react';
import {Actions} from 'react-native-router-flux'

import { FlatList,Image,TouchableWithoutFeedback ,Button,StyleSheet,  Text,Dimensions,
  ScrollView,
  View,Modal} from 'react-native';
  import  {UserExist,Logout,getUser} from '../../User/Helper/user'

const {width,height}=Dimensions.get('window')
export default class Notification extends Component {
  constructor(props){
    super(props)
  }
  componentDidMount(){

  }

  render(){

    return(
    <Text>加值vip會員，才能使用此功能</Text>
    )
  }
}
