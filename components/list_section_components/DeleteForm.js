import { useState } from "react";
import { Pressable, StyleSheet, Text, View, Platform } from "react-native";
import { supabase } from "../../supabase";


export default function DeleteForm({
  setOptionSelected,
  setShoppingList,
  selectedItem,
  setSelectedItem,
  selectedList
}) {
  const [confirmed, setConfirmed] = useState(false);
  const [checkedConfirmed, setCheckedConfirmed] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const productPlaceholder = selectedItem
    ? selectedItem.product
    : "Please select an item.";
  const quantityPlaceholder = selectedItem
    ? selectedItem.quantity
    : "Please select an item.";

  const handleDeleteItem = async () => {
    setCheckedConfirmed(false);

    if (!selectedItem) {
      setErrorMessage("Please select an item.");
    } else if (!confirmed) {
      setErrorMessage("Are you sure you want to delete?");
      setConfirmed((prev) => !prev);
    } else {
      setConfirmed((prev) => !prev);

      const { error } = await supabase
        .from("items")
        .delete()
        .eq("product", selectedItem.product)
        .eq("list_id", selectedList.list_id);

      if (error) {
        setErrorMessage(`Error: ${error}`);
      } else {
        setShoppingList((prev) =>
          prev.filter((obj) => obj.product !== selectedItem.product)
        );

        setErrorMessage(false);
        setSelectedItem(false);
        setOptionSelected(false);
      }
    }
  };

  const handleDeleteChecked = async () => {
    setConfirmed(false);

    if (!checkedConfirmed) {
      setErrorMessage("Delete all checked items?");
      setCheckedConfirmed((prev) => !prev);
    } else {
      setCheckedConfirmed((prev) => !prev);

      const { error } = await supabase
        .from("items")
        .delete()
        .eq("checked", true)
        .eq("list_id", selectedList.list_id);
        
      if (error) {
        setErrorMessage(`Error: ${error}`);
      } else {
        setShoppingList((prev) => prev.filter((obj) => obj.checked === false));

        setErrorMessage(false);
        setSelectedItem(false);
        setOptionSelected(false);
      }
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
      <Text style={styles.header}>Delete an item</Text>
      <Text style={styles.subHeaders}>Product:</Text>
      <Text style={styles.item}>{productPlaceholder}</Text>
      <Text style={styles.subHeaders}>Quantity:</Text>
      <Text style={styles.item}>{quantityPlaceholder}</Text>
      {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
      <View style={styles.submitSection}>
        <Pressable style={styles.submit} onPress={handleDeleteChecked}>
          <Text style={styles.submitText}>Delete checked</Text>
        </Pressable>
        <Pressable style={styles.submit} onPress={handleDeleteItem}>
          <Text style={styles.submitText}>Delete Item</Text>
        </Pressable>
      </View>
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
  item: {
    fontSize: 20,
    fontFamily: Platform.select({
      ios: "Cochin",
      default: "notoserif",
    }),
    color: "#B3BFB8",
    fontWeight: "700",
    alignSelf: "center",
    marginBottom: 10,
  },
  submitSection: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  submit: {
    borderRadius: 10,
    backgroundColor: "#FF8833",
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 10,
  },
  submitText: {
    fontSize: 18,
    fontFamily: Platform.select({
      ios: "Cochin",
      default: "notoserif",
    }),
    color: "#034222",
    fontWeight: "700",
  },
  error: {
    color: "red",
    fontSize: 20,
    fontFamily: Platform.select({
      ios: "Cochin",
      default: "notoserif",
    }),
    fontWeight: "700",
  },
});
