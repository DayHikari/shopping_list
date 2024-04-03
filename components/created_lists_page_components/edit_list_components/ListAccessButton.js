import { Pressable, Text } from "react-native";
import baseStyles from "../../../global_styles/baseStyle";

export default function ListAccessButton({ fetchUsers }) {
  return (
    <Pressable
      style={baseStyles.formButtons}
      onPress={() => {
        fetchUsers();
      }}
    >
      <Text style={baseStyles.formButtonText}>Click to change list access.</Text>
    </Pressable>
  );
};