import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Platform,
  TextInput,
} from "react-native";
import { supabase } from "../../../supabase";
import imagePaths from "../../../image_paths_data/imagePathData";

export default function CreateFavourite({
  product,
  setProduct,
  favouritesList,
  setFavouritesList,
  setDisplayedPage,
  setErrorMessage,
  email,
}) {
  const handleCreate = async () => {
    if (product === "") {
      return setErrorMessage("Please enter an product.");
    }

    const duplicateFavourite = favouritesList.filter(
      (favourite) =>
        favourite.product.toLocaleLowerCase() === product.toLocaleLowerCase()
    );

    if (duplicateFavourite.length > 0) {
      return setErrorMessage("This product is already favourited.");
    } else {
      const imageCheck = product
        .toLocaleLowerCase()
        .trim()
        .replaceAll(" ", "_");

      const productObject = imagePaths[imageCheck]
        ? {
            email: email,
            product: product,
            image: imageCheck,
          }
        : {
            email: email,
            product: product,
            image: "default",
          };

      const { data, error } = await supabase
        .from("favourites")
        .insert([productObject])
        .select();

      if (error) {
        return setErrorMessage(`Error: ${error}. Please try again later.`);
      }

      setFavouritesList((prev) => [...prev, data[0]]);
      setProduct("");
      setErrorMessage(null);
    }
  };

  return (
    <>
      <Text style={styles.subHeader}>Add new favourite.</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Enter new favourite."
        onChangeText={(text) => {
          setProduct(text);
        }}
        value={product}
      />
      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.button}
          onPress={() => {
            setErrorMessage(null);
            setDisplayedPage("list");
          }}
        >
          <Text style={styles.buttonText}>Cancel</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => handleCreate()}>
          <Text style={styles.buttonText}>Submit</Text>
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  subHeader: {
    fontSize: 22,
    fontFamily: Platform.select({
      ios: "Cochin",
      default: "notoserif",
    }),
    color: "#B3BFB8",
    fontWeight: "700",
    marginBottom: 5,
  },
  textInput: {
    backgroundColor: "#F0F7F4",
    width: "90%",
    height: 40,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#B3BFB8",
    padding: 10,
    marginBottom: 10,
    marginTop: 2,
    fontSize: 15,
    color: "#034222",
    fontFamily: Platform.select({
      ios: "Cochin",
      default: "notoserif",
    }),
    fontWeight: "700",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "60%",
  },
  button: {
    borderRadius: 15,
    backgroundColor: "#FF8833",
    paddingHorizontal: 10,
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
  },
});
