// import { View, StyleSheet } from "react-native-web";
import CreatedListsSection from "./created_lists_page_components/CreatedListsSection";
import CreatedListsOptions from "./created_lists_page_components/CreatedListsOptions";
import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import { View, StyleSheet, Text, Platform } from "react-native";
import AddList from "./created_lists_page_components/AddList";
import MenuButton from "./shared/MenuButton";
import EditList from "./created_lists_page_components/EditList";
import DeleteList from "./created_lists_page_components/DeleteList";
import ShareList from "./created_lists_page_components/ShareList";

export default function CreatedListsPage({ email, handleListSelect }) {
  const [listNames, setListNames] = useState(null);
  const [optionSelected, setOptionSelected] = useState(false);
  console.log(listNames)

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
      <Text style={styles.header}>Your lists</Text>
      {listNames && <CreatedListsSection
        listNames={listNames}
        handleListSelect={handleListSelect}
      />}
      {chooseOption()}
      <View style={styles.separator} />
      <MenuButton setOptionSelected={setOptionSelected} />
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 27,
    color: "#034222",
    fontWeight: "700",
    fontFamily: Platform.select({
      ios: "Avenir-Heavy",
      android: "notoserif",
    }),
    textDecorationLine: "underline"
  },
  separator: {
    marginVertical: 5,
    borderBottomColor: "#046835",
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: "85%",
  },
});
