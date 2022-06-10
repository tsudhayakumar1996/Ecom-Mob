import React,{useState,useContext} from "react";
import {View,StyleSheet,Text, Image, TouchableOpacity,Modal,ScrollView,ActivityIndicator} from "react-native"

export default function ProductModal () {
    return(
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
    )
}