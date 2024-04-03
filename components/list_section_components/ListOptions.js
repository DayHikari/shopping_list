import { Pressable, StyleSheet, Text, View } from "react-native";
import baseStyles from "../../global_styles/baseStyle";

export default function ListOptions({ setOptionSelected }) {
  return (
    <View style={baseStyles.menu}>
      <Text style={baseStyles.formHeader}>Choose an option:</Text>
      <View style={baseStyles.formButtonsSection}>
        <Pressable
          style={baseStyles.menuButtons}
          onPress={() => {
            setOptionSelected("add");
          }}
        >
          <Text style={baseStyles.formButtonText}>Add</Text>
        </Pressable>
        <Pressable
          style={baseStyles.menuButtons}
          onPress={() => {
            setOptionSelected("edit");
          }}
        >
          <Text style={baseStyles.formButtonText}>Edit</Text>
        </Pressable>
        <Pressable
          style={baseStyles.menuButtons}
          onPress={() => {
            setOptionSelected("delete");
          }}
        >
          <Text style={baseStyles.formButtonText}>Delete</Text>
        </Pressable>
        <Pressable
          style={baseStyles.menuButtons}
          onPress={() => {
            setOptionSelected("favourites")
          }}
        >
          <Text style={baseStyles.formButtonText}>Favourites</Text>
        </Pressable>
      </View>
    </View>
  );
};
