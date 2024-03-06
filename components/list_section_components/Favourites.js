import { useEffect, useState } from "react";
import { Text, View, StyleSheet, Platform } from "react-native";
import { supabase } from "../../supabase";
import FavouiteList from "./favourite_components/FavouriteList";
import CreateFavourite from "./favourite_components/CreateFavourite";
import DeleteFavourite from "./favourite_components/DeleteFavourite";
import imagePaths from "../../image_paths_data/imagePathData";
import AddFavourite from "./favourite_components/AddFavourite";

export default function Favourites({
  email,
  shoppingList,
  setShoppingList,
  selectedList,
}) {
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

  const handleAddItem = (itemProduct) => {
    const listCheck = shoppingList.filter(
      (itemDetails) => itemDetails.product === itemProduct.product
    );

    if (listCheck.length !== 0) {
      return setErrorMessage("This product is already in this list.");
    }

    setProduct(itemProduct);
    setErrorMessage(null);
    setDisplayedPage("add");
  };

  const handleAddSubmit = async (quantity) => {
    if (quantity === "") {
      return setErrorMessage("Please add a quantity.");
    }

    const imageCheck = product.product.toLocaleLowerCase().trim().replaceAll(" ", "_");

    const productObject = imagePaths[imageCheck]
      ? {
          product: product.product,
          image: imageCheck,
          quantity: quantity,
          checked: false,
          list_id: selectedList.list_id,
        }
      : {
          product: product.product,
          image: "default",
          quantity: quantity,
          checked: false,
          list_id: selectedList.list_id,
        };

    const { data, error } = await supabase
      .from("items")
      .insert([productObject])
      .select();

    if (error) {
      setErrorMessage(`Error: ${error}`);
    } else {
      setShoppingList((prev) => [...prev, data[0]]);
      setProduct("");
      setErrorMessage(false);
      setDisplayedPage("list");
    }
  };

  const handleAddCancel = () => {
    setProduct("");
    setErrorMessage(null);
    setDisplayedPage("list");
  };

  const chooseDisplay = () => {
    switch (displayedPage) {
      case "list":
        return (
          favouritesList && (
            <FavouiteList
              favouritesList={favouritesList}
              setDisplayedPage={setDisplayedPage}
              handleAddItem={handleAddItem}
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
            email={email}
          />
        );
      case "delete":
        return (
          <DeleteFavourite
            favouritesList={favouritesList}
            setFavouritesList={setFavouritesList}
            setDisplayedPage={setDisplayedPage}
            setErrorMessage={setErrorMessage}
          />
        );
      case "add":
        return (
          <AddFavourite
            handleAddSubmit={handleAddSubmit}
            handleAddCancel={handleAddCancel}
            productName = {product.product}
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
    width: "100%",
    maxHeight: 375,
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
      default: "notoserif",
    }),
    color: "#F0F7F4",
    fontWeight: "700",
    marginBottom: 10,
  },
  error: {
    color: "red",
    fontSize: 16,
    fontFamily: Platform.select({
      ios: "Cochin",
      default: "notoserif",
    }),
    fontWeight: "700",
  },
});
