import React,{useState,useContext} from "react";
import { useFocusEffect } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {View,StyleSheet,Text, Image, TouchableOpacity,Modal,ActivityIndicator} from "react-native"
import { APILists } from "../apilists";
import ButtonCommon from "./button";

export default function ProductModal ({productDetails,onPress}) {    
        
    const [loader, setloader] = useState(false)
    const [productArr, setproductArr] = useState([]) 
    const [sizeArr, setsizeArr] = useState([])    
    const [indivPrice, setindivPrice] = useState()

    useFocusEffect(React.useCallback(() => {            
        setUpData()                  
    }, [])
    )

    const setUpData = () => {        
    let sizeVal = []
        productDetails.size.map((each)=>{
            sizeVal.push(each.size)
        })
    setsizeArr(sizeVal)
    setproductArr(productDetails.size)
    const priceSplited = productDetails.indiv_price.split(" ")
    setindivPrice(priceSplited[0])      
    }    

    // const sizeClickHandler = (e) => {         
    //     const checkFore = productArr.filter(each=>each.size == e)                   
    //     if(checkFore.length == 0){                      
    //         setsizeArr(each=>[...each,e])
    //         setproductArr(each=>[...each,{"size":e,"qty":0}])

    //     }else{
    //         const notArraysize = sizeArr.filter(each=>each !== e)
    //         const notArrvalue = productArr.filter(each=>each.size !== e)            
    //         setsizeArr(notArraysize)            
    //         setproductArr(notArrvalue) 
    //         const checkForqtyRed = productArr.filter(each=>each.size === e)            
    //         settotalProductcount(totalProductcount-checkForqtyRed[0].qty)                                 
    //     }             
    // }

    // const qtyHandler = (key,size,qty) => {               
    //     const totalQtyref = []                            
    //     if(key === "add"){            
    //         const refProductarr = [...productArr]                                               
    //         refProductarr.map((each,index)=>{                                               
    //             if(each.size === size){                                        
    //                 refProductarr[index].qty = qty+1 
    //                 const totalQty = each.qty                    
    //                 totalQtyref.push(totalQty) 
    //             }else{
    //                 const totalQty = each.qty
    //                 totalQtyref.push(totalQty)
    //             }
    //         })
    //         setproductArr(refProductarr)            
    //     }else{
    //         const refProductarr = [...productArr]
    //         refProductarr.map((each,index)=>{                
    //             if(each.size === size && qty!==0){                    
    //                 refProductarr[index].qty = qty-1
    //                 const totalQty = each.qty
    //                 totalQtyref.push(totalQty)
    //             }else{
    //                 const totalQty = each.qty
    //                 totalQtyref.push(totalQty)
    //             }
    //         })
    //         setproductArr(refProductarr)
    //     } 
    //     sumFuction(totalQtyref)                                    
    // }

    // const sumFuction = (totalQtyref) => {
    //     var sumCount = 0
    //     totalQtyref.forEach(x=>{
    //         sumCount += x
    //     })
    //     settotalProductcount(sumCount)
    // }

    // const addCartHandler = async () => { 
    //     setloader(true)              
    //     let postObj = {}
    //         postObj.user_id = userVal.loggedIn.user_id
    //         postObj.cart_lists = {
    //             product_name : data.title,
    //             product_image : data.product_image,
    //             size : productArr,
    //             total_qty : totalProductcount,
    //             indiv_price : data.price
    //         }             
    //     const response = await fetchPost(APILists.baseURL+"/cart_list",postObj,userVal.loggedIn.token)
    //         if(response[0].status === "success"){
    //             setloader(false)
    //             setmodalShow(false)    
    //             navigation.navigate("CartTab",{
    //             screen:'CartStack'                               
    //         }) 
    //     }
    // }

    const modalCloseHandler = () => {
        onPress(false)        
    }

    return(    
            <> 
                {productDetails && 
                    <>                                                             
                        <View style={{alignItems:'center'}}>  
                            {loader &&
                                <View style={styles.loadPosition}>
                                    <ActivityIndicator color={'#fff'} size={"large"}/>
                                </View>
                            }                       
                            <Image 
                                source={{uri:APILists.baseURL+"/"+productDetails.product_image}}
                                style={{ width: 350, height:350 }}
                            />                            
                        </View>
                        <View style={styles.modalBox}>                                
                            {sizeArr.map((each,index)=>{
                                return(
                                    <TouchableOpacity key={index} onPress={()=>sizeClickHandler(each)}>                                            
                                        <Text style={sizeArr.includes(each) ? styles.modalSizeselected : styles.modalsizeText}>{each}</Text>
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                        {/* {productArr.length > 0 ?
                            <View style={styles.sizeTable}>
                                <Text style={styles.sizeTabtext}>Size</Text>
                                <Text style={styles.sizeTabtext}>Qty</Text>
                                <Text style={styles.sizeTabtext}>Amount</Text>
                            </View> :
                            <Text style={{fontFamily:'Comfortaa-Bold',margin:20}}>Please select the size and proceed to add cart...</Text>
                        } */}
                        {/* {productArr.map((each,index)=>{
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
                        })}                             */}
                        {/* {productArr.length > 0 &&                            
                            <Text style={styles.totalText}>Total : {productDetails.total_qty*indivPrice}</Text>
                        } */}
                        <TouchableOpacity style={styles.closeBtn} onPress={() => modalCloseHandler()}>
                            <MaterialCommunityIcons name="close" color={"#fff"} size={24} />
                        </TouchableOpacity>
                        {/* {productArr.length > 0 &&
                            <View style={{position:'absolute',bottom:20,width:"100%"}}>                                
                                <View style={{alignItems:'center',justifyContent:'center'}}>                                    
                                    <ButtonCommon text={"Add Cart"} onPress={()=>addCartHandler()}/>
                                </View>
                            </View>
                        } */}  
                    </>
                }
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
    modalBox:{        
        alignItems:'flex-start',
        flexDirection:'row'
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