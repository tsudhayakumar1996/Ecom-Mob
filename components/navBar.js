import React,{useContext} from "react";
import {View,TextInput,StyleSheet,Text,Image,TouchableOpacity} from "react-native"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { TopContext } from "../App";

export default function NavBar ({props}) {

    const contextVal = useContext(TopContext)
    const drawerHandler = () => {
        props.toggleDrawer();
    }
    const userTriggerHandler = () => {        
        props.navigate("UserTab")
    }
    
    return(
        <View style={styles.dflex}>
            <MaterialCommunityIcons name="menu" color={"#000"} size={32} onPress={()=>drawerHandler()}/>
            <View style={styles.searchBox}>
                <TextInput 
                    style={styles.input}
                    placeholder="Product"
                />
                <AntDesign style={styles.position} name="search1" color={"#000"} size={26}/>
            </View> 
            <TouchableOpacity style={styles.loggedImgBox} onPress={()=>userTriggerHandler()}>
                <Image
                    style={{width: 30, height: 30 }}
                    source={require('../src/images/icon-4.png')}
                />
                <Text style={styles.textBlack}>{contextVal.loggedIn.user}</Text>    
            </TouchableOpacity> 
        </View>
    )
}

const styles = StyleSheet.create({
    dflex:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingHorizontal:10,
        paddingVertical:10,
        backgroundColor:'white',
        shadowColor: 'black',        
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 10
    },
    searchBox:{
        width:'50%'
    },
    input:{        
        padding:5,         
        borderRadius:10,
        shadowColor: '#000',
        borderWidth:1,
        borderColor:'#000'        
    },
    position:{
        position:'absolute',
        top:5,
        right:5
    },
    textBlack:{
        color:'#000',        
        textAlign:'center',
        fontFamily:"Comfortaa-Bold",
    },    
    loggedImgBox:{
        flexDirection:'column',
        alignItems:'center', 
        justifyContent:'center' 
    }
})