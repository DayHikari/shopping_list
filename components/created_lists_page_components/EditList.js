import { useState } from "react";
import { Pressable, StyleSheet, Text, View, Platform } from "react-native";
import ListOptions from "./ShareListOptions";
import EditListForm from "./EditListForm";

export default function EditList({listNames, setOptionSelected, email, setListNames}) {
  const [selectedList, setSelectedList] = useState(null);

  return (
    <View style={styles.form}>
      <Pressable
        style={styles.close}
        onPress={() => {
          setOptionSelected(false);
        }}
      >
        <Text style={styles.closeText}>X</Text>
      </Pressable>
      <Text style={styles.header}>{!selectedList ? "Choose a list to edit:" : "Edit the list."}</Text>
      {!selectedList 
      ? <ListOptions listNames={listNames} setSelectedList={setSelectedList}/>
      : <EditListForm selectedList={selectedList} email={email} setSelectedList={setSelectedList} setListNames={setListNames} />}
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    width: "95%",
    // height: "40%",
    backgroundColor: "#046835",
    display: "flex",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
  },  
  close: {
    position: "absolute",
    top: "2%",
    right: "5%",
  },
  closeText: {
    fontSize: 17,
    color: "#FF8833",
    fontWeight: "700",
  },
  header: {
    fontSize: 25,
    fontFamily: Platform.select({
      ios: "Cochin",
      default: "serif",
    }),
    color: "#FF8833",
    marginBottom: 10,
  }
});
