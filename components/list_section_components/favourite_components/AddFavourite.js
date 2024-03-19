import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import baseStyles from "../../../global_styles/baseStyle";

export default function AddFavourite({ handleAddSubmit, handleAddCancel, productName }) {
  const [quantity, setQuantity] = useState("");

  return (
    <>
      <Text style={baseStyles.formLabels}>{`Add selected product: ${productName}`}</Text>
      <Text style={baseStyles.formLabels}>Quantity:</Text>
      <TextInput
        style={baseStyles.textInputs}
        placeholder="Enter quantity"
        onChangeText={(text) => {
          setQuantity(text);
        }}
        value={quantity}
      />
      <View style={baseStyles.formButtonsSection}>
        <Pressable onPress={() => handleAddCancel()} style={baseStyles.formButtons}>
          <Text style={baseStyles.formButtonText}>Cancel</Text>
        </Pressable>
        <Pressable onPress={() => handleAddSubmit(quantity)} style={baseStyles.formButtons}>
          <Text style={baseStyles.formButtonText}>Submit</Text>
        </Pressable>
      </View>
    </>
  );
};