import { useState } from "react";
import { StyleSheet, Text, TextInput, Platform, Pressable } from "react-native";

export default function UserInfoForm() {
  const [usersName, setUsersName] = useState("");

  return (
    <>
      <Text style={styles.header}>Welcome!</Text>
      <Text style={styles.subHeader}>
        Please enter your personal details below.
      </Text>
      <Text style={styles.labels}>Full name</Text>
      <TextInput
        style={styles.textInputs}
        placeholder="Enter your full name"
        autoComplete="name"
        onChangeText={(text) => {
          setUsersName(text);
        }}
        value={usersName}
      />
      <Pressable style={styles.buttons} onPress={() => {}}>
        <Text style={styles.buttonText}>Submit</Text>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    color: "#034222",
    fontSize: Platform.select({
      ios: 35,
      android: 26,
      default: 37,
    }),
    fontWeight: "700",
    fontFamily: Platform.select({
      ios: "Avenir-Heavy",
      default: "serif",
    }),
    textAlign: "center",
  },
  subHeader: {
    color: "#034222",
    fontSize: Platform.select({
      ios: 32,
      android: 23,
      default: 35,
    }),
    fontWeight: "700",
    fontFamily: Platform.select({
      ios: "Avenir-Heavy",
      default: "serif",
    }),
    textAlign: "center",
  },
  labels: {
    fontSize: Platform.select({
      ios: 28,
      android: 21,
      default: 30,
    }),
    color: "#034222",
    fontWeight: "700",
    margin: 5,
    fontFamily: Platform.select({
      ios: "Avenir-Heavy",
      default: "notoserif",
    }),
  },
  textInputs: {
    height: 40,
    width: "70%",
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "#B3BFB8",
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginBottom: 20,
    fontFamily: Platform.select({
      ios: "Avenir-Heavy",
      default: "notoserif",
    }),
    fontSize: Platform.select({
      ios: 25,
      android: 16,
      default: 21,
    }),
  },
  buttonSection: {
    width: "85%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    margin: 10,
  },
  buttons: {
    backgroundColor: "#034222",
    width: "40%",
    display: "flex",
    alignItems: "center",
    margin: 5,
    padding: 10,
    borderRadius: 15,
  },
  buttonText: {
    fontFamily: Platform.select({
      ios: "Avenir-Heavy",
      default: "serif",
    }),
    color: "#F0F7F4",
    fontSize: 15,
    fontWeight: "700",
  },
});
