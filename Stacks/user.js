import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import User from '../pages/user';

export default function UserStack () {

    const UserStack = createNativeStackNavigator();
    return(
        <UserStack.Navigator>
            <UserStack.Screen 
                name="UserStack" 
                component={User} 
                options={{
                    headerShown:false
                }}
            />      
        </UserStack.Navigator>
    )    
}