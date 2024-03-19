import { Pressable, StyleSheet, Text, View, Platform } from "react-native";
import baseStyles from "../../global_styles/baseStyle";

export default function ListOptions({ setOptionSelected }) {
  return (
    <View style={styles.listOptions}>
      <Text style={baseStyles.formHeader}>Choose an option:</Text>
      <View style={styles.container}>
        <Pressable
          style={baseStyles.formButtons}
          onPress={() => {
            setOptionSelected("add");
          }}
        >
          <Text style={baseStyles.formButtonText}>Add</Text>
        </Pressable>
        <Pressable
          style={baseStyles.formButtons}
          onPress={() => {
            setOptionSelected("edit");
          }}
        >
          <Text style={baseStyles.formButtonText}>Edit</Text>
        </Pressable>
        <Pressable
          style={baseStyles.formButtons}
          onPress={() => {
            setOptionSelected("delete");
          }}
        >
          <Text style={baseStyles.formButtonText}>Delete</Text>
        </Pressable>
        <Pressable
          style={baseStyles.formButtons}
          onPress={() => {
            setOptionSelected("favourites")
          }}
        >
          <Text style={baseStyles.formButtonText}>Favourites</Text>
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
  container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
  },
});
