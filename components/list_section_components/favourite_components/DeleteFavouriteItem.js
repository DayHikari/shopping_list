import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import imagePaths from "../../../image_paths_data/imagePathData";
import baseStyles from "../../../global_styles/baseStyle";

export default function DeleteFavouriteItem({ item, handleDelete }) {
  return (
    <View style={baseStyles.formItemContainer}>
      <Image source={imagePaths[item.image]} style={baseStyles.formItemImage} />
      {item.product.length >= 10 ? (
        <ScrollView nestedScrollEnabled={true}>
          <Text style={baseStyles.formItemText}>{item.product}</Text>
        </ScrollView>
      ) : (
        <Text style={baseStyles.formItemText}>{item.product}</Text>
      )}
      <Pressable style={baseStyles.formButtons} onPress={() => handleDelete(item.id)}>
        <Text style={baseStyles.formButtonText}>Delete</Text>
      </Pressable>
    </View>
  );
};