import React from "react";
import {TouchableOpacity, Text, StyleSheet} from "react-native"

export default function ButtonCommon ({text,onPress}) {  
    
    const clickHandler = () => {
        onPress(text)
    }

    return(
        <TouchableOpacity style={styles.button} onPress={()=>clickHandler()}
        >
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({     
    button:{
        backgroundColor:'#000',
        width:100,
        height:45        
    },
    text:{
        color:'#fff',
        padding:10,
        textAlign:'center',
        fontFamily:"Comfortaa-Bold",
    }                        
})