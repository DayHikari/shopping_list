import { View, Text, TextInput, Pressable, StyleSheet, Platform } from "react-native";

export default function LoginForm ({email, setEmail, password, setPassword, handleLogin, handleSignUpPage}) {
  return (
    <View style={styles.loginContainer}>
        <Text style={styles.labels}>Email</Text>
        <TextInput
          style={styles.textInputs}
          placeholder="Enter email address"
          autoComplete="email"
          inputMode="email"
          onChangeText={(text) => {
            setEmail(text);
          }}
          value={email}
        />
        <Text style={styles.labels}>Password</Text>
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
        <View style={styles.buttonSection}>
          <Pressable style={styles.buttons} onPress={() => handleSignUpPage()}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </Pressable>
          <Pressable style={styles.buttons} onPress={() => handleLogin()}>
            <Text style={styles.buttonText}>Login</Text>
          </Pressable>
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  loginContainer: {
    display: "flex",
    alignItems: "center",
    width: "100%",
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