// import { View, StyleSheet } from "react-native-web";
import CreatedListsSection from "./created_lists_page_components/CreatedListsSection";
import CreatedListsOptions from "./created_lists_page_components/CreatedListsOptions";
import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import { Text, View, StyleSheet } from "react-native";

export default function CreatedListsPage({ email, setSelectedList }) {
  const [listNames, setListNames] = useState(null);

  useEffect(() => {
    const fetchNames = async () => {
      const { data, error } = await supabase
        .from("shopping_list")
        .select("list_name")
        .contains("email", [email]);

      if(error) {
        console.error("Error occured: ", error.message);
        return;
      };
      
      if (data) {
        const uniqueArray = [];
        data.map(obj => {
          if (!uniqueArray.includes(obj.list_name)){
            uniqueArray.push(obj.list_name);
          };
        });
        setListNames(uniqueArray);
      };
    };

    fetchNames();
  }, []);

  return (
    <View style={styles.listContainer}>
      <CreatedListsSection listNames={listNames}/>
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
