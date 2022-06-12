import React, { useContext,useState } from "react";
import { useFocusEffect } from '@react-navigation/native';
import {View,StyleSheet,StatusBar,Text, Image, TouchableOpacity,Modal,FlatList} from "react-native"
import SafeAreaView from 'react-native-safe-area-view';
import { APILists } from "../apilists";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { fetchDelete, fetchGet } from "../fetching/fetchingPost";
import { TopContext } from "../App";
import ProductModal from "../commonComponents/modal";

export default function Cart () {          
    const [data, setData] = useState([])
    const contextVal = useContext(TopContext) 
    const [modalShow, setmodalShow] = useState(false) 
    const [IndivProduct, setIndivProduct] = useState(null)    
    const user_id = contextVal.loggedIn.user_id     
    
    useFocusEffect(React.useCallback(() => {            
      fetchData()                  
    }, [])
    )

    const fetchData = async () => {        
        const cart_lists_init = await fetchGet(APILists.baseURL+"/cart_list/"+user_id,contextVal.loggedIn.token)                                    
        setData(cart_lists_init[0].cart_lists)   
        contextVal.setcartBadgeCount(cart_lists_init[0].cart_lists.length)                                         
    }            
    
    const crudHandler = async (key,value) => {
        if(key === "delete") {                                                    
            const response = await fetchDelete(APILists.baseURL+"/cart_list/"+contextVal.loggedIn.user_id+"/"+value,contextVal.loggedIn.token)                         
            setData(response[0])   
            contextVal.setcartBadgeCount(response[0].length)                                      
        }
        else if(key === "edit") {            
            setIndivProduct(value)
            setmodalShow(true)                  
        }
        else if(key === "pay") {
            alert("This option is not available now :(")
        }
    }

    const productModalClsoe = () => {
        setmodalShow(false);
    }

    const renderItem = ({item}) => {
        const indiv_price = item.indiv_price.split(" ")
        const splitted_price = indiv_price[0]
        return(
            <View style={styles.listBox}>                            
                <Image 
                    source={{uri:APILists.baseURL+"/"+item.product_image}}
                    style={{ width: 90, height:90 }}
                />
                <View style={styles.sizeBox}>
                    {item.size.map((size,index)=>{
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
                    <Text style={styles.priceText}>{(item.total_qty)*splitted_price}{" Rs"}</Text>
                </View>
                <TouchableOpacity style={styles.editBtn} onPress={() => crudHandler("edit",item)}>
                    <MaterialCommunityIcons name="square-edit-outline" color={"#000"} size={24} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteBtn} onPress={() => crudHandler("delete",item.unique_id)}>
                    <MaterialCommunityIcons name="delete" color={"#000"} size={24} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.payBtn} onPress={() => crudHandler("pay")}>
                    <MaterialCommunityIcons name="arrow-right" color={"#000"} size={24} />
                </TouchableOpacity>                            
            </View>
        )
    }

    return(
        <SafeAreaView style={styles.container}> 
            <StatusBar barStyle="dark-content" backgroundColor="white" />                        
                {data.length > 0 ?                                                                         
                    <>                                                                           
                        <FlatList 
                            data = {data}
                            renderItem = {renderItem}
                            keyExtractor = {item =>item.unique_id}
                        />                                             
                    </> : <View style={styles.emptyTextBox}><Text style={styles.emptyText}>You Don't Have Any Cart Lists</Text></View>
                }                
                <Modal animationType="fade"
                transparent={false}
                visible={modalShow}
                onRequestClose={() => {                            
                    setmodalShow(false);
                }}>                                                            
                        <ProductModal productDetails={IndivProduct} onPress={()=>productModalClsoe()} />                      
                </Modal>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({ 
    container:{
        backgroundColor:'#fff',
        flex:1
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
    },  
    editBtn:{
        padding:5,        
        position:'absolute',
        top:0,        
        left:0,                      
    }, 
    deleteBtn:{
        padding:5, 
        position:'absolute',
        top:0,        
        right:0,        
    },
    payBtn:{
        padding:5, 
        position:'absolute',
        bottom:0,        
        right:0,        
    },
    loadPosition:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'               
    },
    emptyTextBox:{
        flex:1,    
        alignItems:'center',
        justifyContent:'center'
    },
    emptyText:{
        color:"#000",
        fontFamily:'Comfortaa-Bold',                        
    }      
})