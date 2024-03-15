import { useState } from "react";
import { Pressable, StyleSheet, Text, View, Platform } from "react-native";
import { supabase } from "../../supabase";
import baseStyles from "../../global_styles/baseStyle";


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
    <View style={baseStyles.form}>
      <Pressable
        style={styles.close}
        onPress={() => {
          setOptionSelected(false);
        }}
      >
        <Text style={styles.closeText}>X</Text>
      </Pressable>
      <Text style={baseStyles.formHeader}>Delete an item</Text>
      <Text style={baseStyles.formlLabels}>Product:</Text>
      <Text style={styles.item}>{productPlaceholder}</Text>
      <Text style={baseStyles.formlLabels}>Quantity:</Text>
      <Text style={styles.item}>{quantityPlaceholder}</Text>
      {errorMessage && <Text style={baseStyles.error}>{errorMessage}</Text>}
      <View style={baseStyles.formButtonsSection}>
        <Pressable style={baseStyles.formButtons} onPress={handleDeleteChecked}>
          <Text style={baseStyles.formButtonText}>Delete checked</Text>
        </Pressable>
        <Pressable style={baseStyles.formButtons} onPress={handleDeleteItem}>
          <Text style={baseStyles.formButtonText}>Delete Item</Text>
        </Pressable>
      </View>
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
  item: {
    fontSize: 20,
    fontFamily: Platform.select({
      ios: "Avenir-Heavy",
      default: "notoserif",
    }),
    color: "#B3BFB8",
    fontWeight: "700",
    alignSelf: "center",
    marginBottom: 10,
  },
});
