import { ScrollView, StyleSheet, Text, View } from "react-native";
import ListName from "./ListName";

export default function CreatedListsSection({ listNames, handleListSelect }) {
  return (
    <ScrollView
      style={styles.list}
      contentContainerStyle={styles.contentContainer}
    >
      {listNames.length === 0 ? (
        <Text style={styles.text}>
          You do not have any lists. Please add one from the menu below!
        </Text>
      ) : (
        listNames.map((listName, index) => {
          return (
            <ListName
              listName={listName}
              handleListSelect={handleListSelect}
              key={listName.list_id}
            />
          );
        })
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  list: {
    width: "100%",
    borderRadius: 10,
    padding: 10,
  },
  contentContainer: {
    display: "flex",
    alignItems: "center",
  },
  text: {
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
    textAlign: "center",
  },
});
