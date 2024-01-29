import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import imagePaths from "../../image_paths_data/imagePathData";
import { supabase } from "../../supabase";

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
      };
      
    const { data, error } = await supabase
      .from("initial_shopping_list")
      .update(productObject)
      .eq("product", selectedItem.product)
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
    <View style={styles.form}>
      <Pressable
        style={styles.close}
        onPress={() => {
          setOptionSelected(false);
        }}
      >
        <Text style={styles.closeText}>X</Text>
      </Pressable>
      <Text style={styles.header}>Edit an item</Text>
      <Text style={styles.subHeaders}>Product:</Text>
      <TextInput
        style={styles.textInputs}
        placeholder={productPlaceholder}
        onChangeText={(text) => {
          setProduct(text);
        }}
        value={product}
      />
      <Text style={styles.subHeaders}>Quantity:</Text>
      <TextInput
        style={styles.textInputs}
        placeholder={quantityPlaceholder}
        onChangeText={(text) => {
          setQuantity(text);
        }}
        value={quantity}
      />
      {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
      <Pressable style={styles.submit} onPress={handleSubmit}>
        <Text style={styles.submitText}>Edit</Text>
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
