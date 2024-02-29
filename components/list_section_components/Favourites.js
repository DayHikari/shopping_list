import { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Platform,
} from "react-native";
import { supabase } from "../../supabase";
import FavouiteList from "./favourite_components/FavouriteList";
import CreateFavourite from "./favourite_components/CreateFavourite";

export default function Favourites({ email, setShoppingList }) {
  const [favouritesList, setFavouritesList] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [displayedPage, setDisplayedPage] = useState(null);
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
    setDisplayedPage("list");
  }, []);

  const chooseDisplay = () => {
    switch (displayedPage) {
      case "list":
        return (
          favouritesList && (
            <FavouiteList
              favouritesList={favouritesList}
              setDisplayedPage={setDisplayedPage}
            />
          )
        );
      case "create":
        return (
          <CreateFavourite
            product={product}
            setProduct={setProduct}
            favouritesList={favouritesList}
            setFavouritesList={setFavouritesList}
            setDisplayedPage={setDisplayedPage}
            setErrorMessage={setErrorMessage}
          />
        );
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
