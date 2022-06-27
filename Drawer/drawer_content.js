import React, { useContext } from "react";
import {Text,View,StyleSheet,TouchableOpacity,Image} from "react-native"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TopContext } from "../App";
import { APILists } from "../apilists";

export default function DrawerContent (props) {
    const contextVal = useContext(TopContext)  
    const logOutHandler = async () => {
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
    return(
        <View style={styles.drawerBox}>            
            <View>    
                <View style={styles.drawerContentImgBox}>                    
                    <Image 
                        source={{uri:APILists.baseURL+"/"+contextVal.loggedIn.user_image + '?' + new Date()}}
                        style={{ width: 80, height:80, borderRadius: 40/2, backgroundColor:'#f0f1f2'}}
                    />                    
                    <Text style={styles.userText}>{contextVal.loggedIn.user}</Text>
                </View>            
                <TouchableOpacity style={styles.drawerContentBox} onPress={()=>props.navigation.navigate("HomeTab",{ screen : "HomeStack"})}>
                    <MaterialCommunityIcons name="home" color={'#000'} size={26}/>
                    <Text style={styles.DrawerContentText}>Home</Text>                    
                </TouchableOpacity>                
                <TouchableOpacity style={styles.drawerContentBox} onPress={()=>props.navigation.navigate("CartTab")}>
                    <MaterialCommunityIcons name="cart-minus" color={'#000'} size={26}/>
                    <Text style={styles.DrawerContentText}>Cart Lists</Text>                    
                </TouchableOpacity>
                <TouchableOpacity style={styles.drawerContentBox} onPress={()=>props.navigation.navigate("UserTab")}>
                    <MaterialCommunityIcons name="account-outline" color={'#000'} size={26}/>
                    <Text style={styles.DrawerContentText}>Profile</Text>                    
                </TouchableOpacity> 
            </View>
            <View>
                <TouchableOpacity style={styles.drawerContentBox} onPress={()=>logOutHandler()}>
                    <MaterialCommunityIcons name="logout" color={'#000'} size={26}/>
                    <Text style={styles.DrawerContentText}>Logout</Text>                    
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    drawerBox:{        
        flex:1,
        flexDirection:'column',
        justifyContent:'space-between',
        paddingBottom:30
    },
    drawerContentBox:{
        flexDirection:'row',
        alignItems:'center',
        padding:15
    },
    drawerContentImgBox:{
        flexDirection:'row',
        alignItems:'center', 
        padding:15,
        backgroundColor:'#ECECEC'       
    },
    DrawerContentText:{
        fontFamily:"Comfortaa-Bold",
        color:'#000',
        fontSize:18,
        paddingLeft:20
    },
    userText:{
        fontFamily:"Comfortaa-Bold",
        color:'#000',
        fontSize:18,
        paddingLeft:20
    }
})