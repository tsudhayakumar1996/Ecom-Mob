import React,{useContext,useState} from "react";
import {View,Text,StyleSheet, Image, Modal,Button,TouchableOpacity} from "react-native"
import SafeAreaView from 'react-native-safe-area-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TopContext } from "../App";
import ButtonCommon from "../commonComponents/button";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { launchImageLibrary} from 'react-native-image-picker';
import {fetchUpdate} from '../fetching/fetchingPost'
import { APILists } from "../apilists";

export default function User () {  
    
    const contextVal = useContext(TopContext) 
    console.log(contextVal.loggedIn,"000000000000-----------") 
    const [editBtnShow, seteditBtnShow] = useState(false)  
    
    const logoutHandler = async () => { 
        contextVal.setloggedIn({
            loggedIn:false,
            user:'',
            phone_no:'',
            token:''
        })
        contextVal.setcartBadgeCount(0)               
        const userObj = {
            loggedIn:false,
            user:'',
            phone_no:'',
            token:''
        } 
        try {
            await AsyncStorage.setItem('loggedIn', JSON.stringify(userObj));  
            await AsyncStorage.setItem('cartBadgeCount', JSON.stringify(0));          
        }catch(error) {
            console.log('error', error);
        }        
    }

    const data = new FormData() 

    const options = {
        mediaType:'photo',
        quality: 1.0,
        maxWidth: 500,
        maxHeight: 500,
        includeBase64: true,
        storageOptions: {
          skipBackup: true,
          path: 'images',
          cameraRoll: true,
          waitUntilSaved: true,
        },
      };

    const imagePickerHandler = async () => {
        const result = await launchImageLibrary(options);
        console.log(result.assets[0], "result99999999999999")
        if(result){   
            
            const file_data = result.assets[0]
            data.append('userImage', {
                uri: file_data.uri,
                type: 'image/jpeg/jpg',
                name: file_data.fileName,
                data: file_data.base64,
            });

            // data.append("userImage",result.assets[0].uri)                        
        }        
    }

    const uploadHandler = async () => {
        console.log(data,"--------data")
        const response = await fetchUpdate(APILists.baseURL+"/register/"+contextVal.loggedIn.user_id,data,contextVal.loggedIn.token)
        console.log(response,"-----------image upload response...........")
    }

    const editModalShowHandler = () => {
        seteditBtnShow(!editBtnShow)
    } 

    return(
        <SafeAreaView style={styles.container}>                        
            <View style={styles.innerContainer}>
                <View style={{flexDirection:'row',marginVertical:15}}>                    
                    <Text style={{fontSize:18,fontFamily:"Comfortaa-Bold"}}>{contextVal.loggedIn.user}</Text>                                        
                </View>
                <View style={{flexDirection:'row',marginVertical:15}}>                    
                    <Text style={{fontSize:18,fontFamily:"Comfortaa-Bold"}}>{contextVal.loggedIn.phone_no}</Text>                                         
                </View>                                 
                <View style={{marginVertical:15}}>                    
                    <Image 
                        source={require('../src/images/user.png')}
                        style={{ width: 100, height:100, borderRadius: 100/2, backgroundColor:'#f0f1f2'}}
                    />              
                </View>                
                <ButtonCommon text={"Logout"} onPress={()=>logoutHandler()}/>
                <TouchableOpacity style={{marginTop:15}} onPress={()=>editModalShowHandler()}>
                    <MaterialCommunityIcons name="lead-pencil" color={"#000"} size={28} />
                </TouchableOpacity>  
                <Modal animationType="fade"
                    transparent={false}
                    visible={editBtnShow}                                        
                    onRequestClose={() => {                            
                        seteditBtnShow(!editBtnShow);
                    }}
                    > 
                        <Text onPress={()=>alert(3)}>Udhay</Text>
                        <TouchableOpacity style={styles.closeBtn} onPress={()=>seteditBtnShow(!editBtnShow)}>
                            <MaterialCommunityIcons name="close" color={"#fff"} size={24} />
                        </TouchableOpacity>
                        <View style={{marginTop:40}}>
                            <Button onPress={()=>imagePickerHandler()}
                                title="Upload an Image"
                            />
                            <Button onPress={()=>uploadHandler()}
                                title="Upload"
                            />
                        </View>
                </Modal>   
            </View>                                                                                                                                                                              
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({ 
    container:{                         
        flex:1,
        backgroundColor:'#fff'                              
    },   
    innerContainer:{        
        flex:1,
        alignItems:'center',
        justifyContent:'center'                
    },  
    button:{
        backgroundColor:'#000',
        width:100,
        height:45,        
    },
    text:{
        color:'#fff',
        padding:10,
        textAlign:'center',
        fontFamily:"Comfortaa-Bold",
    },
    imgBox:{        
        backgroundColor:'#fff'        
    },
    closeBtn:{
        padding:10,                
        backgroundColor:'#000',  
        position:"absolute",
        top:0,
        right:0      
    }          
})