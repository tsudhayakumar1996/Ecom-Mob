import React,{useState,useContext} from "react";
import {View,StyleSheet,Text, Image, TouchableOpacity,Modal,ScrollView,ActivityIndicator} from "react-native"
import SafeAreaView from 'react-native-safe-area-view';
import NavBar from "../components/navBar";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { APILists } from "../apilists";
import ButtonCommon from "../commonComponents/button";
import { TextInput } from "react-native-gesture-handler";
import { fetchPost } from "../fetching/fetchingPost";
import { TopContext } from "../App";
import CommonModal from "../commonComponents/commonModal";

export default function IndivProduct ({navigation,route}) {  
    const userVal = useContext(TopContext)  
    const data = route.params           
    const numberPricesplit = data.price.split(" ")    
    const [indivPrice, setindivPrice] = useState(numberPricesplit[0])
    const [totalProductcount, settotalProductcount] = useState([0])
    const [modalShow, setmodalShow] = useState(false) 
    const [productArr, setproductArr] = useState([])      
    const [sizeArr, setsizeArr] = useState([])    
    const [loader, setloader] = useState(false)

    //***************//
    const [commonModal, setCommonmodal] = useState(false)
    
    const modalHandler = () => {
        setmodalShow(true)
        settotalProductcount([0])  
        setproductArr([]) 
        setsizeArr([])      
    }    
    
    const sizeClickHandler = (e) => {         
        const checkFore = productArr.filter(each=>each.size == e)                   
        if(checkFore.length == 0){                      
            setsizeArr(each=>[...each,e])
            setproductArr(each=>[...each,{"size":e,"qty":0}])

        }else{
            const notArraysize = sizeArr.filter(each=>each !== e)
            const notArrvalue = productArr.filter(each=>each.size !== e)            
            setsizeArr(notArraysize)            
            setproductArr(notArrvalue) 
            const checkForqtyRed = productArr.filter(each=>each.size === e)            
            settotalProductcount(totalProductcount-checkForqtyRed[0].qty)                                 
        }             
    }
    const qtyHandler = (key,size,qty) => {               
        const totalQtyref = []                            
        if(key === "add"){            
            const refProductarr = [...productArr]                                               
            refProductarr.map((each,index)=>{                                               
                if(each.size === size){                                        
                    refProductarr[index].qty = qty+1 
                    const totalQty = each.qty                    
                    totalQtyref.push(totalQty) 
                }else{
                    const totalQty = each.qty
                    totalQtyref.push(totalQty)
                }
            })
            setproductArr(refProductarr)            
        }else{
            const refProductarr = [...productArr]
            refProductarr.map((each,index)=>{                
                if(each.size === size && qty!==0){                    
                    refProductarr[index].qty = qty-1
                    const totalQty = each.qty
                    totalQtyref.push(totalQty)
                }else{
                    const totalQty = each.qty
                    totalQtyref.push(totalQty)
                }
            })
            setproductArr(refProductarr)
        } 
        sumFuction(totalQtyref)                                    
    }

    const sumFuction = (totalQtyref) => {
        var sumCount = 0
        totalQtyref.forEach(x=>{
            sumCount += x
        })
        settotalProductcount(sumCount)
    }
    
    const addCartHandler = async () => { 
        setloader(true)              
        let postObj = {}
            postObj.user_id = userVal.loggedIn.user_id
            postObj.product_id = data._id
            postObj.cart_lists = {
                product_name : data.title,
                product_image : data.product_image,
                size : productArr,
                total_qty : totalProductcount,
                indiv_price : data.price,
                act_size : data.sizes
            }             
        const response = await fetchPost(APILists.baseURL+"/cart_list",postObj,userVal.loggedIn.token)
            if(response[0].status === "success"){
                setloader(false)
                setmodalShow(false)    
                navigation.navigate("CartTab",{
                screen:'CartStack',
                params: {mutate : true}                
            }) 
        }
    }  
    
    //**********************************//

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
                <ScrollView>
                    <Text style={styles.priceText}>{data.price}</Text>
                    <Image 
                        source={{uri:APILists.baseURL+"/"+data.product_image}}
                        style={{ width: 350, height:350 }}
                    />
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
                        <TouchableOpacity style={styles.closeBtn} onPress={()=>setCommonmodal(true)}>
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
                            <CommonModal closeHandler={()=>modalCloaseHandler()} actualSizes={data.sizes} selectedSizes={[]} productImage={data.product_image} selectedProduct={[]} indivPrice={data.price} totalQtys={0} mode={"addToCart"}/>
                    </Modal>
                    <Modal animationType="fade"
                        transparent={false}
                        visible={modalShow}
                        onRequestClose={() => {                            
                            setmodalShow(false);
                        }}
                        >   
                            <View style={{alignItems:'center'}}>  
                                {loader &&
                                    <View style={styles.loadPosition}>
                                        <ActivityIndicator color={'#fff'} size={"large"}/>
                                    </View>
                                }                       
                                <Image 
                                    source={{uri:APILists.baseURL+"/"+data.product_image}}
                                    style={{ width: 350, height:350 }}
                                />
                            </View>
                            <View style={styles.modalBox}>                                
                                {data.sizes.map((each,index)=>{
                                    return(
                                        <TouchableOpacity key={index} onPress={()=>sizeClickHandler(each)}>                                            
                                            <Text style={sizeArr.includes(each) ? styles.modalSizeselected : styles.modalsizeText}>{each}</Text>
                                        </TouchableOpacity>
                                    )
                                })}
                            </View> 
                            {productArr.length > 0 ?
                                <View style={styles.sizeTable}>
                                    <Text style={styles.sizeTabtext}>Size</Text>
                                    <Text style={styles.sizeTabtext}>Qty</Text>
                                    <Text style={styles.sizeTabtext}>Amount</Text>
                                </View> :
                                <Text style={{fontFamily:'Comfortaa-Bold',margin:20}}>Please select the size and proceed to add cart...</Text>
                            }
                            {productArr.map((each,index)=>{
                                return(
                                    <View style={styles.sizeVal} key={index}>                                        
                                        <Text style={styles.sizeTabtext}>{each.size}</Text>
                                        <View style={styles.qtyAddbtn}>
                                            <TouchableOpacity style={styles.plusBtn} onPress={()=>qtyHandler("minus",each.size,each.qty)}>
                                                <MaterialCommunityIcons name="minus" color={"#fff"} size={20} />
                                            </TouchableOpacity>
                                            <Text style={styles.sizeTabtext}>{each.qty}</Text>
                                            <TouchableOpacity style={styles.plusBtn} onPress={()=>qtyHandler("add",each.size,each.qty)}>
                                                <MaterialCommunityIcons name="plus" color={"#fff"} size={20} />
                                            </TouchableOpacity>
                                        </View>                                        
                                        <Text style={styles.sizeTabtext}>{(each.qty)*indivPrice}</Text>                                        
                                    </View>
                                )
                            })}                            
                            {productArr.length > 0 &&                            
                                <Text style={styles.totalText}>Total : {totalProductcount*indivPrice}</Text>
                            }
                            <TouchableOpacity style={styles.closeBtn} onPress={() => setmodalShow(false)}>
                                <MaterialCommunityIcons name="close" color={"#fff"} size={24} />
                            </TouchableOpacity>
                            {productArr.length > 0 &&
                                <View style={{position:'absolute',bottom:20,width:"100%"}}>                                
                                    <View style={{alignItems:'center',justifyContent:'center'}}>                                    
                                        <ButtonCommon text={"Add Cart"} onPress={()=>addCartHandler()}/>
                                    </View>
                                </View>
                            }
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
        top:73,        
        left:0,
        zIndex:2                
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
    modalBox:{        
        alignItems:'flex-start',
        flexDirection:'row'
    },
    modalsizeText:{
        paddingVertical:10,
        paddingHorizontal:15,
        borderWidth:1,
        color:'#000',        
        marginLeft:20,        
    },
    modalSizeselected:{
        paddingVertical:10,
        paddingHorizontal:15,
        backgroundColor:'#000',
        borderWidth:1,
        color:'#fff',        
        marginLeft:20,
    },
    sizeTable:{
        alignItems:'flex-start',
        flexDirection:"row",
        justifyContent:'space-around',
        marginTop:20,
        marginHorizontal:20,        
        borderTopWidth:1,
        borderBottomWidth:1,        
    },
    sizeVal:{
        alignItems:'flex-start',
        flexDirection:"row",
        justifyContent:'space-around',
        marginHorizontal:20,                                    
    },
    sizeTabtext:{
        fontFamily:"Comfortaa-Bold",
        alignSelf:'center',
        padding:5,  
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
    totalText:{
        fontFamily:'Comfortaa-Bold',
        marginHorizontal:20,
        marginVertical:10,
        padding:5,
        textAlign:'right',
        borderTopWidth:1,
        borderBottomWidth:1
    },
    loadPosition:{
        position:'absolute',        
        top:175,
        zIndex:2,               
    }      
})