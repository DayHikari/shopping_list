import { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View,  } from "react-native";
import imagePaths from "../../image_paths_data/imagePathData";
import { supabase } from "../../supabase";


export default function ListItem({
  itemData,
  setSelectedItem,
  setShoppingList,
}) {
  const [checked, setChecked] = useState(itemData.checked);
  const checkedImageURL = checked
    ? require("../../assets/checked.png")
    : require("../../assets/unchecked.png");
  const checkedStyle = !checked ? "productLayout" : "checkedProductLayout";

  const handleCheckPress = async () => {
    setChecked((prevState) => !prevState);
  };
  
  useEffect(() => {
    if (checked !== itemData.checked) {
      const updateItem = async () => {
        const { data, error } = await supabase
          .from("items")
          .update({ checked: checked })
          .eq("product", itemData.product)
          .select();

        if (error) {
          setErrorMessage(`Error: ${error}`);
        } else {
          setShoppingList((prevProductList) =>
            prevProductList.map((productObj) =>
              productObj.product === itemData.product ? data[0] : productObj
            )
          );
        }
      };
      updateItem();
    }
  }, [checked]);

  return (
    <Pressable
      style={styles.selectElement}
      onPress={() => {
        setSelectedItem(itemData);
      }}
    >
      <View style={styles[checkedStyle]}>
        <Image source={imagePaths[itemData.image]} style={styles.image}/>
        <View style={styles.productTextSection}>
          <Text style={styles.productText}>{itemData.product}</Text>
          <Text style={styles.productQuantity}>
            Quantity: {itemData.quantity}
          </Text>
        </View>
        <Pressable onPress={handleCheckPress}>
          <Image source={checkedImageURL} style={styles.image}/>
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  selectElement: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  productLayout: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    paddingVertical: 5,
    alignItems: "center",
    justifyContent: "space-between",
  },
  checkedProductLayout: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    paddingVertical: 5,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#B3BFB8"
  },
  image: {
    width: 64,
    height: 64,
  },
  productTextSection: {
    maxWidth: "60%",
  },
  productText: {
    fontSize: 23,
    textAlign: "center",
    lineHeight: 23
  },
  productQuantity: {
    fontSize: 16,
    textAlign: "center",
  },
});
