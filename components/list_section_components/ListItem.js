import { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

export default function ListItem({ itemData }) {
  const [checked, setChecked] = useState(false);
  const checkedImageURL = checked
    ? require("../../assets/checked.png")
    : require("../../assets/unchecked.png");
  const handleCheckPress = () => {
    setChecked((prevState) => !prevState);
  };
  return (
    <View style={styles.productLayout}>
      <Image source={itemData.image} />
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
  );
}

const styles = StyleSheet.create({
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
