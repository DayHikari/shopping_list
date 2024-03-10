import { useState } from "react";
import { StyleSheet, Text, TextInput, Platform, Pressable } from "react-native";
import { supabase } from "../supabase";

export default function UserInfoForm({ email, setDisplayedPage }) {
  const [usersName, setUsersName] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async () => {
    if (usersName === "") {
      return setErrorMessage("Please enter your full name.");
    }

    const capitalisedName = usersName
      .split(" ")
      .map((elem) =>
        elem
          .split("")
          .map((e, i) => (i === 0 ? e.toUpperCase() : e))
          .join("")
      )
      .join(" ");

    const { data, error } = await supabase
      .from("users")
      .insert([{ email: email, name: capitalisedName }])
      .select();
    
      console.log("error: ", error)
      console.log("data: ", data)

    if (error) {
      return setErrorMessage(`${error}. Please try again later.`);
    };

    setUsersName("");
    setErrorMessage(null);
    setDisplayedPage("shareRequest");
  };

  return (
    <>
      <Text style={styles.header}>Welcome!</Text>
      <Text style={styles.subHeader}>Please enter your details below.</Text>
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
      <Pressable style={styles.buttons} onPress={() => handleSubmit()}>
        <Text style={styles.buttonText}>Submit</Text>
      </Pressable>
      {errorMessage && (<Text style={styles.error}>{errorMessage}</Text>)}
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
    marginVertical: 15,
  },
  subHeader: {
    color: "#034222",
    fontSize: Platform.select({
      ios: 30,
      android: 21,
      default: 33,
    }),
    fontWeight: "700",
    fontFamily: Platform.select({
      ios: "Avenir-Heavy",
      default: "serif",
    }),
    textAlign: "center",
    marginVertical: 10,
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
    fontSize: 17,
    fontWeight: "700",
  },
  error: {
    color: "red",
    fontSize: Platform.select({
      ios: 27,
      android: 20,
      default: 25,
    }),
    fontFamily: Platform.select({
      ios: "Avenir-Heavy",
      default: "notoserif",
    }),
    fontWeight: "700",
    textAlign: "center",
  },
});
