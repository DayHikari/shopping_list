import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function LoginPage() {
  return (
    <View style={styles.loginPage}>
      <Image source={require("../assets/sun_large.png")} />
      <Text style={styles.header}>Login Page</Text>
      <Text style={styles.labels}>Email:</Text>
      <TextInput style={styles.textInputs} placeholder="Enter email address" />
      <Text style={styles.labels}>Password:</Text>
      <TextInput style={styles.textInputs} placeholder="Enter password" />
      <View style={styles.buttonSection}>
        <Pressable style={styles.buttons}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </Pressable>
        <Pressable style={styles.buttons}>
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
    height: 35,
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
