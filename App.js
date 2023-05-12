import { StyleSheet, Text, View } from "react-native";
import { Axios } from "axios";
import { useForm, Controller } from "react-hook-form";
import { TextInput, Button } from "react-native-paper";

export default function App() {
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
  const onSubmit = (data) => console.log(data);
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
          maxLength: 100,
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
      <View style={{flexDirection:'row'}}>
        <Button
          icon="plus-box"
          mode="contained"
          onPress={() => console.log("Pressed")}
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
      <View style={{flexDirection:'row',marginTop:10}}>
        <Button
          icon="plus-box"
          mode="contained"
          onPress={() => console.log("Pressed")}
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
      <View style={{flexDirection:'row', marginTop:10}}>
    
       <Button
          icon="card-search-outline"
          mode="contained"
          onPress={() => console.log("Pressed")}
          style={{ backgroundColor: "green" }}
        >
          LISTAR
        </Button>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
