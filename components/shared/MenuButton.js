import { Pressable, StyleSheet, View } from "react-native";

export default function MenuButton({setOptionSelected}) {
  return (
    <Pressable style={styles.menu} onPress={() => {setOptionSelected(prev => !prev)}}>
      <View style={styles.holder}>
        <View style={styles.dash} />
        <View style={styles.dash} />
        <View style={styles.dash} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  menu: {
    height: "12%",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  holder: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  dash: {
    marginVertical: 5,
    borderBottomColor: "#046835",
    borderBottomWidth: 3,
    width: 75,
  },
});
