import {
  Alert,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function ({ setDisplayedPage }) {
  return (
    <View style={styles.container}>
      <View style={styles.navigation}>
        <Pressable
          style={styles.buttons}
          onPress={() => {
            setDisplayedPage("shareRequest");
          }}
        >
          <Text style={styles.buttonText}>Requests</Text>
        </Pressable>
        <Pressable
          style={styles.buttons}
          onPress={() => {
            setDisplayedPage("createdLists");
          }}
        >
          <Text style={styles.buttonText}>Lists</Text>
        </Pressable>
        <Pressable
          style={styles.buttons}
          onPress={() => {
            setDisplayedPage("settings");
          }}
        >
          <Text style={styles.buttonText}>Settings</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#034222",
    width: Platform.select({
      ios: "100%",
      android: "100%",
      default: "100vw",
    }),
    alignSelf: "center",
    // height: "7%",
    height: Platform.select({
      android: "9%",
      ios: "9%",
      default: "7%"
    }),
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    
  },
  navigation: {
    width: Platform.select({
      ios: "100%",
      android: "100%",
      default: "30vw",
    }),
    minWidth: 350,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  buttons: {
    padding: 5,
    width: "25%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "#06964d",
    borderRadius: 10,
  },
  buttonText: {
    fontFamily: Platform.select({
      ios: "Avenir-Heavy",
      default: "serif",
    }),
    fontSize: Platform.select({
      android: 16,
      ios: 16,
      default: "2vh"
    }),
    color: "#F0F7F4",
  },
});
