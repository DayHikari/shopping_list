import { Pressable, StyleSheet, Text, View, Platform } from "react-native";
import baseStyles from "../../global_styles/baseStyle";
import { useRef } from "react";

export default function CreatedListsOptions({ setOptionSelected }) {
  const menuRef = useRef(null);

  if (typeof window !== undefined) {
    window.addEventListener("click", (e) => {
      if (e.target !== menuRef.current) {
        setOptionSelected(false)
      };
    });
  };

  return (
    <View style={styles.listOptions}ref={menuRef}>
      <Text style={baseStyles.formHeader}>Choose an option</Text>
      <View style={baseStyles.formButtonsSection}>
        <Pressable
          style={baseStyles.formButtons}
          onPress={() => {
            setOptionSelected("add");
          }}
        >
          <Text style={baseStyles.formButtonText}>Add list</Text>
        </Pressable>
        <Pressable
          style={baseStyles.formButtons}
          onPress={() => {
            setOptionSelected("edit");
          }}
        >
          <Text style={baseStyles.formButtonText}>Edit list</Text>
        </Pressable>
        <Pressable
          style={baseStyles.formButtons}
          onPress={() => {
            setOptionSelected("delete");
          }}
        >
          <Text style={baseStyles.formButtonText}>Delete list</Text>
        </Pressable>
        <Pressable
          style={baseStyles.formButtons}
          onPress={() => {
            setOptionSelected("share");
          }}
        >
          <Text style={baseStyles.formButtonText}>Share list</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  listOptions: {
    width: "100%",
    maxHeight: 300,
    backgroundColor: "#034222",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingHorizontal: 5,
    paddingVertical: 15,
    borderRadius: 10,
  },
});
