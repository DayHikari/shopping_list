import {
  StyleSheet,
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  Platform,
} from "react-native";
import imagePaths from "../../../image_paths_data/imagePathData";

export default function FavouriteItem({ item, handleAddItem }) {
  return (
    <View style={styles.container}>
      <Image source={imagePaths[item.image]} style={styles.image} />
      {item.product.length >= 10 ? (
        <ScrollView nestedScrollEnabled={true}>
          <Text style={styles.text}>{item.product}</Text>
        </ScrollView>
      ) : (
        <Text style={styles.text}>{item.product}</Text>
      )}
      <Pressable style={styles.button} onPress={() => handleAddItem(item)}>
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
    borderColor: "#B3BFB8",
    borderRadius: 10,
    margin: 5,
    width: "90%",
  },
  image: {
    width: 50,
    height: 50,
    marginLeft: 2,
  },
  text: {
    color: "#B3BFB8",
    fontSize: 23,
    fontFamily: Platform.select({
      ios: "Cochin",
      default: "notoserif",
    }),
    fontWeight: "700",
    textAlign: "center",
    alignSelf: "center",
    margin: 1,
  },
  button: {
    borderRadius: 15,
    backgroundColor: "#FF8833",
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginBottom: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "#034222",
    fontSize: 18,
    fontFamily: Platform.select({
      ios: "Cochin",
      default: "notoserif",
    }),
    fontWeight: "700",
    textAlign: "center",
  },
});
