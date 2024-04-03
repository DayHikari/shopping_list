import {
  Text,
  View,
  ScrollView,
  Pressable,
} from "react-native";
import FavouriteItem from "./FavouriteItem";
import baseStyles from "../../../global_styles/baseStyle";

export default function FavouiteList({
  favouritesList,
  setDisplayedPage,
  handleAddItem
}) {
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
              <FavouriteItem
                item={item}
                key={item.id}
                handleAddItem={handleAddItem}
              />
            );
          })
        ) : (
          <Text style={baseStyles.error}>
            You have no favourites saved. Add one below!
          </Text>
        )}
      </ScrollView>
      <View style={baseStyles.formButtonsSection}>
        <Pressable
          style={baseStyles.formButtons}
          onPress={() => setDisplayedPage("create")}
        >
          <Text style={baseStyles.formButtonText}>Create</Text>
        </Pressable>
        {favouritesList && (
          <Pressable
            style={baseStyles.formButtons}
            onPress={() => setDisplayedPage("delete")}
          >
            <Text style={baseStyles.formButtonText}>Delete</Text>
          </Pressable>
        )}
      </View>
    </>
  );
};
