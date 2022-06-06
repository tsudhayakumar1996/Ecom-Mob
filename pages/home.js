import React,{useContext} from "react";
import {FlatList, StyleSheet,StatusBar,Text,TouchableOpacity,Image} from "react-native"
import SafeAreaView from 'react-native-safe-area-view';
import NavBar from "../components/navBar";
import { APILists } from "../apilists";
import { TopContext } from "../App";
import { ProductSwr } from "../swr/productSWR";

export default function Home ({navigation}) {  
    
    const contextVal = useContext(TopContext)        
    const {data,isLoading,isError} = ProductSwr(APILists.baseURL+"/product",contextVal.loggedIn.token)
    console.log(data,"data from")     
    
    const indivProductHandler = (item) =>{
        navigation.navigate("IndivProductStack",item)
    }
    
    const renderItem = ({ item }) => (        
        <TouchableOpacity style={styles.imgCenter} onPress={()=>indivProductHandler(item)}> 
            <Text style={styles.priceText}>{item.price}</Text>
            <Image 
                source={{uri:APILists.baseURL+"/"+item.product_image}}
                style={{ width: 350, height:350 }}
            />
            <Text style={styles.textBlack}>{item.title}</Text>
        </TouchableOpacity>
    );

    return(
        <SafeAreaView style={styles.container}>
            {!isLoading &&
                <>
                    <StatusBar barStyle="dark-content" backgroundColor="white" />
                    <NavBar props={navigation}/>
                    <FlatList
                        data={data[0]}
                        renderItem={renderItem}
                        keyExtractor={item => item._id}
                    />
                </>
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({ 
    container:{
        flex:1,        
        backgroundColor:'#fff'                    
    },
    imgCenter:{
        alignItems:'center'
    },
    textBlack:{
        color:'#000',
        fontSize:18,
        textAlign:'center',
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
})

