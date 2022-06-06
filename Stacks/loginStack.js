import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Flash from "../pages/flash";
import Login from "../pages/login";

export default function LoginStack () {

    const LoginStack = createNativeStackNavigator();
    
    return(
        <LoginStack.Navigator>            
            <LoginStack.Screen 
                name="Flash" 
                component={Flash} 
                options={{
                    headerShown:false
                }}
            />  
            <LoginStack.Screen 
                name="Register/Login" 
                component={Login} 
                options={{
                    headerShown:false
                }}
            />               
        </LoginStack.Navigator>
    )    
}