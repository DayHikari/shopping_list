import { Pressable, StyleSheet, Text, View, Platform } from "react-native";

export default function ListOptions({ setOptionSelected }) {
  return (
    <View style={styles.listOptions}>
      <Text style={styles.header}>Choose an option:</Text>
      <View style={styles.container}>
        <Pressable
          style={styles.button}
          onPress={() => {
            setOptionSelected("add");
          }}
        >
          <Text style={styles.buttonText}>Add</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => {
            setOptionSelected("edit");
          }}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => {
            setOptionSelected("delete");
          }}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => {
            setOptionSelected("favourites")
          }}
        >
          <Text style={styles.buttonText}>Favourites</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  listOptions: {
    width: "95%",
    height: 210,
    backgroundColor: "#034222",
    display: "flex",
    alignItems: "center",
    padding: 5,
    borderRadius: 10,
  },
  header: {
    fontFamily: Platform.select({
      ios: "Cochin",
      default: "serif",
    }),
    color: "#FF8833",
    fontSize: 25,
  },
  container: {
    height: "90%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    padding: 5,
    width: "40%",
    height: "40%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#046835",
    margin: 5,
    borderRadius: 10,
  },
  buttonText: {
    fontFamily: Platform.select({
      ios: "Cochin",
      default: "serif",
    }),
    fontSize: 20,
    color: "#FF8833",
    paddingHorizontal: 10,
  },
});
