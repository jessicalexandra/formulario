import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import{MaterialIcons} from '@expo/vector-icons'
import customerScreen from './customerScreen';
import listCustomer from './listCustomer';

const Tab = createBottomTabNavigator();

export default  function HomeTabs() {
  return (
    <Tab.Navigator
    screenOptions={{
        headerShown:false,
        tabBarActiveBackgroundColor:'#2b78fd'
    }}>
      <Tab.Screen name="Customer" component={customerScreen} options={{title:
        'clientes',
        tabBarIcon:({color})=>(
            <MaterialIcons name='account-circle' size={25} color={'red'}/>
        ),

    }} />
      <Tab.Screen name="listCustomer" component={listCustomer}options={{title:'listado clientes',
     tabBarIcon:({color})=>(
        <MaterialIcons name='view-list' size={25} color={'green'}/>
    ),}} />
    </Tab.Navigator>
  );
}