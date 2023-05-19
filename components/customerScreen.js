import { StyleSheet, Text, View } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { TextInput, Button } from "react-native-paper";
import { styles } from "../assets/Styles/Styles";
import axios from "axios";

export default function customerScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
    },
  });
  const onSave = async(data) =>{
    let nombre=data.firstName
    let apellidos=data.lastName
    const response = await axios.post(`http://127.0.0.1:3000/api/clientes`, {
      nombre,
      apellidos,
    });
  }
  // } console.log(data);
  
  return (
    <View style={styles.container}>
      <Text style={{fontSize:32}}>CLIENTES</Text>
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
          onPress={() => console.log("Pressed")}
          style={{ backgroundColor: "pink" }}
        >
          BUSCAR
        </Button>
        
      </View>
      <View style={{flexDirection:'row',marginTop:10, gap:10}}>
        <Button
          icon="plus-box"
          mode="contained"
          onPress={()=>console.log("Pressed")}
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

