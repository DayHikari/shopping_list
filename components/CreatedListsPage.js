// import { View, StyleSheet } from "react-native-web";
import CreatedListsSection from "./created_lists_page_components/CreatedListsSection";
import CreatedListsOptions from "./created_lists_page_components/CreatedListsOptions";
import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import { Text, View, StyleSheet } from "react-native";
import AddList from "./created_lists_page_components/AddList";

export default function CreatedListsPage({ email, handleListSelect }) {
  const [listNames, setListNames] = useState(null);
  const [optionSelected, setOptionSelected] = useState(false);

  useEffect(() => {
    const fetchNames = async () => {
      const { data, error } = await supabase.from("user_table").select(`
          lists( * )
        `);

      if (error) {
        console.error("Error occured: ", error.message);
        return;
      }

      if (data) {
        setListNames(data.map((elem) => elem.lists));
      }
    };

    fetchNames();
  }, []);

  const chooseOption = () => {
    switch (optionSelected) {
      case false:
        return;
      case "add":
        return (
          <AddList
            setListNames={setListNames}
            setOptionSelected={setOptionSelected}
            email={email}
          />
        );
    }
  };

  return (
    <View style={styles.listContainer}>
      <CreatedListsSection
        listNames={listNames}
        handleListSelect={handleListSelect}
      />
      {chooseOption()}
      <View style={styles.separator} />
      <CreatedListsOptions setOptionSelected={setOptionSelected} />
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    height: "74%",
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
