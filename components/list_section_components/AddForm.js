import { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Platform,
} from "react-native";
import imagePaths from "../../image_paths_data/imagePathData";
import { supabase } from "../../supabase";

export default function AddForm({
  setOptionSelected,
  setShoppingList,
  selectedList,
}) {
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);

  const handleSubmit = async () => {
    if (product === "" || quantity === "") {
      return setErrorMessage("Please add both a product and quantity");
    };

    const imageCheck = product.toLocaleLowerCase().trim().replaceAll(" ", "_");

    const productObject = imagePaths[imageCheck]
      ? {
          product: product,
          image: imageCheck,
          quantity: quantity,
          checked: false,
          list_id: selectedList.list_id,
        }
      : {
          product: product,
          image: "default",
          quantity: quantity,
          checked: false,
          list_id: selectedList.list_id,
        };

    const { data, error } = await supabase
      .from("items")
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
    width: "100%",
    maxHeight: 300,
    backgroundColor: "#034222",
    display: "flex",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
  },
  close: {
    position: "absolute",
    top: "2%",
    right: "5%",
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
      default: "notoserif",
    }),
    color: "#F0F7F4",
    fontWeight: "700",
    marginBottom: 10,
  },
  subHeaders: {
    fontSize: 17,
    fontFamily: Platform.select({
      ios: "Cochin",
      default: "notoserif",
    }),
    color: "#B3BFB8",
    fontWeight: "700",
    alignSelf: "flex-start",
    paddingLeft: 20,
  },
  textInputs: {
    backgroundColor: "#F0F7F4",
    width: "90%",
    height: 40,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#B3BFB8",
    padding: 10,
    marginBottom: 10,
    marginTop: 2,
    fontSize: 15,
    color: "#034222",
    fontFamily: Platform.select({
      ios: "Cochin",
      default: "notoserif",
    }),
    fontWeight: "700",
  },
  submit: {
    borderRadius: 10,
    backgroundColor: "#FF8833",
    paddingHorizontal: 20,
    paddingVertical: 10,
    margin: 10,
  },
  submitText: {
    fontSize: 17,
    fontFamily: Platform.select({
      ios: "Cochin",
      default: "notoserif",
    }),
    color: "#034222",
    fontWeight: "700",
  },
  error: {
    color: "red",
    fontSize: 16,
    fontFamily: Platform.select({
      ios: "Cochin",
      default: "notoserif",
    }),
    fontWeight: "700",
  },
});
