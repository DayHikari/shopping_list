import { Pressable, Text } from "react-native";
import baseStyles from "../../global_styles/baseStyle";

export default function SettingOptions ({ setSettingChoice }) {
  return (
    <>
      <Text style={baseStyles.pageHeader}>Settings</Text>
      <Pressable style={baseStyles.buttons} onPress={() => setSettingChoice("password")}>
        <Text style={baseStyles.buttonText}>Change Password</Text>
      </Pressable>
      <Pressable style={baseStyles.buttons} onPress={() => setSettingChoice("logout")}>
        <Text style={baseStyles.buttonText}>Logout</Text>
      </Pressable>
    </>
  );
};