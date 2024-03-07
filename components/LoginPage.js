import { useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Platform,
} from "react-native";
import { supabase } from "../supabase";
import LoginForm from "./login_components/LoginForm";
import SignUpForm from "./login_components/SignUpForm";

export default function LoginPage({ setUser, setLoggedIn, setDisplayedPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [earlyAccessCode, setEarlyAccessCode] = useState("");
  const [signUp, setSignUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleLogin = async () => {
    if (!email.trim()) {
      return setErrorMessage("Email cannot be empty");
    } else if (!password.trim()) {
      return setErrorMessage("Password cannot be empty");
    } else if (password.length < 8) {
      return setErrorMessage("Password must be 8 characters long");
    }

    let { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      return setErrorMessage(`${error}`);
    }
    setUser(data);
    setLoggedIn(true);
    setEmail("");
    setPassword("");
    setPasswordCheck("");
    setErrorMessage(null);
    setDisplayedPage("shareRequest");
  };

  const handleSignUpPage = () => {
    setSignUp((prev) => !prev);
  };

  const handleSignUp = async () => {
    if (!signUp) {
      setSignUp(true);
    } else {
      setSignUp(false);
    }
  };

  return (
    <View style={styles.loginPage}>
      <Image source={require("../assets/sun_120.png")} style={styles.image} />
      {!signUp ? (
        <LoginForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
          handleSignUpPage={handleSignUpPage}
        />
      ) : (
        <SignUpForm
          email={email}
          setEmail={setEmail}
          name={name}
          setName={setName}
          password={password}
          setPassword={setPassword}
          passwordCheck={passwordCheck}
          setPasswordCheck={setPasswordCheck}
          earlyAccessCode={earlyAccessCode}
          setEarlyAccessCode={setEarlyAccessCode}
          handleSignUp={handleSignUp}
          handleSignUpPage={handleSignUpPage}
        />
      )}
      {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  loginPage: {
    height: "79%",
    display: "flex",
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    marginVertical: Platform.select({
      ios: "3%",
      android: "2%",
      default: "7%"
    }),
  },
  error: {
    color: "red",
    fontSize: Platform.select({
      ios: 27,
      android: 20,
      default: 25
    }),
    fontFamily: Platform.select({
      ios: "Avenir-Heavy",
      default: "notoserif",
    }),
    fontWeight: "700",
    textAlign: "center",
  },
});
