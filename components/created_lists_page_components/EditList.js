import { useState } from "react";
import { Pressable, StyleSheet, Text, View, Platform } from "react-native";
import ListOptions from "./ShareListOptions";
import EditListForm from "./EditListForm";
import baseStyles from "../../global_styles/baseStyle";

export default function EditList({listNames, setOptionSelected, email, setListNames}) {
  const [selectedList, setSelectedList] = useState(null);


  return (
    <View style={baseStyles.form}>
      <Text style={baseStyles.formHeader}>{!selectedList ? "Choose a list to edit:" : "Edit the list."}</Text>
      {!selectedList 
      ? <ListOptions listNames={listNames} setSelectedList={setSelectedList}/>
      : <EditListForm selectedList={selectedList} email={email} setSelectedList={setSelectedList} setListNames={setListNames} />}
    </View>
  );
};