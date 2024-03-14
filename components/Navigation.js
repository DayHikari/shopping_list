import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import baseStyles from "../global_styles/baseStyle";

export default function ({ setDisplayedPage }) {
  return (
    <View style={styles.container}>
      <View style={styles.navigation}>
        <Pressable
          style={baseStyles.buttons}
          onPress={() => {
            setDisplayedPage("shareRequest");
          }}
        >
          <Text style={baseStyles.buttonText}>Requests</Text>
        </Pressable>
        <Pressable
          style={baseStyles.buttons}
          onPress={() => {
            setDisplayedPage("createdLists");
          }}
        >
          <Text style={baseStyles.buttonText}>Lists</Text>
        </Pressable>
        <Pressable
          style={baseStyles.buttons}
          onPress={() => {
            setDisplayedPage("settings");
          }}
        >
          <Text style={baseStyles.buttonText}>Settings</Text>
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
    minWidth: 340,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingHorizontal: 10
  },
});
