import { View, StyleSheet } from "react-native-web";
import CreatedLists from "./created_lists_page_components/CreatedLists";
import CreatedListsOptions from "./created_lists_page_components/CreatedListsOptions";

export default function CreatedListsPage() {
  return (
    <View style={styles.listContainer}>
      <CreatedLists />
      <View style={styles.separator} />
      <CreatedListsOptions />
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    height: "72%",
    display: "flex",
    alignItems: "center",
  },
  separator: {
    marginVertical: 5,
    borderBottomColor: "#046835",
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: "85%",
  },
});
