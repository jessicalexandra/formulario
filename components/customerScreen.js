import { StyleSheet, Text, View } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { TextInput, Button } from "react-native-paper";
import { styles } from "../assets/Styles/Styles";
import axios from "axios";
import { useState } from "react";

export default function customerScreen() {
  const[messege,setmessage]=useState('')
  const [isError,setIsError]=useState('false')
  const [idSearch,SetidSearch]=useState('')
  const {
    control,
    handleSubmit,
    formState: { errors },reset,setValue
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
    },
  });
  const onSave = async(data) =>{
    let nombre=data.firstName
    let apellidos=data.lastName
    const response = await axios.post(`http://localhost:3000/api/clientes`, {
      nombre,
      apellidos,
    });
    setIsError(false);
    setmessage("cliente agregado correctamente");
    setTimeout(() => {
      setmessage('');
    }, 2000);
      reset()
  }
  const onUpdate = async(data) =>{
  
    const response = await axios.put(`http://127.0.0.1:3000/api/clientes/${idSearch}`, {
      nombre:data.firstName,
      apellidos:data.lastName
    });
    setIsError(false);
    setmessage("cliente actualizado correctamente");
    setTimeout(() => {
      setmessage('');
      reset();
    }, 2000);
    SetidSearch('');
  }
  const onDelete = async(data) =>{
    if (confirm(`esta seguro de eliminar al cliente ${data.firstName} ${data.lastName}`)) {
      const response=await axios.delete(`http://127.0.0.1:3000/api/clientes/${idSearch}`);
      setIsError(false);
      setmessage("cliente eliminado correctamente");
      data.firstName=" ";
      data.lastName=" ";
      setTimeout(() => {
        setmessage('');
        reset();
      }, 2000);
    } }

  // } console.log(data);
  const onSearch=async()=>{
    const response=await axios.get(`http://127.0.0.1:3000/api/clientes/${idSearch}`);
    console.log(response.data)
    if(response.data){
      setValue("firstName",response.data.nombre)
      setValue("lastName",response.data.apellidos)
    }else{
      setIsError(true)
      setmessage("id del cliente no existe")
    }
  }


  return (
    <View style={styles.container}>
      <Text style={{fontSize:32}}>CLIENTES</Text>
      <TextInput
      label="Ingrese el id que  desea buscar"
      mode="outlined"
      left=""
      onChangeText={idSearch=>SetidSearch(idSearch)}
      value={idSearch}></TextInput>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="nombre completo"
            mode="outlined"
            left={<TextInput.Icon icon="account" />}
            style={{ marginBottom: 20, backgroundColor: "powderblue" }}
            placeholder="First name"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="firstName"
      />
      {errors.firstName && (
        <Text style={{ color: "red" }}> El nombre es obligatorio.</Text>
      )}

      <Controller
        control={control}
        rules={{
          required:true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Apellidos"
            mode="outlined"
            left={<TextInput.Icon icon="account" />}
            style={{ marginBottom: 20, backgroundColor: "powderblue" }}
            placeholder="Last name"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="lastName"
      />
      {errors.lastName && (
        <Text style={{ color: "red" }}> el apellido es obligatorio.</Text>
      )}
      <Text style={{color:isError?'red':'green'}}>{messege}</Text>
      <View style={{flexDirection:'row',gap:10}}>
        <Button
          icon="plus-box"
          mode="contained"
          onPress={handleSubmit(onSave)}
          style={{ backgroundColor: "grey" }}
        >
          GUARDAR
        </Button>
        <Button
          icon="card-search-outline"
          mode="contained"
          onPress={(onSearch)}
          style={{ backgroundColor: "pink" }}
        >
          BUSCAR
        </Button>
        
      </View>
      <View style={{flexDirection:'row',marginTop:10, gap:10}}>
        <Button
          icon="plus-box"
          mode="contained"
          onPress={handleSubmit(onUpdate)}
          style={{ backgroundColor: "purple" }}
        >
          ACTUALIZAR
        </Button>
       
        <Button
          icon="card-search-outline"
          mode="contained"
          onPress={() => console.log("Pressed")}
          style={{ backgroundColor: "red" }}
        >
          ELIMINAR
        </Button>
      </View>
      

    </View>
  );
}

