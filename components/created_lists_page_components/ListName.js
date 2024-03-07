import { Pressable, StyleSheet, View, Text, Platform } from "react-native";
import capitaliser from "../functions/capitaliser";

export default function ListName({ listName, handleListSelect }) {
  return (
    <>
      <Pressable
        style={styles.selectElement}
        onPress={() => handleListSelect(listName)}
      >
        <View style={styles.itemLayout}>
          <Text style={styles.text}>
            {listName ? capitaliser(listName) : "No lists available."}
          </Text>
        </View>
      </Pressable>
      <View style={styles.separator} />
    </>
  );
}

const styles = StyleSheet.create({
  selectElement: {
    width: "100%",
    display: "flex",
    alignItems: "center",
  },
  itemLayout: {
    margin: 10,
    padding: 5,
    width: "95%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 23,
    fontWeight: "700",
    color: "#034222",
    fontFamily: Platform.select({
      ios: "Avenir-Heavy",
      default: "serif",
    }),
  },
  separator: {
    marginVertical: 5,
    borderBottomColor: "#046835",
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: "85%",
  },
});
