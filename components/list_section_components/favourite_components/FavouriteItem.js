import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import imagePaths from "../../../image_paths_data/imagePathData";
import baseStyles from "../../../global_styles/baseStyle";

export default function FavouriteItem({ item, handleAddItem }) {
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
      <Pressable style={baseStyles.formButtons} onPress={() => handleAddItem(item)}>
        <Text style={baseStyles.formButtonText}>Add</Text>
      </Pressable>
    </View>
  );
};