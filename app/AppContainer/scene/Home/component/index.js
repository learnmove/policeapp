import React, { Component } from 'react';
import {Actions} from 'react-native-router-flux'

import { FlatList,Image,TouchableWithoutFeedback, ActivityIndicator ,Button,StyleSheet,  Text,Dimensions,
  ScrollView,
  View,Modal} from 'react-native';
  import  {UserExist,Logout,getUser} from '../../User/Helper/user'

const {width,height}=Dimensions.get('window')

export default class Home extends Component {

  constructor(props){
    super(props)
    this.state={
      data:[],
      selectItem:{
        process_police:{}
      },
      modalToggle:false,
      page:1,
      loadOK:false
    }


  }
componentWillReceiveProps(){
  this.fetchData()
}
  componentDidMount(){
    this.fetchData()
  }
  _onEndReached(){
    if(this.state.loadOK==true){
        this.setState({
        page:this.state.page+1
      },()=>{this.setState({loadOK:false});this.fetchData()})
      }
  }
  async fetchData(){
  await  fetch('http://114.33.199.92:8080/laravel/policeevent/public/api/project?page=${this.state.page}')
    .then((res)=>res.json())
    .then((res)=>{this.setState({data:[...this.state.data,...res.data.data],loadOK:true})})
    .catch((err)=>{console.log(err)})
  }
  _renderItem({item}){

    return(


      <View style={styles.itemContainer}>
  <TouchableWithoutFeedback onPress={()=>{
      this.setState({selectItem:item,modalToggle:true})
      }}>
    <View >
      <Image  style={{height:100,width:100}} source={{uri:item.cover}}></Image>
      <Text style={styles.areaText}>{item.area}</Text>

    </View>
  </TouchableWithoutFeedback>
  <TouchableWithoutFeedback underlayColor="rgba(0,0,0,.2)" onPress={()=>{
  Actions.event({item})
      }}>
<View style={{width:width-100,padding:5}}>
  <Text style={[styles.itemTitleText,{color:item.level==1?'red':item.level==2?'yellow':'#fff'}]}>{item.title}</Text>
  <Text style={styles.itemPositionText}>{item.position}</Text>
  <Text style={styles.itemDesText}>{item.description}</Text>
</View>
</TouchableWithoutFeedback>

      </View>

    )
  }
  render(){

    return(
  <View style={{flex:1}}>

    <FlatList
      data={this.state.data}
      renderItem={this._renderItem.bind(this)}
      keyExtractor={(item, index) =>  index}
      onEndReached={()=>{this._onEndReached()}}
      onEndThreshold="100"

      ></FlatList>
    <View>
      {
        this.state.loadOK==false?<ActivityIndicator size={100} style={{position:'absolute',bottom:0}}></ActivityIndicator>:<View style={{position:'absolute'}}></View>
    }
    </View>


      <Modal
        transparent={true}
        animationType="slide"

         visible={this.state.modalToggle}
        onRequestClose={()=>{this.setState({modalToggle:false})}}
        >

                <ScrollView contentContainerStyle={{width:width,flex:1,backgroundColor:'#3498DB',alignItems:'center'}}>
                  <View style={styles.ViewContainer} >
                    <Text >
                      案件
                    </Text>
                    <Text >
                    {this.state.selectItem.title}
                    </Text>
                  </View>
                  <View style={styles.ViewContainer}>
                    <Text>
                      敘述
                    </Text>
                    <Text>
                    {this.state.selectItem.description}
                    </Text>
                  </View>
                  <View style={styles.ViewContainer}>
                    <Text>
                      發生位置
                    </Text>
                    <Text>
                    {this.state.selectItem.position}
                    </Text>
                  </View>
                  <View style={[styles.ViewContainer,{flexDirection:'row'}]}>
                    <Text>
                      承辦員警：
                    </Text>
                    <Text>
                    {this.state.selectItem.process_police.name||''}
                    {this.state.selectItem.process_police.phone||''}

                    </Text>
                  </View>
                  <View>
                    <Image source={{uri:this.state.selectItem.cover}} style={{marginTop:5,width:320,height:240}}></Image>
                            <View style={{width:50,alignItems:'center'}}>
                              <Button
                               onPress={()=>{this.setState({modalToggle:false})
                            }}
                            color="#E74C3C"
                            title="關閉"
                               style={styles.modalButton}>
                             </Button>
                  </View>
                    </View>
              </ScrollView>

        </Modal>
  </View>

    )
  }
}

const styles=StyleSheet.create({
  ViewContainer:{
    width:width-100,
    backgroundColor:'#fff',
    marginTop:5,
    borderRadius:5,
    padding:5

  },

  itemContainer:{
    backgroundColor:'#3297DB',
    marginBottom:5,
    width:width,
    flexDirection:'row'
  },
itemPositionText:{
  color:'#BDC3C7'
},
  itemTitleText:{
    color:'#ECF0F1'
  },
  itemDesText:{
    color:'#282C34'

  },
  areaText:{
    color:'white',
    position:'absolute',
    zIndex :50,
    top:0,
    left:0,
    backgroundColor:'rgba(0,0,0,.3)',
    width:100,
    textAlign:'center'
  }
})
