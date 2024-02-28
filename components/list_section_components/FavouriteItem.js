import { View } from "react-native";

export default function FavouriteItem ({item}) {
  return (
    <View>
      <Text>{item.product}</Text>
    </View>
  );
};