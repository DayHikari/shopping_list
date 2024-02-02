import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View, Platform } from "react-native";
import imagePaths from "../../image_paths_data/imagePathData";
import { supabase } from "../../supabase";


export default function AddForm({ setOptionSelected, setShoppingList }) {
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);

  const handleSubmit = async () => {
    if (product === "" || quantity === "") {
      return setErrorMessage("Please add both a prduct and quantity")
    };

    const imageCheck = product.toLocaleLowerCase().trim().replaceAll(" ", "_");

    let productObject;
    if (imagePaths[imageCheck]) {
      productObject = {
        product: product,
        image: imageCheck,
        quantity: quantity,
        checked: false,
      };
    } else {
      productObject = {
        product: product,
        image: "default",
        quantity: quantity,
        checked: false,
      };
    }

    const { data, error } = await supabase
      .from("initial_shopping_list")
      .insert([productObject])
      .select();

    if (error) {
      setErrorMessage(`Error: ${error}`);
    } else {
      setShoppingList((prev) => [...prev, data[0]]);
      setProduct("");
      setQuantity("");
      setErrorMessage(false);
      setOptionSelected(false);
    }
  };

  return (
    <View style={styles.form}>
      <Pressable
        style={styles.close}
        onPress={() => {
          setOptionSelected(false);
        }}
      >
        <Text style={styles.closeText}>X</Text>
      </Pressable>
      <Text style={styles.header}>Add an item</Text>
      <Text style={styles.subHeaders}>Product:</Text>
      <TextInput
        style={styles.textInputs}
        placeholder="Item name"
        onChangeText={(text) => {
          setProduct(text);
        }}
        value={product}
      />
      <Text style={styles.subHeaders}>Quantity:</Text>
      <TextInput
        style={styles.textInputs}
        placeholder="e.g.: 2 or 1 bag or 3 boxes"
        onChangeText={(text) => {
          setQuantity(text);
        }}
        value={quantity}
      />
      {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
      <Pressable style={styles.submit} onPress={handleSubmit}>
        <Text style={styles.submitText}>Submit</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    width: "95%",
    height: 280,
    backgroundColor: "#046835",
    display: "flex",
    alignItems: "center",
    padding: 5,
    borderRadius: 10,
  },
  close: {
    position: "absolute",
    top: "2%",
    right: "3%",
  },
  closeText: {
    fontSize: 17,
    color: "#FF8833",
    fontWeight: "700",
  },
  header: {
    fontSize: 25,
    fontFamily: Platform.select({
      ios: "Cochin",
      default: "serif",
    }),
    color: "#FF8833",
    fontWeight: "700",
    marginBottom: 10,
  },
  subHeaders: {
    fontSize: 17,
    fontFamily: Platform.select({
      ios: "Cochin",
      default: "serif",
    }),
    color: "#FF8833",
    fontWeight: "700",
    alignSelf: "flex-start",
    paddingLeft: 20,
  },
  textInputs: {
    backgroundColor: "#CDEEFD",
    width: "90%",
    height: 40,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#FF8833",
    padding: 10,
    marginBottom: 10,
    marginTop: 2,
    fontSize: 15,
    color: "#046835",
    fontFamily: Platform.select({
      ios: "Cochin",
      default: "serif",
    }),
    fontWeight: "700",
  },
  submit: {
    borderRadius: 10,
    backgroundColor: "#FF8833",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    margin: 10,
  },
  submitText: {
    fontSize: 17,
    fontFamily: Platform.select({
      ios: "Cochin",
      default: "serif",
    }),
    color: "#046835",
    fontWeight: "700",
  },
  error: {
    color: "red",
    fontSize: 16,
    fontFamily: Platform.select({
      ios: "Cochin",
      default: "serif",
    }),
    fontWeight: "700",
  },
});
