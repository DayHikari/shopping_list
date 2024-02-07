import { Pressable, StyleSheet, View, Text } from "react-native";

export default function ListName({listName}) {
  
  const capitaliser = () => {
    const nameArray = listName.split("_").map(elem => elem.split("").map((e, i) => i === 0 ? e.toUpperCase() : e).join("")).join(" ");
    return nameArray;
  };

  return (
    <Pressable style={styles.itemLayout}> 
      <View>
        <Text style={styles.text}>
          {listName ? capitaliser() : "No lists available."}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  itemLayout: {
    borderWidth: 4,
    borderColor: "#046835",
    margin: 10,
    padding: 5,
    width: "90%",    
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 23,
    fontWeight: "700",
    color: "#FF8833",
    fontFamily: Platform.select({
      ios: "Cochin",
      default: "serif"
    }),
  },
})