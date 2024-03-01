import { Pressable, ScrollView, View, StyleSheet, Text } from "react-native";
import capitaliser from "../functions/capitaliser";

export default function ListOptions({ listNames, setSelectedList }) {
  return (
    <ScrollView>
      {listNames &&
        listNames.map((list) => (
          <Pressable
          key={list.list_id}
          style={styles.list}
            onPress={() => {
              setSelectedList(list);
            }}
          >
            <Text style={styles.listText}>{capitaliser(list)}</Text>
          </Pressable>
        ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({

  list: {
    borderWidth: 2,
    borderColor: "#FF8833",
    borderRadius: 5,
    width: 200,
    marginBottom: 10,
    padding: 10,
    display: "flex",
  },
  listText: {
    color: "#FF8833",
    fontSize: 20,
    alignSelf: "center",
  },
})
