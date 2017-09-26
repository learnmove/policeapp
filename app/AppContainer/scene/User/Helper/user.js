import {AsyncStorage} from 'react-native'
export async function UserExist(){
  let value=await   AsyncStorage.getItem('user')
  if(value!=null){
    console.log('存在')

    return true
  }else{
    console.log('不存在')

    return false
  }
}
export async function Logout(){
  if(UserExist()){
  await  AsyncStorage.removeItem('user')
    console.log('已清除')

  }
}
export async function getUser(){
  if(UserExist()){
  let user=await  AsyncStorage.getItem('user')
      user=JSON.parse(user)
      return user
  }
}
