import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Cart from "../pages/cart";

export default function CartStack () {

    const CartStack = createNativeStackNavigator();
    
    return(
        <CartStack.Navigator>
            <CartStack.Screen 
                name="CartStack" 
                component={Cart} 
                options={{
                    headerShown:false
                }}
            />      
        </CartStack.Navigator>
    )    
}