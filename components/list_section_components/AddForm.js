import { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import imagePaths from "../../image_paths_data/imagePathData";
import { supabase } from "../../supabase";
import baseStyles from "../../global_styles/baseStyle";

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
    <View style={baseStyles.form}>
      <Pressable
        style={styles.close}
        onPress={() => {
          setOptionSelected(false);
        }}
      >
        <Text style={styles.closeText}>X</Text>
      </Pressable>
      <Text style={baseStyles.formHeader}>Add an item</Text>
      <Text style={baseStyles.formlLabels}>Product:</Text>
      <TextInput
        style={baseStyles.textInputs}
        placeholder="Item name"
        onChangeText={(text) => {
          setProduct(text);
        }}
        value={product}
      />
      <Text style={baseStyles.formlLabels}>Quantity:</Text>
      <TextInput
        style={baseStyles.textInputs}
        placeholder="e.g.: 2 or 1 bag or 3 boxes"
        onChangeText={(text) => {
          setQuantity(text);
        }}
        value={quantity}
      />
      {errorMessage && <Text style={baseStyles.error}>{errorMessage}</Text>}
      <Pressable style={baseStyles.formButtons} onPress={handleSubmit}>
        <Text style={baseStyles.formButtonText}>Submit</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
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
});
