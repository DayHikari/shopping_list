import { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View, Platform } from "react-native";
import imagePaths from "../../image_paths_data/imagePathData";
import { supabase } from "../../supabase";
import baseStyles from "../../global_styles/baseStyle";

export default function ListItem({
  itemData,
  setSelectedItem,
  setShoppingList,
}) {
  const [checked, setChecked] = useState(itemData.checked);
  const checkedImageURL = checked
    ? require("../../assets/gray_checked.png")
    : require("../../assets/unchecked.png");
  const checkedLayout = !checked ? "productLayout" : "checkedProductLayout";
  const checkedText = !checked ? "productText" : "checkedProductText";
  const checkedQuantity = !checked ? "productQuantity" : "checkedProductQuantity";

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
      style={baseStyles.selectableElement}
      onPress={() => {
        setSelectedItem(itemData);
      }}
    >
      <View style={styles[checkedLayout]}>
        <Image source={imagePaths[itemData.image]} style={styles.image}/>
        {checked && <Image source={imagePaths[itemData.image]} style={styles.imageOverlay}/>}
        <View style={styles.productTextSection}>
          <Text style={styles[checkedText]}>{itemData.product}</Text>
          <Text style={styles[checkedQuantity]}>
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
  imageOverlay: {
    width: 64,
    height: 64,
    position: "absolute",
    tintColor: "gray",
    opacity: 0.8,
  },
  productTextSection: {
    maxWidth: "60%",
  },
  productText: {
    fontSize: 23,
    textAlign: "center",
    lineHeight: 25,
    fontFamily: Platform.select({
      ios: "Avenir-Heavy",
      default: "notoserif",
    }),
    color: "#034222"
  },
  checkedProductText: {
    fontSize: 23,
    textAlign: "center",
    lineHeight: 25,
    fontFamily: Platform.select({
      ios: "Avenir-Heavy",
      default: "notoserif",
    }),
    color: "#F0F7F4"
  },
  productQuantity: {
    fontSize: 16,
    textAlign: "center",
    fontFamily: Platform.select({
      ios: "Avenir-Heavy",
      default: "notoserif",
    }),
    color: "#034222"
  },
  checkedProductQuantity: {
    fontSize: 16,
    textAlign: "center",
    fontFamily: Platform.select({
      ios: "Avenir-Heavy",
      default: "notoserif",
    }),
    color: "#F0F7F4"
  },
});
