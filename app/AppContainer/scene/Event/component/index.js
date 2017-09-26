import React, { Component } from 'react';
import MapView from 'react-native-maps';
import  {UserExist,Logout,getUser} from '../../User/Helper/user'

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
} from 'react-native';
import { Drawer } from 'native-base';
import {Actions} from 'react-native-router-flux'
const {width,height}=Dimensions.get('window')
export default class Event extends Component {
  constructor(props){
    super(props)
    this.state={
      firstTimelocation:true,
      data:[],
      modalToggle:false,
      selectItem:{},
      masterLatLon:{
        latitude: 22.627278,
        longitude: 120.301435,
        latitudeDelta: 0.2922,
        longitudeDelta: 0.2421,
      },
      subscribed:false,
      user:{}
    }
  }
  componentDidMount(){
   this.getUserData()
    Actions.refresh({title:this.props.item.title})
    this.fetchData()

  }
  async getUserData(){
  await  getUser().then((data)=>{this.setState({user:data})})

  }
  async fetchData(){

  await  fetch(`http://114.33.199.92:8080/laravel/policeevent/public/api/project/${this.props.item.id}?page=1`)
    .then((res)=>res.json())
    .then((res)=>{this.setState({data:res.data.data})} )
    .catch((err)=>{console.log(err)})

  }

  openDrawer(){
    this.drawer._root.open()
  }
closeDrawer(){
  this.drawer._root.close()

}
async _fetchEvent(id){


  await fetch(`http://114.33.199.92:8080/laravel/policeevent/public/api/event/${id}`)
    .then((res)=>res.json())
    .then((res)=>{
        this.setState({modalToggle:true,selectItem:res.data});
    } )
    .catch((err)=>{console.log(err)})
}
_renderItem({item}){


return(
  <TouchableWithoutFeedback onPress={()=>{
    let {lat,lon}=item.have_position

      this.closeDrawer()
      let calloutref=`call-out-${item.id}`
      let willcallout=this.refs[calloutref]
      willcallout.showCallout()
      this.setState({
        masterLatLon:{
          latitude: lat,
          longitude: lon,
          latitudeDelta: 0.0122,
          longitudeDelta: 0.0021,
        }
      })

    }

     }>
    <View style={{backgroundColor:'#fff',padding:5,marginBottom:5}}>
      <Text style={{color:item.level==1?'#FC6355':item.level==2?'#C7B800':'#52A679'}}>{item.happen}</Text>
      <Text>{item.title}</Text>

    </View>
  </TouchableWithoutFeedback>

)
}
_renderPhoto({item}){
  return (
    <View>
        <Text>{item.name}</Text>
      <Image style={{width:width-100,height:480}} source={{uri:item.path}}></Image>
    </View>

  )

}
_renderPerson({item}){
  return (
    <View style={{marginRight:10}}>
      <Text>{item.type_person}</Text>
        <Text>{item.name}</Text>
    </View>

  )
}
_subproject(){
  fetch()
}
  render(){

    return(
      <View style={{flex:1}}>

        <Drawer
           ref={(ref) => {this.drawer=ref}}
           content={
             <View style={{backgroundColor:'#3297DB',flex:1,padding:10}}>
               <FlatList
                 data={this.state.data}
                 renderItem={this._renderItem.bind(this)}

                 >
               </FlatList>
             </View>
           }
           onClose={this.closeDrawer.bind(this)}

            >
            <View style={{flexDirection:'row'}}>
              <Button style={{flex:1}} title="最新案情"  onPress={this.openDrawer.bind(this)}></Button>
                <Button color="red" title="即時訊息" style={{flex:5}}
                  onPress={()=>{Actions.chat({item:this.props.item})}}
                  ></Button>

                <Button color="#61BC6D" title="訂閱消息" style={{flex:5}}
                    onPress={()=>{
                    alert('請加值點數才能使用這個功能')
                    }}
                    ></Button>
            </View>

              <View style={{flex:1}}>
                <MapView
                  style={{    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0}}
                  region={this.state.masterLatLon}
                >
              {  this.state.data.map((item)=>{
              return  (
                <MapView.Marker

                   coordinate={{latitude:item.have_position.lat,longitude:item.have_position.lon}}
                   title={item.title}
                   pinColor={item.have_position.level==1?'red':item.have_position.level==2?'yellow':'green'}
                   description={item.description}
                   ref={`call-out-${item.id}`}
                   onCalloutPress={()=>{
                     this._fetchEvent(item.id);

                   }}
                   onPress={()=>{
                     let {lat,lon}=item.have_position
                     this.setState({
                       masterLatLon:{
                         latitude: lat,
                         longitude: lon,
                         latitudeDelta: 0.0122,
                         longitudeDelta: 0.0021,
                       }
                     })
                   }}
                 />
              )
                })}

            </MapView>
              </View>


         </Drawer>


         <Modal
           transparent={false}
           animationType="slide"
           visible={this.state.modalToggle}
           onRequestClose={()=>{this.setState({modalToggle:false})}}
           >
          <View style={{flex:1,backgroundColor:'#3498DB'}}>

            <ScrollView contentContainerStyle={{width:width,alignItems:'center'}}>
              <View style={styles.ViewContainer} >
                <Text style={{color:this.state.selectItem.level==1?'#FC6355':this.state.selectItem.level==2?'#C7B800':'#52A679'}}>
                  層級：{this.state.selectItem.level==1?'關鍵證據':this.state.selectItem.level==2?'已證實線索':'未證實線索'}
                </Text>
              </View>
              <View style={styles.ViewContainer} >
                <Text >
                  事件
                </Text>
                <Text >
                  {this.state.selectItem.title}
                </Text>
              </View>

              <View style={styles.ViewContainer} >
                <Text >
                  發生時間：{this.state.selectItem.happen}
                </Text>
              </View>
              <View style={styles.ViewContainer} >
                <Text >
                  來源：{this.state.selectItem.source}
                </Text>

              </View>
              <View style={styles.ViewContainer} >
                <Text >
                  詳情
                </Text>
                <Text >
                  {this.state.selectItem.description}
                </Text>
              </View>
              <View style={styles.ViewContainer} >
                <Text>關係人</Text>

              <FlatList data={this.state.selectItem.have_person}
                renderItem={this._renderPerson.bind(this)}
                showsHorizontalScrollIndicator={false}

                horizontal
                >
              </FlatList>
            </View>
              <View style={styles.ViewContainer} >
                <Text >
                  發生位置
                </Text>
                <Text >
                {this.state.selectItem.location}
                </Text>
              </View>
              <View style={styles.ViewContainer} >
                <Text>證物名稱</Text>


                <FlatList data={this.state.selectItem.have_photos}
                  renderItem={this._renderPhoto.bind(this)}
                  >
                </FlatList>
              </View>





           </ScrollView>
           <Text
            onPress={()=>{this.setState({modalToggle:false})
         }}
            style={styles.modalButton}>
            關閉
          </Text>
          </View>

           </Modal>

      </View>

    )
  }

}


const styles=StyleSheet.create({

    ViewContainer:{
      width:width-20,
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
    },
    modalButton:{
      position:'absolute',
      top:5,
      right:5,
      backgroundColor:"#E74C3C",
      color:'#fff',
      padding:10


    }
})
