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
    borderWidth: 3,
    borderColor: "#B3BFB8",
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
    borderLeftWidth: 3,
    borderColor: "#B3BFB8",
    height: "100%",
    justifyContent: "center",
    padding: 4.5,
    marginLeft: 1,
  },
  buttonText: {
    color: "#B3BFB8",
    fontSize: 18,
    fontFamily: Platform.select({
      ios: "Cochin",
      default: "notoserif",
    }),
    fontWeight: "700",
    textAlign: "center",
  },
});