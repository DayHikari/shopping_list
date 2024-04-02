import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View, Platform } from "react-native";
import imagePaths from "../../image_paths_data/imagePathData";
import { supabase } from "../../supabase";
import baseStyles from "../../global_styles/baseStyle";


export default function EditForm({
  setOptionSelected,
  setShoppingList,
  selectedItem,
  setSelectedItem,
}) {
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);

  const productPlaceholder = selectedItem ? selectedItem.product : "Please select an item.";
  const quantityPlaceholder = selectedItem ? selectedItem.quantity : "Please select an item.";

  const handleSubmit = async () => {
    if (product === "" && quantity === "") {
      return setErrorMessage("Please make a change before submitting")
    };

    const imageCheck = product ? product.toLocaleLowerCase().trim().replaceAll(" ", "_") : selectedItem.image;

    const productData = product ? product : selectedItem.product;
    const quantityData = quantity ? quantity : selectedItem.quantity;
    const imageData = imagePaths[imageCheck] ? imageCheck : "default";

    const productObject = {
        product: productData,
        image: imageData,
        quantity: quantityData,
        checked: false,
        list_id: selectedItem.list_id
      };
      
    const { data, error } = await supabase
      .from("items")
      .update(productObject)
      .eq("id", selectedItem.id)
      .select();
      
    if (error) {
      setErrorMessage(`Error: ${error}`);
    } else {
      setShoppingList((prev) =>
        prev.map((obj) => obj.product === selectedItem.product ? data[0] : obj)
      );
      setProduct("");
      setQuantity("");
      setErrorMessage(false);
      setSelectedItem(false);
      setOptionSelected(false);
    }
  };

  return (
    <View style={baseStyles.form}>
      <Text style={baseStyles.formHeader}>Edit an item</Text>
      <Text style={baseStyles.formLabels}>Product:</Text>
      <TextInput
        style={baseStyles.textInputs}
        placeholder={productPlaceholder}
        onChangeText={(text) => {
          setProduct(text);
        }}
        value={product}
      />
      <Text style={baseStyles.formLabels}>Quantity:</Text>
      <TextInput
        style={baseStyles.textInputs}
        placeholder={quantityPlaceholder}
        onChangeText={(text) => {
          setQuantity(text);
        }}
        value={quantity}
      />
      {errorMessage && <Text style={baseStyles.error}>{errorMessage}</Text>}
      <Pressable style={baseStyles.formButtons} onPress={handleSubmit}>
        <Text style={baseStyles.formButtonText}>Edit</Text>
      </Pressable>
    </View>
  );
};