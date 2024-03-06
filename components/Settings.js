import { useState } from "react";
import { View, StyleSheet, Text, Platform } from "react-native";
import SettingOptions from "./setting_components/SettingOptions";
import ChangePassword from "./setting_components/ChangePassword";
import Logout from "./setting_components/Logout";

export default function Settings({ email, setUser, handleLogOut }) {
  const [settingChoice, setSettingChoice] = useState("options")
  const displaySettings = () =>{
    switch (settingChoice) {
      case "options":
        return <SettingOptions setSettingChoice={setSettingChoice} />;
      case "password":
        return <ChangePassword setSettingChoice={setSettingChoice} setUser={setUser}/>;
      case "logout":
        return <Logout setSettingChoice={setSettingChoice} handleLogOut={handleLogOut}/>
    }
  }
  return (
    <>
      {displaySettings()}
    </>
  );
}

const styles = StyleSheet.create({

});
