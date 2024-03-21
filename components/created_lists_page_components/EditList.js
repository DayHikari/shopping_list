import { useRef, useState } from "react";
import { Pressable, StyleSheet, Text, View, Platform } from "react-native";
import ListOptions from "./ShareListOptions";
import EditListForm from "./EditListForm";
import baseStyles from "../../global_styles/baseStyle";

export default function EditList({listNames, setOptionSelected, email, setListNames}) {
  const [selectedList, setSelectedList] = useState(null);
  const menuRef = useRef(null);

  if (typeof window !== undefined) {
    window.addEventListener("click", (e) => {
      if (e.target !== menuRef.current) {
        setOptionSelected(false)
      };
    });
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
      <Text style={baseStyles.formHeader}>{!selectedList ? "Choose a list to edit:" : "Edit the list."}</Text>
      {!selectedList 
      ? <ListOptions listNames={listNames} setSelectedList={setSelectedList}/>
      : <EditListForm selectedList={selectedList} email={email} setSelectedList={setSelectedList} setListNames={setListNames} />}
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
