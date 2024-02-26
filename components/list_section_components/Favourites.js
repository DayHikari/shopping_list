import { Text, View, StyleSheet, ScrollView } from "react-native";

export default function Favourites () {
  return (
    <View style={styles.form}>
      <Text style={styles.header}>Favourites List</Text>
      <ScrollView>
        
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    width: "95%",
    height: 280,
    backgroundColor: "#034222",
    display: "flex",
    alignItems: "center",
    padding: 5,
    borderRadius: 10,
  },
  header: {
    fontSize: 25,
    fontFamily: Platform.select({
      ios: "Cochin",
      default: "serif",
    }),
    color: "#FF8833",
    fontWeight: "700",
    marginBottom: 10,
  },
});