import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  Platform,
  View,
  Pressable,
} from "react-native";
import { supabase } from "../../supabase";

export default function ChangePassword({ setSettingChoice, setUser }) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [confirmation, setConfirmation] = useState(null);

  const handleSubmit = async () => {
    setErrorMessage(null);

    if (newPassword === "") {
      return setErrorMessage("Passwords enter a new password.")
    } else if (confirmPassword === "") {
      return setErrorMessage("Please confirm your new password.")
    } else if (newPassword !== confirmPassword) {
      return setErrorMessage("Passwords do not match.")
    };

    const {data, error} = await supabase.auth.updateUser({
      password: newPassword
    });

    if (error) {
      return setErrorMessage(`${error}`)
    };
    
    setUser(prev => {
      const newUserData = {...prev};
      newUserData.user = data;
      return newUserData;
    });

    setNewPassword("");
    setConfirmPassword("");
    setConfirmation("Password successfully updated.");
  };

  return (
    <>
      <Text style={styles.header}>Change Password</Text>
      <Text style={styles.subHeaders}>New password</Text>
      <TextInput
        style={styles.textInputs}
        placeholder="Enter new password"
        secureTextEntry={true}
        onChangeText={(text) => {
          setNewPassword(text);
        }}
        value={newPassword}
      />
      <Text style={styles.subHeaders}>Confirm password</Text>
      <TextInput
        style={styles.textInputs}
        placeholder="Confirm new password"
        secureTextEntry={true}
        onChangeText={(text) => {
          setConfirmPassword(text);
        }}
        value={confirmPassword}
      />
      {errorMessage && (<Text style={styles.error}>{errorMessage}</Text>)}
      {confirmation && (<Text style={styles.confirmation}>{confirmation}</Text>)}
      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.button}
          onPress={() => {
            setSettingChoice("options");
          }}
        >
          <Text style={styles.buttonText}>Cancel</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => {handleSubmit()}}>
          <Text style={styles.buttonText}>Submit</Text>
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    color: "#034222",
    fontSize: 28,
    fontWeight: "700",
    fontFamily: Platform.select({
      ios: "Avenir-Heavy",
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
      ios: "Avenir-Heavy",
      default: "notoserif",
    }),
    paddingVertical: 5,
  },
  textInputs: {
    height: 40,
    width: "80%",
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "#B3BFB8",
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginBottom: 15,
    fontFamily: Platform.select({
      ios: "Avenir-Heavy",
      default: "notoserif",
    }),
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
      ios: "Avenir-Heavy",
      default: "notoserif",
    }),
    color: "#034222",
    fontWeight: "700",
  },
  error: {
    color: "red",
    fontSize: 16,
    fontFamily: Platform.select({
      ios: "Avenir-Heavy",
      default: "notoserif",
    }),
    fontWeight: "700",
    marginBottom: 5,
  },
  confirmation: {
    color: "#034222",
    fontSize: 16,
    fontFamily: Platform.select({
      ios: "Avenir-Heavy",
      default: "notoserif",
    }),
    fontWeight: "700",
    marginBottom: 5,
  },
});
