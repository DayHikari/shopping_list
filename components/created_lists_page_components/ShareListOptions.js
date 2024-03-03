import { Pressable, ScrollView, View, StyleSheet, Text, Platform } from "react-native";
import capitaliser from "../functions/capitaliser";

export default function ShareListOptions({ listNames, setSelectedList }) {
  return (
    <ScrollView>
      {listNames &&
        listNames.map((list) => (
          <Pressable
          key={list.list_id}
          style={styles.button}
            onPress={() => {
              setSelectedList(list);
            }}
          >
            <Text style={styles.buttonText}>{capitaliser(list)}</Text>
          </Pressable>
        ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({

  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "#B3BFB8",
    // margin: 5,
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  buttonText: {
    fontFamily: Platform.select({
      ios: "Cochin",
      default: "serif",
    }),
    fontSize: 17,
    fontWeight: "700",
    color: "#B3BFB8",
    paddingHorizontal: 10,
    textAlign: "center",
  },
})
