import { Pressable, ScrollView, Text } from "react-native";
import capitaliser from "../functions/capitaliser";
import baseStyles from "../../global_styles/baseStyle";

export default function ShareListOptions({ listNames, setSelectedList }) {
  return (
    <ScrollView>
      {listNames &&
        listNames.map((list) => (
          <Pressable
          key={list.list_id}
          style={baseStyles.formButtons}
            onPress={() => {
              setSelectedList(list);
            }}
          >
            <Text style={baseStyles.formButtonText}>{capitaliser(list)}</Text>
          </Pressable>
        ))}
    </ScrollView>
  );
};
