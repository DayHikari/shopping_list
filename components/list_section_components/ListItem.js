import { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import imagePaths from "../../image_paths_data/imagePathData";

export default function ListItem({ itemData, setSelectedItem }) {
  const [checked, setChecked] = useState(itemData.checked);
  const checkedImageURL = checked
    ? require("../../assets/checked.png")
    : require("../../assets/unchecked.png");
  const checkedStyle = !checked ? "productLayout" : "checkedProductLayout";

  const handleCheckPress = () => {
    setChecked((prevState) => !prevState);
  };

  return (
    <Pressable style={styles.selectElement} onPress={() => {setSelectedItem(itemData)}}>
      <View style={styles[checkedStyle]}>
        <Image source={imagePaths[itemData.image]} />
        <View style={styles.productTextSection}>
          <Text style={styles.productText}>{itemData.product}</Text>
          <Text style={styles.productQuantity}>
            Quantity: {itemData.quantity}
          </Text>
        </View>
        <Pressable onPress={handleCheckPress}>
          <Image source={checkedImageURL} />
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
  },
  productLayout: {
    borderWidth: 4,
    borderColor: "#046835",
    margin: 10,
    width: "90%",
    display: "flex",
    flexDirection: "row",
    padding: 5,
    alignItems: "center",
    justifyContent: "space-between",
  },
  checkedProductLayout: {
    borderWidth: 4,
    borderColor: "#9A9A9A",
    margin: 10,
    width: "90%",
    display: "flex",
    flexDirection: "row",
    padding: 5,
    alignItems: "center",
    justifyContent: "space-between",
  },
  productTextSection: {
    maxWidth: "60%",
    justifyContent: "center",
    alignItems: "center",
  },
  productText: {
    fontSize: 30,
  },
  productQuantity: {
    fontSize: 20,
  },
});
