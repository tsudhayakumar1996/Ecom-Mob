import React from "react";
import {View, Animated, StatusBar,StyleSheet,TouchableOpacity, Text, Image} from "react-native"
import ButtonCommon from "../commonComponents/button";

export default function Flash ({navigation}) {

    const spinValue = new Animated.Value(0);

    
        Animated.timing(spinValue,{
            toValue:1,
            duration:2000,            
            useNativeDriver:true
        }).start();        
           

    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    const btnClickHandler = (key) => {
        if(key==="login"){
            navigation.navigate('Register/Login',{
                screen : "login"
            })
        }else{
            navigation.navigate('Register/Login',{
                screen : "register"
            })
        }
    }

    return(
        <>
            <View style={styles.container}>
                <StatusBar barStyle="dark-content" backgroundColor="white" />            
                <View style={styles.btnBox}>
                    <View style={styles.ImgBox}>                    
                        <Animated.Image
                            style={{ transform: [{ rotate: spin }], width: 120, height: 120 }}
                            source={require('../src/images/icon-4.png')}
                        />                        
                    </View>                               
                </View>
            </View>
            <View style={styles.btncontainer}>                
                <ButtonCommon text={"Login"} onPress={()=>btnClickHandler('login')} />
                <ButtonCommon text={"Register"} onPress={()=>btnClickHandler('register')} />                
            </View> 
        </>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:0.6,
        flexDirection:'column',
        backgroundColor:'#fff',
        alignItems:'center',
        justifyContent:'flex-end'        
    },
    font:{
        fontFamily:"Comfortaa-Bold",
        textAlign:"center"
    }, 
    button:{
        backgroundColor:'#000',
        width:100        
    },
    text:{
        color:'#fff',
        padding:10,
        textAlign:'center',
        fontFamily:"Comfortaa-Bold",
    },
    btncontainer:{        
        flex:0.4,
        flexDirection:'row',
        backgroundColor:'#fff',
        alignItems:'flex-end',
        justifyContent:'space-between'       
    }                     
})