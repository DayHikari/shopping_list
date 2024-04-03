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
    backgroundColor: "#034222",
    alignItems: "center",
    justifyContent: "center",
    height: Platform.select({
      android: "21%",
      ios: "21%",
      default: "12%"
    }),
    width: Platform.select({
      ios: "100%",
      android: "100%",
      default: "100vw"
    }),
    alignSelf: "center",
  },
  bannerContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 340,
  },
  bannerHeader: {
    fontSize: 30,
    fontWeight: "800",
    color: "#FF8833",
    fontFamily: Platform.select({
      ios: "Avenir-Heavy",
      default: "serif"
    }),
  },
  bannerSubHeader: {
    fontSize: 35,
    fontWeight: "900",
    color: "#FF8833",
    fontFamily: Platform.select({
      ios: "Avenir-Heavy",
      default: "serif"
    }),
  }
});
