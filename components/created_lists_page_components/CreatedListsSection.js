import { ScrollView, Text } from "react-native";
import ListName from "./ListName";
import baseStyles from "../../global_styles/baseStyle";

export default function CreatedListsSection({ listNames, handleListSelect }) {
  return (
    <ScrollView
      style={baseStyles.pageScrollArea}
      contentContainerStyle={baseStyles.pageScrollContentContainer}
    >
      {listNames.length === 0 ? (
        <Text style={baseStyles.pageText}>
          You do not have any lists. Please add one from the menu below!
        </Text>
      ) : (
        listNames.map((listName) => {
          return (
            <ListName
              listName={listName}
              handleListSelect={handleListSelect}
              key={listName.list_id}
            />
          );
        })
      )}
    </ScrollView>
  );
};