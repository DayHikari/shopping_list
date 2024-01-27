import { StyleSheet, View } from "react-native";
import List from "./list_section_components/List";
import ListOptions from "./list_section_components/ListOptions";
import AddForm from "./list_section_components/AddForm";
import { useState } from "react";

export default function ListSection () {
  const [optionSelected, setOptionSelected] = useState(false);
  const chooseOption = () => {
    switch (optionSelected) {
      case false:
        return;
      case "add":
        return <AddForm />;
      case "edit":
        return;
      case "delete":
        return;
    }
  } 
  return(
    <View style={styles.listSection}>
      <List />
      {chooseOption()}
      <View style={styles.separator}/>
      <ListOptions />
    </View>
  );
};

const styles = StyleSheet.create({
  listSection: {
    height: '72%',
    display: 'flex',
    alignItems: 'center',
  },
  separator: {
    marginVertical: 5,
    borderBottomColor: '#046835',
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: '85%'
  }
});