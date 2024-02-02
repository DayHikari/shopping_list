import { View, StyleSheet } from "react-native-web";
import CreatedLists from "./created_lists_page_components/CreatedLists";
import CreatedListsOptions from "./created_lists_page_components/CreatedListsOptions";
import { useEffect, useState } from "react";
import { supabase } from "../supabase";

export default function CreatedListsPage({ id, setSelectedList }) {
  const [listNames, setListNames] = useState(null);

  useEffect(() => {
    const fetchNames = async () => {
      const { data, error } = await supabase
        .from("list_names")
        .select("list_names");

      if(error) {
        console.error("Error occured: ", error.message);
        return;
      };

      if (data) {
        setListNames(data);
      };
    };

    fetchNames();
  }, []);

  return (
    <View style={styles.listContainer}>
      <CreatedLists />
      <View style={styles.separator} />
      <CreatedListsOptions />
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
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
