import { useState } from "react";
import {
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import imagePaths from "../../image_paths_data/imagePathData";
import { supabase } from "../../supabase";
import baseStyles from "../../global_styles/baseStyle";

export default function AddForm({
  shoppingList,
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

    const itemAlreadyPresent = shoppingList.filter(itemInfo => itemInfo.product.toLocaleLowerCase() == product.toLocaleLowerCase());

    if (itemAlreadyPresent.length !== 0) {
      return setErrorMessage("Item already in list.");
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
      setErrorMessage("Item added.");
    }
  };

  return (
    <View style={baseStyles.form}>
      <Text style={baseStyles.formHeader}>Add an item</Text>
      <Text style={baseStyles.formLabels}>Product:</Text>
      <TextInput
        style={baseStyles.textInputs}
        placeholder="Item name"
        onChangeText={(text) => {
          setProduct(text);
        }}
        value={product}
      />
      <Text style={baseStyles.formLabels}>Quantity:</Text>
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
};
