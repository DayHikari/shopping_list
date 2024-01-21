import { Alert, Button, StyleSheet, View } from "react-native";

export default function () {
  return (
    <View style={styles.navigation}>
      <Button title="Favourite" onPress={() => Alert.alert("Future feature")} disabled/>
      <Button title="   List   " color={"#049825"} />
      <Button title="Previous" onPress={() => Alert.alert("Future feature")} disabled/>
    </View>
  );
}

const styles = StyleSheet.create({
  navigation: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#046835",
    alignItems: "center",
    height: "11%",
    justifyContent: "space-evenly",
  },
});
