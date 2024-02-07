import { Alert, Platform, Pressable, StyleSheet, Text, View } from "react-native";

export default function () {
  return (
    <View style={styles.navigation}>
      <Pressable style={styles.buttons} onPress={() => Alert.alert("Future feature")}>
        <Text style={styles.buttonText}>Favourite</Text>
      </Pressable>
      <Pressable style={styles.buttons} onPress={() => {}}>
        <Text style={styles.buttonText}>Lists</Text>
      </Pressable>
      <Pressable style={styles.buttons} onPress={() => Alert.alert("Future feature")}>
        <Text style={styles.buttonText}>Previous</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  navigation: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#046835",
    alignItems: "center",
    height: "9%",
    justifyContent: "space-evenly",
  },
  buttons: {
    padding: 5,
    width: "30%",
    display:"flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#06964d",
    borderRadius: 10,
  },
  buttonText: {
    fontFamily: Platform.select({
      ios: "Cochin",
      default: "serif",
    }),
    fontSize: 20,
  },
});
