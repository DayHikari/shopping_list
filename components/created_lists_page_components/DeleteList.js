import { useState } from "react";
import { Pressable, StyleSheet, Text, View, Platform } from "react-native";
import ListOptions from "./ListOptions";
import capitaliser from "../functions/capitaliser";
import { supabase } from "../../supabase";

export default function DeleteList({
  listNames,
  setOptionSelected,
  email,
  setListNames,
}) {
  const [selectedList, setSelectedList] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async () => {
    const tableName =
      selectedList.created_by === email ? "lists" : "user_lists";
    const columnName =
      selectedList.created_by === email ? "created_by" : "email";

    const { error } = await supabase
      .from(tableName)
      .delete()
      .eq("list_id", selectedList.list_id)
      .eq(columnName, email);
    
    if (error) {
      setErrorMessage("Error occurred when deleting, please try again later");
      setSelectedList(null);
    } else {
      setListNames(prev => prev.filter(obj => obj.list_id !== selectedList.list_id));
      setSelectedList(null)
      setOptionSelected(false)
    }
  };

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
      <Text style={styles.header}>
        {!selectedList ? "Choose a list to delete:" : "Delete the list."}
      </Text>
      {!selectedList ? (
        <ListOptions listNames={listNames} setSelectedList={setSelectedList} />
      ) : (
        <Text style={styles.confirmation}>
          Are you sure you wish to delete {capitaliser(selectedList)}?
        </Text>
      )}
      {selectedList && (
        <Pressable style={styles.confirm} onPress={() => handleSubmit()}>
          <Text style={styles.confirmText}>Confirm</Text>
        </Pressable>
      )}
      {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    width: "95%",
    // height: "40%",
    maxHeight: 300,
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
  },
  confirmation: {
    color: "red",
    fontSize: 20,
    fontFamily: Platform.select({
      ios: "Cochin",
      default: "serif",
    }),
    textAlign: "center",
  },
  confirm: {
    borderRadius: 10,
    backgroundColor: "#FF8833",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    margin: 10,
  },
  confirmText: {
    fontSize: 18,
    fontFamily: Platform.select({
      ios: "Cochin",
      default: "serif",
    }),
    color: "#046835",
    fontWeight: "700",
  },
  error: {
    color: "red",
    fontSize: 16,
    fontFamily: Platform.select({
      ios: "Cochin",
      default: "serif",
    }),
    fontWeight: "700",
  },
});
