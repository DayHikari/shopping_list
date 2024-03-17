import {
  Text,
  View,
  Pressable,
  TextInput,
} from "react-native";
import { supabase } from "../../../supabase";
import imagePaths from "../../../image_paths_data/imagePathData";
import baseStyles from "../../../global_styles/baseStyle";

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
      <Text style={baseStyles.formlLabels}>Add new favourite.</Text>
      <TextInput
        style={baseStyles.textInputs}
        placeholder="Enter new favourite."
        onChangeText={(text) => {
          setProduct(text);
        }}
        value={product}
      />
      <View style={baseStyles.formButtonsSection}>
        <Pressable
          style={baseStyles.formButtons}
          onPress={() => {
            setErrorMessage(null);
            setDisplayedPage("list");
          }}
        >
          <Text style={baseStyles.formButtonText}>Cancel</Text>
        </Pressable>
        <Pressable style={baseStyles.formButtons} onPress={() => handleCreate()}>
          <Text style={baseStyles.formButtonText}>Submit</Text>
        </Pressable>
      </View>
    </>
  );
};