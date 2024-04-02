import { Pressable, StyleSheet, Text, View, Platform } from "react-native";
import baseStyles from "../../global_styles/baseStyle";

export default function CreatedListsOptions({ setOptionSelected }) {
  return (
    <View style={baseStyles.menu}>
      <Text style={baseStyles.formHeader}>Choose an option</Text>
      <View style={baseStyles.formButtonsSection}>
        <Pressable
          style={baseStyles.menuButtons}
          onPress={() => {
            setOptionSelected("add");
          }}
        >
          <Text style={baseStyles.formButtonText}>Add list</Text>
        </Pressable>
        <Pressable
          style={baseStyles.menuButtons}
          onPress={() => {
            setOptionSelected("edit");
          }}
        >
          <Text style={baseStyles.formButtonText}>Edit list</Text>
        </Pressable>
        <Pressable
          style={baseStyles.menuButtons}
          onPress={() => {
            setOptionSelected("delete");
          }}
        >
          <Text style={baseStyles.formButtonText}>Delete list</Text>
        </Pressable>
        <Pressable
          style={baseStyles.menuButtons}
          onPress={() => {
            setOptionSelected("share");
          }}
        >
          <Text style={baseStyles.formButtonText}>Share list</Text>
        </Pressable>
      </View>
    </View>
  );
};
