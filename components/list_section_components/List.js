import { StyleSheet, ScrollView } from "react-native";
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
      {uncheckedList &&
        uncheckedList.map((shoppingItem) => {
          return (
            <ListItem
              key={shoppingItem.product}
              itemData={shoppingItem}
              setSelectedItem={setSelectedItem}
              setShoppingList={setShoppingList}
            />
          );
        })}
      {checkedList &&
        checkedList.map((shoppingItem) => {
          return (
            <ListItem
              key={shoppingItem.product}
              itemData={shoppingItem}
              setSelectedItem={setSelectedItem}
              setShoppingList={setShoppingList}
            />
          );
        })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  list: {
    width: "100%",
  },
  contentContainer: {
    display: "flex",
    alignItems: "center",
  },
});
