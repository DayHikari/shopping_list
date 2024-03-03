import { ScrollView, StyleSheet, Text, View } from "react-native";
import ListName from "./ListName";

export default function CreatedListsSection({ listNames, handleListSelect }) {
  return (
    <ScrollView
      style={styles.list}
      contentContainerStyle={styles.contentContainer}
    >
      {listNames &&
        listNames.map((listName, index) => {
          return (
            <>
              <ListName
                listName={listName}
                handleListSelect={handleListSelect}
                key={index}
              />
              <View style={styles.separator} key={`${index}S`}/>
            </>
          );
        })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  list: {
    width: "100%",
    backgroundColor: "#B3BFB830",
    borderRadius: 10,
    marginTop: 10,
    padding: 10,
  },
  contentContainer: {
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
