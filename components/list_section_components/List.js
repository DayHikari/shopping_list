import { ScrollView, Text } from "react-native";
import ListItem from "./ListItem";
import { useState, useEffect } from "react";
import baseStyles from "../../global_styles/baseStyle";

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
        prevList = shoppingList.filter(
          (itemObj) => itemObj["checked"] === false
        )
    );
    setCheckedList(
      (prevList) =>
        prevList = shoppingList.filter((itemObj) => itemObj.checked === true)
    );
  };

  useEffect(() => {
    if (shoppingList) {
      filterLists();
    }
  }, [shoppingList]);

  return (
    <ScrollView
      style={baseStyles.pageScrollArea}
      contentContainerStyle={baseStyles.pageScrollContentContainer}
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
        <Text style={baseStyles.pageText}>No items in list</Text>
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
};