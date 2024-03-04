import { View, StyleSheet, Text, Platform } from "react-native";

export default function Settings () {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Settings</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "70%",
    display: "flex",
    alignItems: "center",
  },
  header: {
    color: "#034222",
    fontSize: 25,
    fontWeight: "700",
    fontFamily: Platform.select({
      ios: "Cochin",
      default: "notoserif",
    }),
    marginVertical: 10,
    textAlign: "center",
  },
});