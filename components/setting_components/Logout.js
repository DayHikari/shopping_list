import { useState } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { supabase } from "../../supabase";

export default function Logout ({ setSettingChoice, handleLogOut }) {
  const [errorMessage, setErrorMessage] = useState(null);

  const handleConfirm = async () => {
    const {error} = await supabase.auth.signOut();

    if (error) {
      setErrorMessage("Error logging out. Please try again later");
    };

    handleLogOut();
  }
  return (
    <>
      <Text style={styles.header}>Logout</Text>
      <Text style={styles.subHeaders}>Are you sure you wish to logout?</Text>
      <View style={styles.buttonContainer}>
      {errorMessage && (<Text style={styles.error}>{errorMessage}</Text>)}
      <Pressable
          style={styles.button}
          onPress={() => {
            setSettingChoice("options");
          }}
        >
          <Text style={styles.buttonText}>Cancel</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => {handleConfirm()}}>
          <Text style={styles.buttonText}>Confirm</Text>
        </Pressable>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    color: "#034222",
    fontSize: 28,
    fontWeight: "700",
    fontFamily: Platform.select({
      ios: "Cochin",
      default: "notoserif",
    }),
    paddingVertical: 5,
    marginBottom: 15,
    textAlign: "center",
    textDecorationLine: "underline",
    textDecorationColor: "#034222",
  },
  form: {
    width: "90%",
  },
  subHeaders: {
    color: "#034222",
    fontSize: 20,
    fontWeight: "700",
    fontFamily: Platform.select({
      ios: "Cochin",
      default: "notoserif",
    }),
    paddingVertical: 5,
    marginBottom: 10,
  },
  buttonContainer: {
    width: "90%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  button: {
    borderRadius: 10,
    backgroundColor: "#FF8833",
    paddingHorizontal: 20,
    paddingVertical: 10,
    margin: 10,
  },
  buttonText: {
    fontSize: 17,
    fontFamily: Platform.select({
      ios: "Cochin",
      default: "notoserif",
    }),
    color: "#034222",
    fontWeight: "700",
  },
  error: {
    color: "red",
    fontSize: 16,
    fontFamily: Platform.select({
      ios: "Cochin",
      default: "notoserif",
    }),
    fontWeight: "700",
    marginBottom: 5,
  },
})