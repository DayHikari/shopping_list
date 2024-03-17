import {
  Text,
  ScrollView,
  Pressable,
} from "react-native";
import DeleteFavouriteItem from "./DeleteFavouriteItem";
import { supabase } from "../../../supabase";
import baseStyles from "../../../global_styles/baseStyle";

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
        style={baseStyles.formScrollArea}
        contentContainerStyle={baseStyles.formScrollContentContainer}
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
          <Text style={baseStyles.error}>
            You have no favourites saved. Add one below!
          </Text>
        )}
      </ScrollView>
      <Pressable style={baseStyles.formButtons} onPress={() => setDisplayedPage("list")}>
        <Text style={baseStyles.formButtonText}>Cancel</Text>
      </Pressable>
    </>
  );
};
