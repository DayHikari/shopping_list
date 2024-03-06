import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Platform } from "react-native";
import Banner from "./components/Banner";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Navigation from "./components/Navigation";
import ListSection from "./components/ListSection";
import { useState } from "react";
import LoginPage from "./components/LoginPage";
import CreatedListsPage from "./components/CreatedListsPage";
import ShareRequestPage from "./components/ShareRequest";
import Settings from "./components/Settings";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [displayedPage, setDisplayedPage] = useState(null);
  const [selectedList, setSelectedList] = useState(null);
  const [initialLoad, setInitialLoad] = useState(true);

  const handleListSelect = (listName) => {
    setSelectedList(listName);
    setDisplayedPage("listSection");
  };

  const handleLogOut = () => {
    setDisplayedPage(null);
    setInitialLoad(true);
    setSelectedList(null);
    setUser(null);
    setLoggedIn(false);
  }

  const display = () => {
    switch (displayedPage) {
      case "listSection":
        return (
          <ListSection email={user.user.email} selectedList={selectedList} />
        );
      case "createdLists":
        return (
          <CreatedListsPage
            email={user.user.email}
            handleListSelect={handleListSelect}
          />
        );
      case "shareRequest":
        return (
          <ShareRequestPage
            email={user.user.email}
            setDisplayedPage={setDisplayedPage}
            initialLoad={initialLoad}
            setInitialLoad={setInitialLoad}
          />
        );
      case "settings":
        return <Settings email={user.user.email} setUser={setUser} handleLogOut={handleLogOut}/>;
      default:
        return null;
    }
  };

  return (
    <SafeAreaProvider>
      <View style={styles.viewContainer}>
        <View style={styles.appContainer}>
          <Banner />
          <StatusBar style="auto" />
          {!loggedIn && (
            <LoginPage
              setUser={setUser}
              setLoggedIn={setLoggedIn}
              setDisplayedPage={setDisplayedPage}
            />
          )}
          <View style={styles.bodyContainer}>
            {display()}
          </View>
          {loggedIn && <Navigation setDisplayedPage={setDisplayedPage} />}
        </View>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    backgroundColor: "#F0F7F4",
    maxHeight: "100vh",
  },
  appContainer: {
    width: "100%",
    maxWidth: 500,
    height: "100%",
    alignSelf: "center",
  },
  bodyContainer: {
    height: Platform.select({
      android: "70%",
      ios: "70%",
      default: "78%"
    }),
    display: "flex",
    alignItems: "center",
    paddingTop: 10,
    paddingHorizontal: 15,
  },
});
