import { Pressable, StyleSheet, Text, View } from "react-native";

export default function ListOptions({ setOptionSelected }) {
  return (
    <View style={styles.listOptions}>
      <Pressable onPress={() => {setOptionSelected("add")}}>
        <Text style={styles.buttonOptions}>Add</Text>
      </Pressable>
      <Text style={styles.buttonOptions}>Edit</Text>
      <Text style={styles.buttonOptions}>Delete</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  listOptions: {
    // backgroundColor: 'red',
    height: "12%",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  buttonOptions: {
    fontFamily: Platform.select({
      ios: "Cochin",
      default: "serif",
    }),
    fontSize: 25,
  },
});
