import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Pressable,
  Platform,
} from "react-native";
import FavouriteItem from "./FavouriteItem";

export default function FavouiteList({
  favouritesList,
  setDisplayedPage,
  handleAddItem
}) {
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
              <FavouriteItem
                item={item}
                key={item.id}
                handleAddItem={handleAddItem}
              />
            );
          })
        ) : (
          <Text style={styles.error}>
            You have no favourites saved. Add one below!
          </Text>
        )}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.button}
          onPress={() => setDisplayedPage("create")}
        >
          <Text style={styles.buttonText}>Create</Text>
        </Pressable>
        {favouritesList && (
          <Pressable
            style={styles.button}
            onPress={() => setDisplayedPage("delete")}
          >
            <Text style={styles.buttonText}>Delete</Text>
          </Pressable>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  scrollArea: {
    width: "95%",
    maxHeight: 350,
  },
  contentContainer: {
    display: "flex",
    alignItems: "center",
  },
  error: {
    color: "red",
    fontSize: 16,
    fontFamily: Platform.select({
      ios: "Avenir-Heavy",
      default: "serif",
    }),
    fontWeight: "700",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    width: "80%",
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
      ios: "Avenir-Heavy",
      default: "serif",
    }),
    fontWeight: "700",
  },
});
