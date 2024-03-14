import { View, Text } from "react-native";
import List from "./list_section_components/List";
import ListOptions from "./list_section_components/ListOptions";
import AddForm from "./list_section_components/AddForm";
import { useState, useEffect } from "react";
import { supabase } from "../supabase";
import EditForm from "./list_section_components/EditForm";
import DeleteForm from "./list_section_components/DeleteForm";
import MenuButton from "./shared/MenuButton";
import Favourites from "./list_section_components/Favourites";
import capitaliser from "./functions/capitaliser";
import baseStyles from "../global_styles/baseStyle";

export default function ListSection({ email, selectedList }) {
  const [optionSelected, setOptionSelected] = useState(false);
  const [shoppingList, setShoppingList] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchList = async () => {
      const { data, error } = await supabase
        .from("items")
        .select("*")
        .eq("list_id", selectedList.list_id);

      if (error) {
        console.error("Error occured: ", error.message);
        setErrorMessage(error);
        return;
      }

      if (data) {
        setShoppingList(data);
        setErrorMessage(null);
      }
    };

    fetchList();
  }, []);

  const chooseOption = () => {
    switch (optionSelected) {
      case false:
        return;
      case true:
        return <ListOptions setOptionSelected={setOptionSelected} />;
      case "add":
        return (
          <AddForm
            setOptionSelected={setOptionSelected}
            setShoppingList={setShoppingList}
            selectedList={selectedList}
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
            selectedList={selectedList}
          />
        );
      case "favourites":
        return (
          <Favourites
            email={email}
            shoppingList={shoppingList}
            setShoppingList={setShoppingList}
            selectedList={selectedList}
          />
        );
    }
  };

  return (
    <>
      {errorMessage ? (
        <Text style={baseStyles.error}>{`Error occurred: ${errorMessage}. Please try again later.`}</Text>
      ) : (
        <>
          <Text style={baseStyles.pageHeader}>{capitaliser(selectedList)}</Text>
          <List
            shoppingList={shoppingList}
            setSelectedItem={setSelectedItem}
            setShoppingList={setShoppingList}
          />
          {chooseOption()}
          <View style={baseStyles.separator} />
          <MenuButton setOptionSelected={setOptionSelected} />
        </>
      )}
    </>
  );
};
