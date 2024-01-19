import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function () {
  return (
    <SafeAreaView style={styles.banner}>
      <View style={styles.bannerContent}>
        <Text style={styles.bannerHeader}>Sunny Day</Text>
        <Text style={styles.bannerSubHeader}>Shopping List</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  banner: {
    backgroundColor: "#046835",
    alignItems: "center",
    height: "20%",
    width: "100%",
  },
  bannerContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  bannerHeader: {
    fontSize: 30,
    fontWeight: "800",
    color: "#FF8833",
    fontFamily: "serif",
  },
  bannerSubHeader: {
    fontSize: 30,
    fontWeight: "900",
    color: "#FF8833",
    fontFamily: "serif",
  }
});
