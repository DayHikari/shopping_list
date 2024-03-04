import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Pressable,
  Platform,
} from "react-native";
import DeleteFavouriteItem from "./DeleteFavouriteItem";
import { supabase } from "../../../supabase";

export default function DeleteList({
  favouritesList,
  setFavouritesList,
  setDisplayedPage,
  setErrorMessage
}) {
  const handleDelete = async (id) => {
    const { error } = await supabase.from("favourites").delete().eq("id", id);

    if (error) {
      return setErrorMessage(`Error: ${error}. Please try again later.`)
    };

    setFavouritesList(prev => prev.filter(favourite => favourite.id !== id));
    setErrorMessage(null);
  };
  return (
    <>
      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={styles.contentContainer}
        nestedScrollEnabled={true}
      >
        {favouritesList.length !== 0 ? (
          favouritesList.map((item) => {
            return (
              <DeleteFavouriteItem
                item={item}
                key={item.id}
                handleDelete={handleDelete}
              />
            );
          })
        ) : (
          <Text style={styles.error}>
            You have no favourites saved. Add one below!
          </Text>
        )}
      </ScrollView>
      <Pressable style={styles.button} onPress={() => setDisplayedPage("list")}>
        <Text style={styles.buttonText}>Cancel</Text>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
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
      default: "notoserif",
    }),
    fontWeight: "700",
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
