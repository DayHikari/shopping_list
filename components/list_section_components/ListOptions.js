import { Pressable, StyleSheet, Text, View } from "react-native";

export default function ListOptions({ setOptionSelected }) {
  return (
    <View style={styles.listOptions}>
      <Pressable
        style={styles.button}
        onPress={() => {
          setOptionSelected("add");
        }}
      >
        <Text style={styles.buttonOptions}>Add</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => {
          setOptionSelected("edit");
        }}
      >
        <Text style={styles.buttonOptions}>Edit</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => {
          setOptionSelected("delete");
        }}
      >
        <Text style={styles.buttonOptions}>Delete</Text>
      </Pressable>
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
  button: {
    padding: 5,
  },
});
