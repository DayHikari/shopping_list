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
    justifyContent: "center",
    height: "17%",
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
  },
  bannerHeader: {
    fontSize: 30,
    fontWeight: "800",
    color: "#FF8833",
    fontFamily: Platform.select({
      ios: "Cochin",
      default: "serif"
    }),
    marginBottom: 3,
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
