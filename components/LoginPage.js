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

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      return setErrorMessage(`${error}`);
    };

    setUser(data);
    setLoggedIn(true);
    setEmail("");
    setPassword("");
    setPasswordCheck("");
    setEarlyAccessCode("");
    setErrorMessage(null);
    setDisplayedPage("shareRequest");
  };

  const handleSignUpPage = () => {
    setErrorMessage(null);
    setSignUp((prev) => !prev);
  };

  const handleSignUp = async () => {
    setErrorMessage(null);

    if (!email.trim()) {
      return setErrorMessage("Email cannot be empty");
    } else if (!password.trim()) {
      return setErrorMessage("Password cannot be empty");
    } else if (password.length < 8) {
      return setErrorMessage("Password must be 8 characters long");
    } else if (password !== passwordCheck) {
      return setErrorMessage("Passwords do not match");
    } else if (earlyAccessCode === "") {
      return setErrorMessage("Please enter the early access code");
    }

    const { data, error } = await supabase
      .from("early_access")
      .select("pass")
      .eq("code", earlyAccessCode);

    if (error) {
      return setErrorMessage(`${error}`);
    } else if (data.length === 0) {
      return setErrorMessage("Incorrect access code");
    }

    const { signUpData, signUpError } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (signUpError) {
      return setErrorMessage(`${signUpError}`);
    };

    setEmail("");
    setPassword("");
    setPasswordCheck("");
    setEarlyAccessCode("");
    setErrorMessage("Sign up complete. Please check your emails and verify your email address.");    
    setSignUp((prev) => !prev);
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
      default: "7%",
    }),
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
