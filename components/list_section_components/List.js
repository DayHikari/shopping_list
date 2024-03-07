import { StyleSheet, ScrollView, Text, Platform } from "react-native";
import ListItem from "./ListItem";

import { useState, useEffect } from "react";

export default function List({
  shoppingList,
  setSelectedItem,
  setShoppingList,
}) {
  const [uncheckedList, setUncheckedList] = useState(null);
  const [checkedList, setCheckedList] = useState(null);

  const filterLists = () => {
    setUncheckedList(
      (prevList) =>
        (prevList = shoppingList.filter(
          (itemObj) => itemObj["checked"] === false
        ))
    );
    setCheckedList(
      (prevList) =>
        (prevList = shoppingList.filter((itemObj) => itemObj.checked === true))
    );
  };

  useEffect(() => {
    if (shoppingList) {
      filterLists();
    }
  }, [shoppingList]);

  return (
    <ScrollView
      style={styles.list}
      contentContainerStyle={styles.contentContainer}
    >
      {uncheckedList && uncheckedList.length !== 0 ? (
        uncheckedList.map((shoppingItem) => {
          return (
            <ListItem
              key={shoppingItem.product}
              itemData={shoppingItem}
              setSelectedItem={setSelectedItem}
              setShoppingList={setShoppingList}
            />
          );
        })
      ) : (
        <Text style={styles.message}>No items in list</Text>
      )}
      {checkedList
        ? checkedList.map((shoppingItem) => {
            return (
              <ListItem
                key={shoppingItem.product}
                itemData={shoppingItem}
                setSelectedItem={setSelectedItem}
                setShoppingList={setShoppingList}
              />
            );
          })
        : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  list: {
    width: "100%",
    backgroundColor: "#B3BFB830",
    borderRadius: 5,
    paddingVertical: 5,
  },
  contentContainer: {
    display: "flex",
    alignItems: "center",
  },
  message: {
    borderWidth: 4,
    borderColor: "#046835",
    margin: 10,
    width: "90%",
    padding: 5,
    textAlign: "center",
    fontSize: 25,
    fontFamily: Platform.select({
      ios: "Avenir-Heavy",
      default: "serif",
    }),
  },
});
