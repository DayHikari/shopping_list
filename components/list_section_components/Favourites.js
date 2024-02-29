import { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Pressable,
  Platform,
  TextInput,
} from "react-native";
import { supabase } from "../../supabase";
import FavouriteItem from "./FavouriteItem";
import imagePaths from "../../image_paths_data/imagePathData";

export default function Favourites({ email, setShoppingList }) {
  const [favouritesList, setFavouritesList] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [displayedPage, setDisplayedPage] = useState("list");
  const [product, setProduct] = useState("");

  useEffect(() => {
    const fetchFavourites = async () => {
      const { data, error } = await supabase.from("favourites").select("*");

      if (error) {
        setErrorMessage(error);
      } else {
        setFavouritesList(data);
      }
    };

    fetchFavourites();
  }, []);

  const chooseDisplay = () => {
    switch (displayedPage) {
      case "list":
        return (
          <>
            <ScrollView
              style={styles.scrollArea}
              contentContainerStyle={styles.contentContainer}
              nestedScrollEnabled={true}
            >
              {favouritesList &&
                favouritesList.map((item) => {
                  return <FavouriteItem item={item} key={item.id} />;
                })}
            </ScrollView>
            <View style={styles.buttonContainer}>
              <Pressable
                style={styles.button}
                onPress={() => setDisplayedPage("create")}
              >
                <Text style={styles.buttonText}>Create</Text>
              </Pressable>
              <Pressable
                style={styles.button}
                onPress={() => {}}
              >
                <Text style={styles.buttonText}>Delete</Text>
              </Pressable>
            </View>
          </>
        );
      case "create":
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
                onPress={() => setDisplayedPage("list")}
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
  };

  const handleCreate = async () => {
    if (product === "") {
      return setErrorMessage("Please enter an product.")
    };

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

      setFavouritesList((prev) => [...prev, data]);
      setProduct("");
      setErrorMessage(null);
    }
  };

  return (
    <View style={styles.form}>
      <Text style={styles.header}>Favourites List</Text>
      {chooseDisplay()}
      {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    width: "95%",
    maxHeighteight: 375,
    backgroundColor: "#034222",
    display: "flex",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
  },
  header: {
    fontSize: 25,
    fontFamily: Platform.select({
      ios: "Cochin",
      default: "serif",
    }),
    color: "#FF8833",
    fontWeight: "700",
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 22,
    fontFamily: Platform.select({
      ios: "Cochin",
      default: "serif",
    }),
    color: "#FF8833",
    fontWeight: "700",
    marginBottom: 5,
  },
  scrollArea: {
    width: "90%",
    maxHeight: 350,
  },
  contentContainer: {
    display: "flex",
    alignItems: "center",
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
      default: "serif",
    }),
    fontWeight: "700",
  },
  textInput: {
    backgroundColor: "#CDEEFD",
    width: "90%",
    height: 40,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#FF8833",
    padding: 10,
    marginBottom: 10,
    marginTop: 2,
    fontSize: 15,
    color: "#046835",
    fontFamily: Platform.select({
      ios: "Cochin",
      default: "serif",
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
  error: {
    color: "red",
    fontSize: 16,
    fontFamily: Platform.select({
      ios: "Cochin",
      default: "serif",
    }),
    fontWeight: "700",
  },
});
