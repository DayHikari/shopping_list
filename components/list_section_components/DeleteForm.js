import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import imagePaths from "../../image_paths_data/imagePathData";
import { supabase } from "../../supabase";

export default function DeleteForm({
  setOptionSelected,
  setShoppingList,
  selectedItem,
  setSelectedItem,
}) {
  const [confirmed, setConfirmed] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const productPlaceholder = selectedItem ? selectedItem.product : "Please select an item.";
  const quantityPlaceholder = selectedItem ? selectedItem.quantity : "Please select an item.";

  const handleSubmit = async () => {
    if (!selectedItem){
      setErrorMessage("Please select an item.");
    } else if (!confirmed) {
      setErrorMessage("Are you sure you want to delete?");
      setConfirmed(prev => !prev);
    } else {
      setErrorMessage(false);
      setConfirmed(prev => !prev);
      const { error } = await supabase
        .from("initial_shopping_list")
        .delete()
        .eq("product", selectedItem.product)
        
      if (error) {
        setErrorMessage(`Error: ${error}`);
      } else {
        setShoppingList((prev) =>
          prev.filter((obj) => obj.product !== selectedItem.product)
        );
      
        setErrorMessage(false);
        setSelectedItem(false);
      }
    };
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
      <Text style={styles.header}>Delete an item</Text>
      <Text style={styles.subHeaders}>Product:</Text>
      <Text style={styles.item}>{productPlaceholder}</Text>
      <Text style={styles.subHeaders}>Quantity:</Text>
      <Text style={styles.item}>{quantityPlaceholder}</Text>
      {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
      <Pressable style={styles.submit} onPress={handleSubmit}>
        <Text style={styles.submitText}>Delete</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    width: "95%",
    height: 270,
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
    marginBottom: 15,
  },
  subHeaders: {
    fontSize: 19,
    fontFamily: Platform.select({
      ios: "Cochin",
      default: "serif",
    }),
    color: "#FF8833",
    fontWeight: "700",
    alignSelf: "flex-start",
    paddingLeft: 20,
  },
  item: {
    fontSize: 20,
    fontFamily: Platform.select({
      ios: "Cochin",
      default: "serif",
    }),
    color: "#FF8833",
    fontWeight: "700",
    alignSelf: "center",
    marginBottom: 10
  },
  submit: {
    borderRadius: 10,
    backgroundColor: "#FF8833",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 10,
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
    fontSize: 20,
    fontFamily: Platform.select({
      ios: "Cochin",
      default: "serif",
    }),
    fontWeight: "700",
  },
});
