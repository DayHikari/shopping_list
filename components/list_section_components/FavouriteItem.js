import {
  StyleSheet,
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  Platform,
} from "react-native";
import imagePaths from "../../image_paths_data/imagePathData";
import { useState } from "react";

export default function FavouriteItem({ item }) {
  const [tooLong, setTooLong] = useState(item.product.length >= 10);
  return (
    <View style={styles.container}>
      <Image source={imagePaths[item.image]} style={styles.image} />
      {tooLong ? (
        <ScrollView nestedScrollEnabled={true}>
          <Text style={styles.text}>{item.product}</Text>
        </ScrollView>
      ) : (
        <Text style={styles.text}>{item.product}</Text>
      )}
      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>Add</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#FF8833",
    borderRadius: 10,
    margin: 5,
    height: 65,
    width: "90%",
  },
  image: {
    width: 50,
    height: 50,
    marginLeft: 2,
  },
  text: {
    color: "#FF8833",
    fontSize: 23,
    fontFamily: Platform.select({
      ios: "Cochin",
      default: "serif",
    }),
    fontWeight: "700",
    textAlign: "center",
    alignSelf: "center",
    margin: 1,
  },
  button: {
    borderLeftWidth: 3,
    borderColor: "#FF8833",
    height: "100%",
    justifyContent: "center",
    padding: 10,
    marginLeft: 2,
  },
  buttonText: {
    color: "#FF8833",
    fontSize: 23,
    fontFamily: Platform.select({
      ios: "Cochin",
      default: "serif",
    }),
    fontWeight: "700",
    textAlign: "center",
  },
});
