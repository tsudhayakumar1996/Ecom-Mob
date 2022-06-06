import React,{useContext,useState} from "react";
import {View, Text, StyleSheet, TextInput, ActivityIndicator} from "react-native"
import { TopContext } from "../App";
import { fetchPost } from "../fetching/fetchingPost";
import { APILists } from "../apilists";
import AsyncStorage from '@react-native-async-storage/async-storage';
import ButtonCommon from "../commonComponents/button";


export default function Login ({route}) {
    
    const screen = route.params.screen        
    const contextVal = useContext(TopContext)     
    const [rePass, setrePass] = useState('')
    const [loader, setloader] = useState(false)
    const [screenType, setscreenType] = useState(screen)
    const [iniInputshow, setiniInputshow] = useState(false)
    const [alertShow, setalertShow] = useState({
        show:false,
        msg:''
    })
    const [userDetails, setuserDetails] = useState({
        phone_no:"",
        password:""
    }) 
    const [userDetailsReg, setuserDetailsReg] = useState({
        phone_no:"",
        password:"",
        name:""
    }) 
    const [successMsg, setsuccessMsg] = useState({
        show:false,
        msg:''
    }) 
    
    const localeStoredata = async (res) => {  
        const userObj = {
            loggedIn:true,
            user:res[0].name,
            phone_no:res[0].phone_no,
            token:res[0].token,
            user_id:res[0].user_id            
        }           
        try {
            await AsyncStorage.setItem('loggedIn', JSON.stringify(userObj));            
        }catch(error) {
            console.log('error', error);
        }
    }

    const timeFunction = (res) => {
        if(res[0].token){  
            localeStoredata(res)                      
            setTimeout(()=>{
                contextVal.setloggedIn({
                    loggedIn:true,
                    user:res[0].name,
                    phone_no:res[0].phone_no,
                    token:res[0].token,
                    user_id:res[0].user_id
                })            
            },2000)
        }else{            
            setTimeout(()=>{
                setscreenType('login')
                setiniInputshow(true)
                setalertShow({
                    show:true, 
                    msg:"Registered successfully "+res[0].name+" please login here..."
                })
            },2000)            
        }
    }

    const loginHandler = async () => { 
        setloader(true)              
        const response = await fetchPost(APILists.baseURL+"/"+screenType,!iniInputshow ? userDetails : {password:userDetailsReg.password,phone_no:userDetailsReg.phone_no})               
        if(response[0].status === "success"){ 
            setloader(false)
            setiniInputshow(false)            
            setsuccessMsg({
                show:true,
                msg:"Welcome "+response[0].name+" Logged in successfully"
            })
            timeFunction(response)
        }else{
            setloader(false)
            setalertShow({
                show:true,
                msg:response[0].msg
            })
        }
    }

    const RegisterHandler = async () => { 
        setloader(true)        
        if(rePass === userDetailsReg.password){                 
            const response = await fetchPost(APILists.baseURL+"/"+screenType,userDetailsReg)                     
            if(response[0].msg === "success"){
                setloader(false)                
                timeFunction(response)
            }else{
                setloader(false)
                setalertShow({
                    show:true,
                    msg:response[0].msg
                })
            }
        }else if(rePass !== userDetails.password){            
            setalertShow({
                show:true,
                msg:"Entered password and re entered password should be same"
            })
        }         
    }

    const onChangeHandler = (e,key) => {
        setalertShow({
            show:false,
            msg:""
        })
        if(key === "repassword" && screenType === "register"){
            setrePass(e)
        }
        else if(screenType === "login" && key !== "repassword"){
            setalertShow({show:false})
            setuserDetails({
                ...userDetails,
                [key] : e
            })            
        }else if(screenType === "register" && key !== "repassword") {
            setalertShow({show:false})
            setuserDetailsReg({
                ...userDetailsReg,
                [key] : e
            })            
        }        
    }     

    return(
        <View style={styles.container}>  
            {!successMsg.show ?        
                <View style={styles.position}>
                    {loader &&
                        <View style={styles.loadPosition}>
                            <ActivityIndicator color={'#000'}/>
                        </View>
                    }
                    {screenType === "login" ?
                        <View> 
                            {alertShow.show &&<Text style={styles.textBlack}>{alertShow.msg}</Text>}                                           
                            {iniInputshow ?
                                <View>
                                    <TextInput style={styles.input} value={userDetailsReg.phone_no} onChangeText={(e)=>onChangeHandler(e,"phone_no")} keyboardType="numeric"/>
                                    <TextInput style={styles.input} value={userDetailsReg.password} placeholder="Password" onChangeText={(e)=>onChangeHandler(e,"password")}/>
                                </View>
                                :
                                <View>
                                    <TextInput style={styles.input} placeholder={"Enter Phone No"} onChangeText={(e)=>onChangeHandler(e,"phone_no")} keyboardType="numeric"/>
                                    <TextInput style={styles.input} placeholder="Password" onChangeText={(e)=>onChangeHandler(e,"password")}/>
                                </View>
                            }                                                        
                            <View style={styles.button}>
                                <ButtonCommon text={"Login"} onPress={()=>loginHandler()}/>
                            </View>
                        </View> : 
                        <View>
                            {alertShow.show &&<Text style={styles.textBlack}>{alertShow.msg}</Text>}               
                            <TextInput style={styles.input} placeholder="Enter Phone No" onChangeText={(e)=>onChangeHandler(e,"phone_no")} keyboardType="numeric"/>
                            <TextInput style={styles.input} placeholder="User Name" onChangeText={(e)=>onChangeHandler(e,"name")} />
                            <TextInput style={styles.input} placeholder="Password" onChangeText={(e)=>onChangeHandler(e,"password")}/>
                            <TextInput style={styles.input} placeholder="Confirm Password" onChangeText={(e)=>onChangeHandler(e,"repassword")}/>                            
                            <View style={styles.button}>
                                <ButtonCommon text={"Register"} onPress={()=>RegisterHandler()}/>
                            </View>
                        </View>
                    }
                </View>
                :
                <View style={styles.position}>
                    <Text style={styles.textBlack}>{successMsg.msg}</Text>
                </View> 
            }            
        </View>
    )
}

const styles = StyleSheet.create({
    container:{        
        backgroundColor:'#fff',       
        flex:1,    
        alignItems:'center',
        justifyContent:'center'        
    },
    position:{        
        width:"80%",        
        backgroundColor:'#f0f1f2',
        padding:30,
        borderRadius:10,
        shadowColor: 'black',        
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 10
    },
    input:{
        borderWidth:1,
        padding:10,
        borderRadius:8,
        marginVertical:10,
        backgroundColor:'#fff',
        fontFamily:'Comfortaa-Bold'
    },    
    button:{        
        position:'absolute',        
        bottom:-52,
        right:0,        
    },
    text:{
        color:'#fff',
        padding:10,
        textAlign:'center',
        fontFamily:"Comfortaa-Bold",
    },
    textBlack:{
        color:'#000',
        padding:10,
        textAlign:'center',
        fontFamily:"Comfortaa-Bold",
    },
    loadPosition:{
        position:'absolute',
        right:10,
        top:10
    }    
})