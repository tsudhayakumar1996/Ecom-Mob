import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "../pages/home";
import IndivProduct from "../pages/indivProduct";

export default function HomeStack () {

    const HomeStack = createNativeStackNavigator();
    
    return(
        <HomeStack.Navigator>
            <HomeStack.Screen 
                name="HomeStack" 
                component={Home} 
                options={{
                    headerShown:false
                }}
            /> 
            <HomeStack.Screen 
                name="IndivProductStack" 
                component={IndivProduct} 
                options={{
                    headerShown:false
                }}
            />     
        </HomeStack.Navigator>
    )    
}