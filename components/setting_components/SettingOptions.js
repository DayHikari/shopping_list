import { Pressable, Text, StyleSheet } from "react-native";

export default function SettingOptions ({ setSettingChoice }) {
  return (
    <>
      <Text style={styles.header}>Settings</Text>
      <Pressable style={styles.button} onPress={() => setSettingChoice("password")}>
        <Text style={styles.text}>Change Password</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => setSettingChoice("logout")}>
        <Text style={styles.text}>Logout</Text>
      </Pressable>
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
  button: {
    marginVertical: 10,
  },
  text: {
    color: "#034222",
    fontSize: 20,
    fontWeight: "700",
    fontFamily: Platform.select({
      ios: "Cochin",
      default: "notoserif",
    }),
    marginVertical: 10,
    textAlign: "center",
  },
})