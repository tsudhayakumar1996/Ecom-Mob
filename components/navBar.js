import React,{useContext,useState} from "react";
import {View,TextInput,StyleSheet,Text,Image,TouchableOpacity} from "react-native"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { TopContext } from "../App";
import { APILists } from "../apilists";
import {Keyboard} from 'react-native'

export default function NavBar ({props}) {

    const [filterwords, setfilterwords] = useState('')
    const [searchBox, setsearchBox] = useState(false)
    const contextVal = useContext(TopContext)    
    const drawerHandler = () => {
        props.toggleDrawer();
    }
    const userTriggerHandler = () => {        
        props.navigate("UserTab")
    }

    const searchHandler = (e) => {        
        if(e !==""){
            const search_word = e
            const search_filter = contextVal.products.filter((value)=>{
                return value.title.toLowerCase().includes(search_word.toLowerCase())
            })            
            setfilterwords(search_filter)
            setsearchBox(true)
        }else{
            setsearchBox(false)
        }
    }

    const indivProductHandler = (e) =>{
        Keyboard.dismiss()
        setsearchBox(false)
        props.navigate("IndivProductStack",e)
    }
    
    return(
        <View style={styles.dflex}>
            <MaterialCommunityIcons name="menu" color={"#000"} size={32} onPress={()=>drawerHandler()}/>
            <View style={styles.searchBox}>
                <TextInput 
                    style={styles.input}
                    placeholder="Product"
                    onChangeText={(e)=>searchHandler(e)}
                />
                <AntDesign style={styles.position} name="search1" color={"#000"} size={26}/>
            </View> 
            <TouchableOpacity style={styles.loggedImgBox} onPress={()=>userTriggerHandler()}>
                {contextVal.loggedIn.user_image === "" ?   
                    <Image 
                        source={require('../src/images/user.png')}
                        style={{ width: 30, height:30}}
                    /> :                           
                    <Image 
                        source={{uri:APILists.baseURL+"/"+contextVal.loggedIn.user_image + '?' + new Date()}}
                        style={{ width: 30, height:30}}
                    />                            
                }                                 
                <Text style={styles.textBlack}>{contextVal.loggedIn.user}</Text>    
            </TouchableOpacity> 
            {searchBox &&
                <View style={styles.searchResults}>
                    {filterwords.length > 0 ?
                        filterwords.map((e,i)=>{
                            return(
                                <TouchableOpacity key={i} onPress={()=>indivProductHandler(e)}>
                                        <Text style={styles.productListText}>{e.title}</Text>       
                                </TouchableOpacity> 
                                )
                        }):
                        <Text style={styles.productListText}>No Match Products : (</Text>
                    }
                </View>
            }
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
        elevation: 2,
        height:70        
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
    },
    searchResults:{
        position:'absolute',        
        paddingBottom:10,
        paddingHorizontal:10,
        top:60,    
        left:10,    
        width:"70%",
        alignSelf:'center',
        borderColor:'#000',
        borderWidth:1,
        backgroundColor:'#fff',
        borderRadius:5,
        zIndex:1
    },
    productListText:{
        paddingTop:10,
        fontFamily:"Comfortaa-Bold",
        color:'#000'
    }   
})