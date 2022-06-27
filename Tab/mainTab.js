import React,{useContext} from "react";
import { TopContext } from "../App";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import UserStack from "../Stacks/user";
import HomeStack from "../Stacks/homestack";
import ProductStack from "../Stacks/productStack";
import CartStack from "../Stacks/cartStack";

export default function MainTab () {

    const contextVal = useContext(TopContext)    
    const Tab = createBottomTabNavigator();    

    return(
        <Tab.Navigator>
          <Tab.Screen 
                name="HomeTab"  
                component={HomeStack} 
                options={{
                    headerShown:false,
                    tabBarLabel: 'Home',
                    tabBarActiveTintColor:'#fff',  
                    tabBarInactiveTintColor:'#000',                                      
                    tabBarShowLabel:false,
                    tabBarActiveBackgroundColor:'#000',
                    tabBarInactiveBackgroundColor:'#fff',
                    showLabel:false,                    
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="home" color={color} size={26} />
                    ),
                }}
          />
          {/* <Tab.Screen 
               name="ProductTab" 
               component={ProductStack} 
               options={{
                    headerShown:false,
                    tabBarLabel: 'Product',
                    tabBarActiveTintColor:'#fff',
                    tabBarInactiveTintColor:'#000',
                    tabBarActiveBackgroundColor:'#000',
                    tabBarInactiveBackgroundColor:'#fff',                                        
                    tabBarShowLabel:false,
                    showLabel:false,
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="dots-grid" color={color} size={26} />
                    ),
              }}
          /> */}
          <Tab.Screen 
               name="CartTab" 
               component={CartStack} 
               options={{
                    headerShown:false,  
                    tabBarLabel: 'Cart',
                    tabBarInactiveTintColor:'#000',  
                    tabBarActiveTintColor:'#fff',
                    tabBarActiveBackgroundColor:'#000',
                    tabBarInactiveBackgroundColor:'#fff',                                      
                    tabBarShowLabel:false,
                    showLabel:false,
                    tabBarBadge:contextVal.cartBadgeCount === 0 ? undefined : contextVal.cartBadgeCount,
                    tabBarBadgeStyle:{
                        backgroundColor:'#000',
                        fontSize:12
                    },
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="cart-minus" color={color} size={26} />
                    ),
              }}
          />
          <Tab.Screen 
               name="UserTab" 
               component={UserStack} 
               options={{
                    headerShown:false,  
                    tabBarLabel: 'User',
                    tabBarInactiveTintColor:'#000', 
                    tabBarActiveTintColor:'#fff',
                    tabBarActiveBackgroundColor:'#000',
                    tabBarInactiveBackgroundColor:'#fff',                                       
                    tabBarShowLabel:false,
                    showLabel:false,
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="account-outline" color={color} size={26} />
                    ),
              }}
          />          
        </Tab.Navigator>
    )
}