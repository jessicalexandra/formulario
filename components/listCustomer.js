import { StyleSheet, View ,Text, FlatList} from "react-native";
import { styles } from "../assets/Styles/Styles";
import axios from "axios";
import { useEffect, useState } from "react";


export default function listCustomer() {
    const [dataCustomers,setDataCustomers]=useState([]);
    const getCustomers =async()=>{
    const customers =await axios.get(`http://127.0.0.1:3000/api/clientes`)
     setDataCustomers(customers.data);
    }
    useEffect(()=>{

        if (dataCustomers.length ===0) {
            getCustomers();
            console.log(dataCustomers);  
        }
        
    },[setDataCustomers]);
    
    return(
        <View style={styles.container}>
            <Text style={{color:'blue',fontSize:'25'}}>list Customer</Text>
            <FlatList
        data={dataCustomers}
        renderItem={({item}) =>(<text>{item._id}{item.nombre}{item.apellidos}</text>)}
        
      />
        </View>
    )
}