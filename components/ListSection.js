import { StyleSheet, View,  } from "react-native";
import List from "./list_section_components/List";
import ListOptions from "./list_section_components/ListOptions";
import AddForm from "./list_section_components/AddForm";
import { useState, useEffect } from "react";
import { supabase } from "../supabase";
import EditForm from "./list_section_components/EditForm";
import DeleteForm from "./list_section_components/DeleteForm";

export default function ListSection() {
  const [optionSelected, setOptionSelected] = useState(false);
  const [shoppingList, setShoppingList] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchList = async () => {
      const { data, error } = await supabase
        .from("shopping_list")
        .select("*");

      if (error) {
        console.error("Error occured: ", error.message);
        return;
      }

      if (data) {
        setShoppingList(data);
      }
    };

    fetchList();
  }, []);

  const chooseOption = () => {
    switch (optionSelected) {
      case false:
        return;
      case "add":
        return (
          <AddForm
            setOptionSelected={setOptionSelected}
            setShoppingList={setShoppingList}
          />
        );
      case "edit":
        return (
          <EditForm
            setOptionSelected={setOptionSelected}
            setShoppingList={setShoppingList}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
          />
        );
      case "delete":
        return (
          <DeleteForm
            setOptionSelected={setOptionSelected}
            setShoppingList={setShoppingList}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
          />
        );
    }
  };
  return (
    <View style={styles.listSection}>
      <List
        shoppingList={shoppingList}
        setSelectedItem={setSelectedItem}
        setShoppingList={setShoppingList}
      />
      {chooseOption()}
      <View style={styles.separator} />
      <ListOptions setOptionSelected={setOptionSelected} />
    </View>
  );
}

const styles = StyleSheet.create({
  listSection: {
    height: "72%",
    display: "flex",
    alignItems: "center",
  },
  separator: {
    marginVertical: 5,
    borderBottomColor: "#046835",
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: "85%",
  },
});
