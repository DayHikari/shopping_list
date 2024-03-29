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
      <Pressable
        style={styles.close}
        onPress={() => {
          setOptionSelected(false);
        }}
      >
        <Text style={styles.closeText}>X</Text>
      </Pressable>
      <Text style={baseStyles.formHeader}>Edit an item</Text>
      <Text style={baseStyles.formlLabels}>Product:</Text>
      <TextInput
        style={baseStyles.textInputs}
        placeholder={productPlaceholder}
        onChangeText={(text) => {
          setProduct(text);
        }}
        value={product}
      />
      <Text style={baseStyles.formlLabels}>Quantity:</Text>
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
      ios: "Avenir-Heavy",
      default: "notoserif",
    }),
    color: "#F0F7F4",
    fontWeight: "700",
    marginBottom: 10,
  },
  subHeaders: {
    fontSize: 17,
    fontFamily: Platform.select({
      ios: "Avenir-Heavy",
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
      ios: "Avenir-Heavy",
      default: "notoserif",
    }),
    fontWeight: "700",
  },
  submit: {
    borderRadius: 10,
    backgroundColor: "#FF8833",
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginTop: 10,
  },
  submitText: {
    fontSize: 20,
    fontFamily: Platform.select({
      ios: "Avenir-Heavy",
      default: "notoserif",
    }),
    color: "#034222",
    fontWeight: "700",
  },
  error: {
    color: "red",
    fontSize: 16,
    fontFamily: Platform.select({
      ios: "Avenir-Heavy",
      default: "notoserif",
    }),
    fontWeight: "700",
  },
});
