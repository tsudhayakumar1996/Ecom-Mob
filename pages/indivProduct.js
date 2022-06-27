import React,{useState} from "react";
import {View,StyleSheet,Text, Image, TouchableOpacity,Modal,ScrollView} from "react-native"
import SafeAreaView from 'react-native-safe-area-view';
import NavBar from "../components/navBar";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { APILists } from "../apilists";
import ButtonCommon from "../commonComponents/button";
import { TextInput } from "react-native-gesture-handler";
import CommonModal from "../commonComponents/commonModal";

export default function IndivProduct ({navigation,route}) {       
    
    const data = route.params                                       
    const [commonModal, setCommonmodal] = useState(false)                    
            
    const modalHandler = () => {
        setCommonmodal(true)
    }
    const modalCloaseHandler = () => {
        setCommonmodal(false)
    }

    return(
        <SafeAreaView style={styles.container}>            
            <NavBar props={navigation}/>
            <TouchableOpacity style={styles.backBtn} onPress={() => navigation.push('HomeStack')}>
                <MaterialCommunityIcons name="arrow-left" color={"#fff"} size={24} />
            </TouchableOpacity>
            {data &&
                <ScrollView style={{zIndex:-2}}>
                    <Text style={styles.priceText}>{data.price}</Text>
                    <View style={{alignItems:'center'}}>
                        <Image 
                            source={{uri:APILists.baseURL+"/"+data.product_image}}
                            style={{ width: 350, height:350 }}
                        />
                    </View>
                    <Text style={styles.textBlack}>{data.title}</Text>
                    <Text style={styles.textDesc}>{data.description}</Text>
                    <View style={styles.sizeBox}>
                        <View style={styles.sizeArr}>
                            <Text style={styles.sizeText}>Sizes :{" "}</Text>
                            {data.sizes.map((each,index)=>{
                                return(
                                    <Text key={index} style={styles.sizeTextBold}>{"  "}{each}</Text>
                                )
                            })}                            
                        </View>
                        <ButtonCommon text={"Add Cart"} onPress={()=>modalHandler()}/>
                    </View>                    

                    <Text style={{marginTop:10,marginHorizontal:20}}>Add your review...</Text>  
                    <View style={styles.inputBox}>                        
                        <TextInput style={styles.input} multiline={true} numberOfLines={2}/>  
                        <TouchableOpacity style={styles.closeBtn}>
                            <MaterialCommunityIcons name="arrow-right" color={"#fff"} size={24} />
                        </TouchableOpacity> 
                    </View>  
                    <Text style={{margin:20}}>Others Review...</Text>                     
                    <Modal animationType="fade"
                        transparent={false}
                        visible={commonModal}
                        onRequestClose={() => {                            
                            setCommonmodal(false);
                        }}
                        > 
                            <CommonModal closeHandler={()=>modalCloaseHandler()} actualSizes={data.sizes} selectedSizes={[]} productImage={data.product_image} selectedProduct={[]} indivPrice={data.price} totalQtys={0} productId={data._id} productName={data.title} mode={"addToCart"} navigation={navigation}/>
                    </Modal>                    
                </ScrollView>
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
    },
    textDesc:{
        color:'#000',
        fontSize:14,    
        paddingHorizontal:20,
        paddingVertical:10,    
        fontFamily:"Comfortaa-Bold",        
    },
    priceText:{
        color:'#fff',
        backgroundColor:'#000',
        paddingHorizontal:20,
        paddingVertical:10,
        textAlign:'center',
        fontFamily:"Comfortaa-Bold",
        position:'absolute',
        top:0,
        right:0
    },
    backBtn:{
        paddingHorizontal:20,
        paddingVertical:10,
        backgroundColor:'#000',
        position:'absolute',
        top:70,        
        left:0,
        zIndex:-1               
    },
    closeBtn:{
        padding:10,        
        position:'absolute',
        right:0,
        backgroundColor:'#000'
    },
    sizeBox:{
        paddingHorizontal:20,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',             
    },
    sizeArr:{        
        flexDirection:'row',                   
    },
    sizeText:{
        color:'#000',        
    },
    sizeTextBold:{
        color:'#000',
        fontWeight:"600"        
    },
    inputBox:{
        borderWidth:1,
        marginHorizontal:20,
        marginTop:10
    },             
    sizeVal:{
        alignItems:'flex-start',
        flexDirection:"row",
        justifyContent:'space-around',
        marginHorizontal:20,                                    
    },    
    qtyAddbtn:{
        alignItems:'flex-start',
        flexDirection:'row',
        justifyContent:'space-evenly',        
    },
    plusBtn:{
        alignSelf:'center',
        marginHorizontal:10,        
        backgroundColor:'#000'
    },            
})