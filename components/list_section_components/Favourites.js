import { useEffect, useState } from "react";
import { Text, View, StyleSheet, ScrollView, Pressable, Platform } from "react-native";
import { supabase } from "../../supabase";
import FavouriteItem from "./FavouriteItem";

export default function Favourites({ email, setShoppingList }) {
  const [favouritesList, setFavouritesList] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchFavourites = async () => {
      const {data, error} = await supabase
      .from("favourites")
      .select("*");
      
      if (error) {
        setErrorMessage(error);
      } else {
        setFavouritesList(data);
      };
    };

    fetchFavourites();
  }, []);

  return (
    <View style={styles.form}>
      <Text style={styles.header}>Favourites List</Text>
      <ScrollView style={styles.scrollArea} contentContainerStyle={styles.contentContainer}>
        {favouritesList && favouritesList.map(item => {
          return <FavouriteItem item={item} key={item.id}/>
        })}
      </ScrollView>
      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>Add new favourite.</Text>
      </Pressable>
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
});
