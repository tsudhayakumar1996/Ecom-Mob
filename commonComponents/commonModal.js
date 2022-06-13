import React from "react"
import {View,StyleSheet,Text, Image, TouchableOpacity,Modal,ActivityIndicator} from "react-native"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function CommonModal ({closeHandler,actualSizes,selectedSizes,productImage,selectedProduct,indivPrice,totalQty}) {

    console.log(actualSizes,selectedSizes,productImage,selectedProduct,indivPrice,totalQty,"++++++++++++++++++++++++++")

    const modalCloseHandler = () => {
        closeHandler()        
    }

    return(
        <>            
            <TouchableOpacity style={styles.closeBtn} onPress={() => modalCloseHandler()}>
                <MaterialCommunityIcons name="close" color={"#fff"} size={24} />
            </TouchableOpacity>
        </>
    )
}

const styles = StyleSheet.create({     
    closeBtn:{
        padding:10,        
        position:'absolute',
        right:0,
        backgroundColor:'#000'
    },
})