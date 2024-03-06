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

export default function DeleteFavouriteItem({ item, handleDelete }) {
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
      <Pressable style={styles.button} onPress={() => handleDelete(item.id)}>
        <Text style={styles.buttonText}>Delete</Text>
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
    marginVertical: 2,
    paddingVertical: 5,
    width: "100%",
    maxHeight: 55,
  },
  image: {
    width: 50,
    height: 50,
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
  },
  button: {
    borderRadius: 15,
    backgroundColor: "#FF8833",
    paddingHorizontal: 10,
    paddingVertical: 5,
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