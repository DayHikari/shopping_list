import { useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { supabase } from "../supabase";

export default function LoginPage({setUser, setLoggedIn}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [signUp, setSignUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false)


  const handleLogin = async () => {
    if (!email.trim()) {
      console.log("no email")
      setErrorMessage("Email cannot be empty")
    } else if (!password.trim()) {
      setErrorMessage("Password cannot be empty")
    } else if (password.length < 8) {
      setErrorMessage("Password must be 8 characters long")
    } else{
      let { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
      });

      if (error) {
        setErrorMessage(prev => `Error: ${error}`)
      } else {
        setUser(data);
        setLoggedIn(true);
        setEmail("");
        setPassword("");
        setPasswordCheck("");
        setErrorMessage(false);
      }
    }
  };

  const handleSignUp = async () => {
    if (!signUp) {
      setSignUp(true);
    } else {
      setSignUp(false)
    }
  };

  return (
    <View style={styles.loginPage}>
      <Image source={require("../assets/sun_120.png")} />
      <Text style={styles.header}>Login Page</Text>
      <Text style={styles.labels}>Email:</Text>
      <TextInput
        style={styles.textInputs}
        placeholder="Enter uemail address"
        autoComplete="email"
        inputMode="email"
        onChangeText={(text) => {
          setEmail(text);
        }}
        value={email}
      />
      <Text style={styles.labels}>Password:</Text>
      <TextInput
        style={styles.textInputs}
        placeholder="Enter password"
        autoComplete="current-password"
        secureTextEntry={true}
        onChangeText={(text) => {
          setPassword(text);
        }}
        value={password}
      />
      {signUp && <Text style={styles.labels}>Confirm Password:</Text>}
      {signUp && (
        <TextInput
          style={styles.textInputs}
          placeholder="Confirm password"
          autoComplete="new-password"
          secureTextEntry={true}
          onChangeText={(text) => {
            setPasswordCheck(text);
          }}
          value={passwordCheck}
        />
      )}
      {typeof(errorMessage) === "string" && <Text>{errorMessage}</Text>}
      <View style={styles.buttonSection}>
        <Pressable style={styles.buttons} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </Pressable>
        <Pressable style={styles.buttons} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loginPage: {
    height: "83%",
    display: "flex",
    alignItems: "center",
  },
  header: {
    fontSize: 30,
    color: "#FF8833",
    fontWeight: "700",
    margin: 15,
    fontFamily: Platform.select({
      ios: "Cochin",
      default: "serif",
    }),
  },
  labels: {
    fontSize: 25,
    color: "#FF8833",
    fontWeight: "700",
    margin: 5,
    fontFamily: Platform.select({
      ios: "Cochin",
      default: "serif",
    }),
  },
  textInputs: {
    height: 40,
    width: "70%",
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "#046835",
    borderRadius: 5,
    padding: 5,
    marginBottom: 20,
    fontFamily: Platform.select({
      ios: "Cochin",
      default: "serif",
    }),
  },
  buttonSection: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    margin: 10,
  },
  buttons: {
    backgroundColor: "#046835",
    width: "40%",
    display: "flex",
    alignItems: "center",
    margin: 5,
    padding: 10,
    borderRadius: 15,
  },
  buttonText: {
    fontFamily: Platform.select({
      ios: "Cochin",
      default: "serif",
    }),
    color: "#FF8833",
    fontSize: 15,
    fontWeight: "700",
  },
});
