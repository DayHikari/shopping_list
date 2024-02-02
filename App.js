import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Banner from "./components/Banner";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Navigation from "./components/Navigation";
import ListSection from "./components/ListSection";
import { useState } from "react";
import LoginPage from "./components/LoginPage";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [displayedPage, setDisplayedPage] = useState(null)
  
  const display = () => {
    switch (displayedPage) {
      case "listSection":
        return <ListSection />;
      default:
        return;
    }
  };

  return (
    <SafeAreaProvider>
      <View style={styles.viewContainer}>
        <View style={styles.container}>
          <Banner />
          <StatusBar style="auto" />
          {!loggedIn && (
            <LoginPage setUser={setUser} setLoggedIn={setLoggedIn} setDisplayedPage={setDisplayedPage} />
          )}
          {display()}
          {loggedIn && <Navigation />}
        </View>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    backgroundColor: "#CDEEFD",
  },
  container: {
    width: "100vw",
    maxWidth: 500,
    height: "100vh",
    alignSelf: "center",
  },
  text: {
    color: "#046835",
    height: "72%",
  },
});
