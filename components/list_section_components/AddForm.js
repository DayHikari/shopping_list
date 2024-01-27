import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function AddForm () {
  return (
    <View style={styles.form}>
      <Text style={styles.header}>Add an item</Text>
      <Text style={styles.subHeaders}>Product:</Text>
      <TextInput style={styles.textInputs} placeholder="Item name" />
      <Text style={styles.subHeaders}>Quantity:</Text>
      <TextInput style={styles.textInputs} placeholder="e.g.: 2 or 1 bag or 3 boxes" />
      <Pressable style={styles.submit}>
        <Text style={styles.submitText}>Submit</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    position: "absolute",
    width: "95%",
    height: 260,
    left: "auto",
    right: "auto",
    top: "3%",
    backgroundColor: "#046835",
    display: "flex",
    alignItems: "center",
    padding: 5,
    borderRadius: 10,
  },
  header: {
    fontSize: 30,
    fontFamily: Platform.select({
      ios: "Cochin",
      default: "serif"
    }),
    color: "#FF8833",
    fontWeight: "700",
  },
  subHeaders: {
    fontSize: 20,
    fontFamily: Platform.select({
      ios: "Cochin",
      default: "serif"
    }),
    color: "#FF8833",
    fontWeight: "700",
    alignSelf: "flex-start",
    paddingLeft: 20
  },
  textInputs: {
    backgroundColor: "#CDEEFD",
    width: "90%",
    height: 40,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#FF8833",
    padding: 5,
    marginBottom: 5,
    marginTop: 2,
    fontSize: 15,
    color: "#046835",
    fontFamily: Platform.select({
      ios: "Cochin",
      default: "serif"
    }),
    fontWeight: "700",
  },
  submit: {
    borderRadius: 10,
    backgroundColor: "#FF8833",
    padding: 10,
    margin: 5,
  },
  submitText: {
    fontSize: 20,
    fontFamily: Platform.select({
      ios: "Cochin",
      default: "serif"
    }),
    color: "#046835",
    fontWeight: "700",
  }
})