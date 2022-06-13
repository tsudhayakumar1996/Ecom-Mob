import React,{useState} from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MainTab from "./Tab/mainTab";
import LoginStack from "./Stacks/loginStack";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const TopContext = React.createContext()

export default function App () {

  const [loggedIn, setloggedIn] = useState({
    loggedIn:false,
    user:'',
    phone_no:'',
    token:''
  })
  const [cartBadgeCount, setcartBadgeCount] = useState(0)  

  const localStorageGet = async () => {
    try {
      const loggedIn = await AsyncStorage.getItem('loggedIn');
      const badgeCount = await AsyncStorage.getItem('cartBadgeCount');  
      const parsedbadgeCount = JSON.parse(badgeCount)   
      setcartBadgeCount(parsedbadgeCount)                                                      
      const parsed = JSON.parse(loggedIn)         
      setloggedIn({
        loggedIn:parsed.loggedIn,
        user:parsed.user,
        phone_no:parsed.phone_no,
        token:parsed.token,
        user_id:parsed.user_id
      })
    } catch(error) {
      console.log('error', error);
    };
  }
  
  React.useEffect(()=>{
    localStorageGet()
  },[])

  const Drawer = createDrawerNavigator();        

  return(        
      <TopContext.Provider value={{loggedIn,setloggedIn,cartBadgeCount,setcartBadgeCount}}>      
          <SafeAreaProvider>      
            <NavigationContainer>   
              {loggedIn.loggedIn ?             
                <Drawer.Navigator initialRouteName="Home">
                  <Drawer.Screen 
                    name="Drawer" 
                    component={MainTab}
                    options={{headerShown:false}}
                  />          
                </Drawer.Navigator>
                : <LoginStack></LoginStack>
              }
            </NavigationContainer>
          </SafeAreaProvider>      
      </TopContext.Provider>    
  )
}
