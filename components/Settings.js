import { useState } from "react";
import { View, StyleSheet, Text, Platform } from "react-native";
import SettingOptions from "./setting_components/SettingOptions";
import ChangePassword from "./setting_components/ChangePassword";
import Logout from "./setting_components/Logout";

export default function Settings({ email, setUser, handleLogOut }) {
  const [settingChoice, setSettingChoice] = useState("options");

  const displaySettings = () => {
    switch (settingChoice) {
      case "options":
        return <SettingOptions setSettingChoice={setSettingChoice} />;
      case "password":
        return (
          <ChangePassword
            setSettingChoice={setSettingChoice}
          />
        );
      case "logout":
        return (
          <Logout
            setSettingChoice={setSettingChoice}
            handleLogOut={handleLogOut}
          />
        );
    }
  };
  
  return (
    <>
      {displaySettings()}
      <View style={styles.footer}>
        <Text style={styles.text}>Special thanks to icon8.com for the icons/images used in this app.</Text>
        <Text style={styles.text}>{`© ${new Date().getFullYear()} - All rights reserved`}</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  footer: {
    marginTop: 50,
  },
  text: {
    textAlign: "center",
    fontFamily: Platform.select({
      ios: "Avenir-Heavy",
      default: "notoserif",
    }),
    color: "#034222"
  }
});
