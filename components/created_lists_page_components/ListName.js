import { Pressable, StyleSheet, View, Text, Platform } from "react-native";
import capitaliser from "../functions/capitaliser";

export default function ListName({listName, handleListSelect}) {
  return (
    <Pressable style={styles.selectElement} onPress={() => handleListSelect(listName)} > 
      <View style={styles.itemLayout}>
        <Text style={styles.text}>
          {listName ? capitaliser(listName) : "No lists available."}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  selectElement: {
    width: "100%",
    display: "flex",
    alignItems: "center",
  },
  itemLayout: {
    // borderWidth: 4,
    borderColor: "#046835",
    margin: 10,
    padding: 5,
    width: "90%",    
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
      ios: "Cochin",
      default: "serif"
    }),
  },
})