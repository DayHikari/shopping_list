import { Pressable, StyleSheet, Text, View, Platform } from "react-native";

export default function CreatedListsOptions({ setOptionSelected }) {
  return (
    <View style={styles.listOptions}>
      <Text style={styles.header}>Choose an option</Text>
      <View style={styles.container}>
        <Pressable
          style={styles.button}
          onPress={() => {
            setOptionSelected("add");
          }}
        >
          <Text style={styles.buttonText}>Add list</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => {
            setOptionSelected("edit");
          }}
        >
          <Text style={styles.buttonText}>Edit list</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => {
            setOptionSelected("delete");
          }}
        >
          <Text style={styles.buttonText}>Delete list</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => {
            setOptionSelected("share");
          }}
        >
          <Text style={styles.buttonText}>Share list</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  listOptions: {
    width: "95%",
    height: "40%",
    maxHeight: 300,
    backgroundColor: "#034222",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    padding: 10,
    borderRadius: 10,
  },
  header: {
    fontFamily: Platform.select({
      ios: "Cochin",
      default: "notoserif",
    }),
    color: "#F0F7F4",
    fontSize: 22,
  },
  container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: "40%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#B3BFB8",
    margin: 5,
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  buttonText: {
    fontFamily: Platform.select({
      ios: "Cochin",
      default: "notoserif",
    }),
    fontSize: 17,
    fontWeight: "700",
    color: "#034222",
    paddingHorizontal: 10,
    textAlign: "center",
  },
});
