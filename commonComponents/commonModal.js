import React,{useState,useContext} from "react"
import {View,StyleSheet,Text, Image, TouchableOpacity,ActivityIndicator} from "react-native"
import ButtonCommon from "./button";
import { fetchPost, fetchUpdate } from "../fetching/fetchingPost";
import { APILists } from "../apilists";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TopContext } from "../App";

export default function CommonModal ({closeHandler,actualSizes,selectedSizes,productImage,selectedProduct,indivPrice,totalQtys,productId,productName,mode,navigation,uniqueId}) {

    const contextVal = useContext(TopContext)
    const indiv_price = indivPrice.split(' ')
    const [selectedSizesFromState, setselectedSizes] = useState(selectedSizes) 
    const [selectedProductFromState, setselectedProduct] = useState(selectedProduct)  
    const [totalProductCount, settotalProductCount] = useState(totalQtys) 
    const [loader, setloader] = useState(false)

    const modalCloseHandler = () => {
        setselectedSizes([])   
        setselectedProduct([])  
        settotalProductCount(0)
        closeHandler()           
    }

    const sizeClickHandler = (e) => {         
        const checkFore = selectedProductFromState.filter(each=>each.size == e)                   
        if(checkFore.length == 0){                      
            setselectedSizes(each=>[...each,e])
            setselectedProduct(each=>[...each,{"size":e,"qty":0}])

        }else{
            const notArraysize = selectedSizesFromState.filter(each=>each !== e)
            const notArrvalue = selectedProductFromState.filter(each=>each.size !== e)            
            setselectedSizes(notArraysize)            
            setselectedProduct(notArrvalue)                                            
        }             
    }

    const qtyHandler = (key,size,qty) => {               
        const totalQtyref = []                            
        if(key === "add"){            
            const refProductarr = [...selectedProductFromState]                                               
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
            setselectedProduct(refProductarr)            
        }
        else{
            const refProductarr = [...selectedProductFromState]
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
            setselectedProduct(refProductarr)
        } 
        sumFuction(totalQtyref)                                    
    }

    const sumFuction = (totalQtyref) => {
        var sumCount = 0
        totalQtyref.forEach(x=>{
            sumCount += x
        })
        settotalProductCount(sumCount)
    }

    const addCartHandler = async () => { 
        setloader(true)   
        if(mode === "addToCart"){           
            let postObj = {}
                postObj.user_id = contextVal.loggedIn.user_id
                postObj.product_id = productId
                postObj.cart_lists = {
                    product_name : productName,
                    product_image : productImage,
                    size : selectedProductFromState,
                    total_qty : totalProductCount,
                    indiv_price : indivPrice,
                    act_size : actualSizes
                }             
            const response = await fetchPost(APILists.baseURL+"/cart_list",postObj,contextVal.loggedIn.token)
                if(response[0].status === "success"){
                    setloader(false)                   
                    closeHandler() 
                    navigation.navigate("CartTab",{
                    screen:'CartStack'                               
                }) 
            }
        }else{
            let postObj = {}
            postObj.unique_id = uniqueId
            postObj.product_id = productId
            postObj.product_name = productName
            postObj.product_image = productImage
            postObj.size = selectedProductFromState
            postObj.total_qty = totalProductCount
            postObj.indiv_price = indivPrice
            postObj.act_size = actualSizes  
            const response = await fetchUpdate (APILists.baseURL+"/cart_list/"+contextVal.loggedIn.user_id+"/"+uniqueId,postObj,contextVal.loggedIn.token)
            if(response[0].status === "success"){
                setloader(false)                   
                closeHandler()                 
            }
        }                  
    }

    return(
        <>            
            <TouchableOpacity style={styles.closeBtn} onPress={() => modalCloseHandler()}>
                <MaterialCommunityIcons name="close" color={"#fff"} size={24} />
            </TouchableOpacity>            
            <View style={{alignItems:'center'}}>  
                {loader &&
                    <View style={styles.loadPosition}>
                        <ActivityIndicator color={'#fff'} size={"large"}/>
                    </View>
                }                       
                <Image 
                    source={{uri:APILists.baseURL+"/"+productImage}}
                    style={{ width: 350, height:350 }}
                />
            </View>
            <View style={styles.modalBox}>                                
                {actualSizes.map((each,index)=>{
                    return(
                        <TouchableOpacity key={index} onPress={()=>sizeClickHandler(each)}>                                            
                            <Text style={selectedSizesFromState.includes(each) ? styles.modalSizeselected : styles.modalsizeText}>{each}</Text>
                        </TouchableOpacity>
                    )
                })}
            </View>
            {selectedProductFromState.length > 0 ?
                <View style={styles.sizeTable}>
                    <Text style={styles.sizeTabtext}>Size</Text>
                    <Text style={styles.sizeTabtext}>Qty</Text>
                    <Text style={styles.sizeTabtext}>Amount</Text>
                </View> :
                <Text style={{fontFamily:'Comfortaa-Bold',margin:20}}>Please select the size and proceed to add cart...</Text>
            }
            {selectedProductFromState.map((each,index)=>{
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
                        <Text style={styles.sizeTabtext}>{(each.qty)*indiv_price[0]}</Text>                                        
                    </View>
                )
            })}                            
            {selectedProductFromState.length > 0 &&                            
                <Text style={styles.totalText}>Total : {totalProductCount*indiv_price[0]}</Text>
            }
            {selectedProductFromState.length > 0 &&
                <View style={{position:'absolute',bottom:20,width:"100%"}}>                                
                    <View style={{alignItems:'center',justifyContent:'center'}}>                                    
                        <ButtonCommon text={"Add Cart"} onPress={()=>addCartHandler()}/>
                    </View>
                </View>
            }
        </>
    )
}

const styles = StyleSheet.create({     
    closeBtn:{
        padding:10,        
        position:'absolute',
        right:0,
        backgroundColor:'#000',
        zIndex:2
    },
    loadPosition:{
        position:'absolute',        
        top:175,
        zIndex:2,               
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
})