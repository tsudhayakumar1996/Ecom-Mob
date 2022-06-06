import React from "react";
import {View,StyleSheet,Text} from "react-native"
import SafeAreaView from 'react-native-safe-area-view';
import NavBar from "../components/navBar";

export default function Product ({navigation,route}) {
    
    const data = route.params
    return(
        <SafeAreaView style={styles.container}>            
            <NavBar props={navigation}/>
            {data &&
                <View>
                    <Text style={styles.textBlack}>{data.title}</Text>
                </View>
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({ 
    container:{
        flex:1,        
        backgroundColor:'#fff'                    
    }, 
    textBlack:{
        color:'#000',
        fontSize:18,
        textAlign:'center',
        fontFamily:"Comfortaa-Bold",
    }   
})