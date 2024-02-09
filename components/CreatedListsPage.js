// import { View, StyleSheet } from "react-native-web";
import CreatedListsSection from "./created_lists_page_components/CreatedListsSection";
import CreatedListsOptions from "./created_lists_page_components/CreatedListsOptions";
import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import { Text, View, StyleSheet } from "react-native";

export default function CreatedListsPage({ email, handleListSelect }) {
  const [listNames, setListNames] = useState(null);

  useEffect(() => {
    const fetchNames = async () => {
      const { data, error } = await supabase
        .from("list_names")
        .select("lists");

      if(error) {
        console.error("Error occured: ", error.message);
        return;
      };
      
      if (data) {
        setListNames(data[0].lists);
      };
    };

    fetchNames();
  }, []);

  return (
    <View style={styles.listContainer}>
      <CreatedListsSection listNames={listNames} handleListSelect={handleListSelect}/>
      <View style={styles.separator} />
      <CreatedListsOptions />
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
