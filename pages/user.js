import React,{useContext,useState} from "react";
import {View,Text,StyleSheet, Image, Modal,TouchableOpacity,ActivityIndicator} from "react-native"
import SafeAreaView from 'react-native-safe-area-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TopContext } from "../App";
import ButtonCommon from "../commonComponents/button";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {launchImageLibrary} from 'react-native-image-picker';
import {fetchUpdate} from '../fetching/fetchingHelpers'
import { APILists } from "../apilists";

export default function User () {          

    const contextVal = useContext(TopContext)      
    const [modalShow, setModalShow] = useState(false)  
    const [photo, setPhoto] = useState(null)
    const [loader, setloader] = useState(false)

    const logoutHandler = async () => {         
        contextVal.setloggedIn({
            loggedIn:false,
            user:'',
            phone_no:'',
            token:'',
            user_image:''
        })
        contextVal.setcartBadgeCount(0)               
        const userObj = {
            loggedIn:false,
            user:'',
            phone_no:'',
            token:'',
            user_image:''
        } 
        try {
            await AsyncStorage.setItem('loggedIn', JSON.stringify(userObj));  
            await AsyncStorage.setItem('cartBadgeCount', JSON.stringify(0));          
        }catch(error) {
            console.log('error', error);
        }        
    }           
    
    const handleChoosePhoto = async () => {        
        const image = await launchImageLibrary({            
            includeBase64:true
        })                
        if(image.hasOwnProperty('assets')){            
            setPhoto(image)
        }
    };    

    const uploadHandler = async () => { 
        setloader(true)        
        if(photo.assets[0].type === 'image/jpeg' || photo.assets[0].type ==='image/png') {             
            let postObj = {}              
            if(photo.assets[0].type === 'image/jpeg'){                      
                postObj["file"]=photo.assets[0].base64,
                postObj["file_name"]=contextVal.loggedIn.user_id+".jpeg"                          
            }else{
                postObj["file"]=photo.assets[0].base64,
                postObj["file_name"]=contextVal.loggedIn.user_id+".png"             
            }                  
            const response = await fetchUpdate(APILists.baseURL+"/register/"+contextVal.loggedIn.user_id,postObj,contextVal.loggedIn.token)            
            if(response[0].status === "success"){
                setloader(false)
                setPhoto(null)
                setModalShow(!modalShow)                
                const userObj = {
                    loggedIn:true,
                    user:contextVal.loggedIn.user,
                    phone_no:contextVal.loggedIn.phone_no,
                    token:contextVal.loggedIn.token,
                    user_id:contextVal.loggedIn.user_id,
                    user_image:"uploads/"+postObj["file_name"]
                }                
                contextVal.setloggedIn({
                    loggedIn:true,
                    user:userObj["user"],
                    phone_no:userObj["phone_no"],
                    user_id:userObj["user_id"],
                    token:userObj["token"],
                    user_image:userObj["user_image"]
                }) 
                await AsyncStorage.setItem('loggedIn', JSON.stringify(userObj));                               
            }
        }
    }

    const modalCloseHandler = () => {
        setPhoto(null)
        setModalShow(!modalShow)
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
                    {contextVal.loggedIn.user_image === "" ?   
                        <Image 
                            source={require('../src/images/user.png')}
                            style={{ width: 100, height:100, borderRadius: 100/2, backgroundColor:'#f0f1f2'}}
                        /> :                           
                        <Image 
                            source={{uri:APILists.baseURL+"/"+contextVal.loggedIn.user_image + '?' + new Date()}}
                            style={{ width: 100, height:100, borderRadius: 100/2, backgroundColor:'#f0f1f2'}}
                        />                            
                    }    
                </View>                
                <ButtonCommon text={"Logout"} onPress={()=>logoutHandler()}/>
                <TouchableOpacity style={{marginTop:15}} onPress={()=>modalCloseHandler()}>
                    <MaterialCommunityIcons name="lead-pencil" color={"#000"} size={28} />
                </TouchableOpacity>  
                <Modal animationType="fade"
                    transparent={false}
                    visible={modalShow}                                        
                    onRequestClose={() => {                            
                        setModalShow(!modalShow);
                    }}
                    >                         
                        <TouchableOpacity style={styles.closeBtn} onPress={()=>modalCloseHandler()}>
                            <MaterialCommunityIcons name="close" color={"#fff"} size={24} />
                        </TouchableOpacity>
                        <View style={{flex:1,flexDirection:'column',justifyContent:'center'}}>
                            <View>
                                {loader &&
                                    <View style={styles.loadPosition}>
                                        <ActivityIndicator color={'#000'} size={"large"}/>
                                    </View>
                                } 
                                {contextVal.loggedIn.user_image === "" && photo === null ?
                                    <Image 
                                        source={require('../src/images/user.png')}
                                        style={{ width: 200, height:200, borderRadius: 100/2, backgroundColor:'#f0f1f2',alignSelf:'center'}}
                                    /> :
                                    <Image 
                                        source={{uri: photo === null ? APILists.baseURL+"/"+contextVal.loggedIn.user_image + '?' + new Date() : photo.assets[0].uri}}
                                        style={{ width: 200, height:200, borderRadius: 100/2, backgroundColor:'#f0f1f2',alignSelf:'center'}}
                                    /> 
                                }                                                                                     
                                <TouchableOpacity style={styles.editBtnAbs} onPress={()=>handleChoosePhoto()}>
                                    <MaterialCommunityIcons name="lead-pencil" color={"#fff"} size={24} />
                                </TouchableOpacity>    
                            </View>                                             
                            {photo &&
                                <TouchableOpacity style={styles.userBtnAbs} onPress={()=>uploadHandler()}>
                                    <Text style={styles.userBtnText}>Save</Text>
                                </TouchableOpacity>
                            }
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
        justifyContent:'center',          
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
    },
    editBtnAbs:{
        padding:10,                
        backgroundColor:'#000', 
        position:"absolute",
        bottom:0,
        right:20
    },
    userBtn:{
        width:150,
        backgroundColor:"#000",  
        alignSelf:'center'
    },
    userBtnAbs:{        
        width:150,
        backgroundColor:"#000",  
        alignSelf:'center',
        position:'absolute',
        bottom:30
    },
    userBtnText:{
        color:'#fff',
        padding:10,
        textAlign:'center',
        fontFamily:"Comfortaa-Bold",
    },
    loadPosition:{
        position:'absolute',        
        top:85,         
        width:"100%",
        zIndex:2     
    },          
})