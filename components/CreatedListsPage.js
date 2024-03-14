import CreatedListsSection from "./created_lists_page_components/CreatedListsSection";
import CreatedListsOptions from "./created_lists_page_components/CreatedListsOptions";
import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import { View, Text } from "react-native";
import AddList from "./created_lists_page_components/AddList";
import MenuButton from "./shared/MenuButton";
import EditList from "./created_lists_page_components/EditList";
import DeleteList from "./created_lists_page_components/DeleteList";
import ShareList from "./created_lists_page_components/ShareList";
import baseStyles from "../global_styles/baseStyle";

export default function CreatedListsPage({ email, handleListSelect }) {
  const [listNames, setListNames] = useState(null);
  const [optionSelected, setOptionSelected] = useState(false);

  useEffect(() => {
    if (!listNames) {
      const fetchNames = async () => {
        const { data, error } = await supabase
          .from("user_lists")
          .select("users( * ), lists( * )")
          .eq("email", email);

        if (error) {
          console.error("Error occured: ", error.message);
          return;
        }

        if (data) {
          setListNames(data.map((elem) => elem.lists));
        }
      };

      fetchNames();
    }
  }, []);

  const chooseOption = () => {
    switch (optionSelected) {
      case false:
        return;
      case true:
        return <CreatedListsOptions setOptionSelected={setOptionSelected} />;
      case "add":
        return (
          <AddList
            setListNames={setListNames}
            setOptionSelected={setOptionSelected}
            email={email}
          />
        );
      case "edit":
        return (
          <EditList
            listNames={listNames}
            setOptionSelected={setOptionSelected}
            email={email}
            setListNames={setListNames}
          />
        );
      case "delete":
        return (
          <DeleteList
            listNames={listNames}
            setOptionSelected={setOptionSelected}
            email={email}
            setListNames={setListNames}
          />
        );
      case "share":
        return (
          <ShareList
            listNames={listNames}
            setOptionSelected={setOptionSelected}
            email={email}
          />
        );
    }
  };

  return (
    <>
      <Text style={baseStyles.pageHeader}>Your lists</Text>
      {listNames && <CreatedListsSection
        listNames={listNames}
        handleListSelect={handleListSelect}
      />}
      {chooseOption()}
      <View style={baseStyles.separator} />
      <MenuButton setOptionSelected={setOptionSelected} />
    </>
  );
};
