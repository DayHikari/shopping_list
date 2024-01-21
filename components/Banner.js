import { Platform, StyleSheet, Text, View } from "react-native";
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
    justifyContent: "flex-end",
    height: "17%",
  },
  bannerContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "spave-evenly",
  },
  bannerHeader: {
    fontSize: 30,
    fontWeight: "800",
    color: "#FF8833",
    fontFamily: Platform.select({
      ios: "Cochin",
      default: "serif"
    }),
  },
  bannerSubHeader: {
    fontSize: 35,
    fontWeight: "900",
    color: "#FF8833",
    fontFamily: Platform.select({
      ios: "Cochin",
      default: "serif"
    }),
  }
});
