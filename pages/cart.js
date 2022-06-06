import React from "react";
import {View,StyleSheet,StatusBar,Text, ScrollView, Image} from "react-native"
import SafeAreaView from 'react-native-safe-area-view';
import { APILists } from "../apilists";

export default function Cart ({navigate,route}) {    
    const data = route.params
    console.log(data)    

    return(
        <SafeAreaView style={styles.container}> 
            <StatusBar barStyle="dark-content" backgroundColor="white" />
            <ScrollView>
                {data.data.map((each,index)=>{
                    const indiv_price = each.indiv_price.split(" ")
                    const splitted_price = indiv_price[0]
                    return(
                        <View key={index} style={styles.listBox}>                            
                            <Image 
                                source={{uri:APILists.baseURL+"/"+each.product_image}}
                                style={{ width: 90, height:90 }}
                            />
                            <View style={styles.sizeBox}>
                                {each.size.map((size,index)=>{
                                    return(
                                        <View key={index} style={styles.sizeBox}>
                                            <View style={styles.roundBox}>
                                                <Text style={styles.roundBoxText}>{size.size}</Text> 
                                            </View> 
                                            <View style={styles.qtyBox}>
                                                <Text style={styles.qtyBoxText}>{size.qty}</Text>                                              
                                            </View>                                            
                                        </View>
                                    )
                                })}
                            </View>   
                            <View>           
                                <Text style={styles.priceText}>Amount</Text>              
                                <Text style={styles.priceText}>{(each.total_qty)*splitted_price}{" Rs"}</Text>
                            </View>
                        </View>
                    )
                })}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({ 
    container:{
        backgroundColor:'#fff'
    },
    listBox:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginHorizontal:20,
        marginVertical:10,
        backgroundColor:"#f0f1f2",
        alignItems:'center',
        borderRadius:10,
        shadowColor: 'black',        
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 10,
        borderBottomWidth:3,
        height:120
    },
    sizeBox:{
        flexDirection:'row'
    },
    roundBox:{
        width:30,
        height:30,
        borderRadius:30/2,
        backgroundColor:'#000',  
        alignItems:'center',
        marginLeft:5,
        justifyContent:'center'      
    },
    roundBoxText:{
        color:'#fff',        
    },
    qtyBox:{
        width:20,
        height:20,
        borderRadius:30/2,
        backgroundColor:'#fff',  
        alignItems:'center',
        marginLeft:5,
        justifyContent:'center',
        position:'absolute',
        top:-13,
        right:-5
    },
    priceText:{
        color:"#000",
        fontFamily:'Comfortaa-Bold',
        paddingHorizontal:20,
        textAlign:'center'        
    }    
})