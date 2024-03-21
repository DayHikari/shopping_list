import { useRef, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import ListOptions from "./ShareListOptions";
import capitaliser from "../functions/capitaliser";
import { supabase } from "../../supabase";
import baseStyles from "../../global_styles/baseStyle";

export default function DeleteList({
  listNames,
  setOptionSelected,
  email,
  setListNames,
}) {
  const [selectedList, setSelectedList] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const menuRef = useRef(null);

  if (typeof window !== undefined) {
    window.addEventListener("click", (e) => {
      if (e.target !== menuRef.current) {
        setOptionSelected(false)
      };
    });
  };

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
    <View style={baseStyles.form} ref={menuRef}>
      <Pressable
        style={styles.close}
        onPress={() => {
          setOptionSelected(false);
        }}
      >
        <Text style={styles.closeText}>X</Text>
      </Pressable>
      <Text style={baseStyles.formHeader}>
        {!selectedList ? "Choose a list to delete:" : "Delete the list."}
      </Text>
      {!selectedList ? (
        <ListOptions listNames={listNames} setSelectedList={setSelectedList} />
      ) : (
        <Text style={baseStyles.formConfirmation}>
          Are you sure you wish to delete {capitaliser(selectedList)}?
        </Text>
      )}
      {selectedList && (
        <Pressable style={baseStyles.formButtons} onPress={() => handleSubmit()}>
          <Text style={baseStyles.formButtonText}>Confirm</Text>
        </Pressable>
      )}
      {errorMessage && <Text style={baseStyles.error}>{errorMessage}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
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
});
