import { Pressable, StyleSheet, View, Text } from "react-native";
import capitaliser from "../functions/capitaliser";
import baseStyles from "../../global_styles/baseStyle";

export default function ListName({ listName, handleListSelect }) {
  return (
    <>
      <Pressable
        style={baseStyles.selectableElement}
        onPress={() => handleListSelect(listName)}
      >
        <View style={styles.itemLayout}>
          <Text style={baseStyles.pageText}>
            {listName ? capitaliser(listName) : "No lists available."}
          </Text>
        </View>
      </Pressable>
      <View style={baseStyles.separator} />
    </>
  );
}

const styles = StyleSheet.create({
  itemLayout: {
    margin: 10,
    padding: 5,
    width: "95%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
