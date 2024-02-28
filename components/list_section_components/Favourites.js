import { useEffect, useState } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { supabase } from "../../supabase";

export default function Favourites({ email, setShoppingList }) {
  const [favouritesList, setFavouritesList] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchFavourites = async () => {
      const {data, error} = await supabase
      .from("favourites")
      .select("*");
      
      if (error) {
        console.log(error)
        setErrorMessage(error);
      } else {
        console.log(data)
        setFavouritesList(data);
      };
    };

    fetchFavourites();
  }, []);

  return (
    <View style={styles.form}>
      <Text style={styles.header}>Favourites List</Text>
      <ScrollView>
        
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    width: "95%",
    height: 280,
    backgroundColor: "#034222",
    display: "flex",
    alignItems: "center",
    padding: 5,
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
});
