import React,{useContext} from "react";
import {View,Text,StyleSheet, TouchableOpacity} from "react-native"
import SafeAreaView from 'react-native-safe-area-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TopContext } from "../App";
import ButtonCommon from "../commonComponents/button";

export default function User () {  
    
    const contextVal = useContext(TopContext)    
    
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

    return(
        <SafeAreaView style={styles.container}>
            <View>                                  
                <ButtonCommon text={"Logout"} onPress={()=>logoutHandler()}/>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({ 
    container:{
        flex:1,
        flexDirection:"column", 
        alignItems:'center',       
        justifyContent:'center',
        backgroundColor:'#fff'                     
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
    }   
})