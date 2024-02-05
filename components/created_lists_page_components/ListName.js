import { Pressable, StyleSheet, View, Text } from "react-native";

export default function ListName({listNames}) {
  
  const capitaliser = () => {
    const nameArray = listNames[0]["list_names"].split("_").map(elem => elem.split("").map((e, i) => i === 0 ? e.toUpperCase() : e).join("")).join(" ");
    return <Text>{nameArray}</Text>;
  };
  
  return (
    <Pressable style={styles.itemLayout}> 
      <View>
        <Text>
          {listNames && capitaliser()}
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
})