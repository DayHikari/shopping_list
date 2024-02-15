import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import capitaliser from "../functions/capitaliser";

export default function EditListForm({ selectedList, email, setSelectedList }) {
  const [newName, setNewName] = useState("");
  return (
    <View style={styles.form}>
      <Text style={styles.subheaders}>Change name:</Text>
      <TextInput
        style={styles.textInputs}
        placeholder={capitaliser(selectedList)}
        onChangeText={(text) => {
          setNewName(text);
        }}
        value={newName}
      />
      {selectedList.created_by === email && console.log("match")}
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    width: "95%",
    backgroundColor: "#046835",
    display: "flex",
    alignItems: "center",
    padding: 5,
    borderRadius: 10,
  },
  subheaders: {
    fontSize: 20,    
    fontFamily: Platform.select({
      ios: "Cochin",
      default: "serif",
    }),
    color: "#FF8833",
    alignSelf: "flex-start",
    marginLeft: "5%",
  },
  textInputs: {
    backgroundColor: "#CDEEFD",
    width: "90%",
    height: 40,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#FF8833",
    padding: 10,
    marginBottom: 10,
    marginTop: 2,
    fontSize: 15,
    color: "#046835",
    fontFamily: Platform.select({
      ios: "Cochin",
      default: "serif",
    }),
    fontWeight: "700",
  },
})
