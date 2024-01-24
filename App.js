import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Banner from "./components/Banner";
import { SafeAreaProvider  } from "react-native-safe-area-context";
import Navigation from "./components/Navigation";
import ListSection from "./components/ListSection";
import { RealmProvider } from "@realm/react";

export default function App() {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Banner />
        <ListSection />
        <Navigation/>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#CDEEFD",
  },
  text: {
    color: "#046835",
    height: '72%'
  },
});
