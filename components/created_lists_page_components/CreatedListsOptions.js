import { Pressable, StyleSheet, Text, View, Platform } from "react-native";

export default function CreatedListsOptions() {
  return (
    <View style={styles.listOptions}>
      <Pressable
        style={styles.button}
        onPress={() => {}}
      >
        <Text style={styles.buttonText}>Add</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => {}}
      >
        <Text style={styles.buttonText}>Edit</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => {}}
      >
        <Text style={styles.buttonText}>Delete</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  listOptions: {
    height: "12%",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  buttonText: {
    fontFamily: Platform.select({
      ios: "Cochin",
      default: "serif",
    }),
    fontSize: 23,
  },
  button: {
    padding: 5,
    width: "27%",
    display:"flex",
    alignItems: "center",
    justifyContent: "center",
  },
});