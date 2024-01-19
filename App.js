import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Banner from "./components/Banner";
import { SafeAreaProvider  } from "react-native-safe-area-context";
import Navigation from "./components/Navigation";

export default function App() {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Banner />
        <Text style={styles.text}>Started my first React Native app!</Text>
        <Navigation/>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#CDEEFD",
    // alignItems: "center",
    // justifyContent: "center",
  },
  text: {
    color: "#046835",
    height: '72%'
  },
});
