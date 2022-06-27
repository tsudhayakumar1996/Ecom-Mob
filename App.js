import React,{useState} from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MainTab from "./Tab/mainTab";
import LoginStack from "./Stacks/loginStack";
import AsyncStorage from '@react-native-async-storage/async-storage';
import DrawerContent from "./Drawer/drawer_content";

export const TopContext = React.createContext()

export default function App () {

  const [loggedIn, setloggedIn] = useState({
    loggedIn:false,
    user:'',
    phone_no:'',
    token:'',
    user_image:'',    
  })
  const [cartBadgeCount, setcartBadgeCount] = useState(0)  
  const [products, setproducts] = useState([])
  
  const localStorageGet = async () => {
    try {
      const loggedIn = await AsyncStorage.getItem('loggedIn');      
      const badgeCount = await AsyncStorage.getItem('cartBadgeCount');        
      const parsedbadgeCount = badgeCount ? JSON.parse(badgeCount) : 0 
      setcartBadgeCount(parsedbadgeCount)                                                      
      const parsed = loggedIn ? JSON.parse(loggedIn) : {
        loggedIn:false,
        user:false,
        phone_no:null,
        token:null,
        user_id:null,
        user_image:null
      }
      setloggedIn({
        loggedIn:parsed.loggedIn,
        user:parsed.user,
        phone_no:parsed.phone_no,
        token:parsed.token,
        user_id:parsed.user_id,
        user_image:parsed.user_image
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
      <TopContext.Provider value={{loggedIn,setloggedIn,cartBadgeCount,setcartBadgeCount,setproducts,products}}>      
          <SafeAreaProvider>      
            <NavigationContainer>   
              {loggedIn.loggedIn ?             
                <Drawer.Navigator initialRouteName="Home" drawerContent={ (props) => <DrawerContent {...props}/>}>
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
