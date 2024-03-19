import { useState } from "react";
import {
  Text,
  TextInput,
  View,
  Pressable,
} from "react-native";
import { supabase } from "../../supabase";
import baseStyles from "../../global_styles/baseStyle";

export default function ChangePassword({ setSettingChoice }) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [confirmation, setConfirmation] = useState(null);

  const handleSubmit = async () => {
    setErrorMessage(null);

    if (!newPassword.trim()) {
      return setErrorMessage("Passwords enter a new password.")
    } else if (newPassword.length < 8) {
      return setErrorMessage("Password must be 8 characters long");
    } else if (!confirmPassword.trim()) {
      return setErrorMessage("Please confirm your new password.")
    } else if (newPassword !== confirmPassword) {
      return setErrorMessage("Passwords do not match.")
    };

    const {data, error} = await supabase.auth.updateUser({
      password: newPassword
    });

    if (error) {
      return setErrorMessage(`${error}`)
    };

    setNewPassword("");
    setConfirmPassword("");
    setConfirmation("Password successfully updated.");
  };

  return (
    <>
      <Text style={baseStyles.pageHeader}>Change Password</Text>
      <Text style={baseStyles.pageLabels}>New password</Text>
      <TextInput
        style={baseStyles.textInputs}
        placeholder="Enter new password"
        secureTextEntry={true}
        onChangeText={(text) => {
          setNewPassword(text);
        }}
        value={newPassword}
      />
      <Text style={baseStyles.pageLabels}>Confirm password</Text>
      <TextInput
        style={baseStyles.textInputs}
        placeholder="Confirm new password"
        secureTextEntry={true}
        onChangeText={(text) => {
          setConfirmPassword(text);
        }}
        value={confirmPassword}
      />
      {errorMessage && (<Text style={baseStyles.error}>{errorMessage}</Text>)}
      {confirmation && (<Text style={baseStyles.confirmation}>{confirmation}</Text>)}
      <View style={baseStyles.buttonSection}>
        <Pressable
          style={baseStyles.buttons}
          onPress={() => {
            setSettingChoice("options");
          }}
        >
          <Text style={baseStyles.buttonText}>Cancel</Text>
        </Pressable>
        <Pressable style={baseStyles.buttons} onPress={() => {handleSubmit()}}>
          <Text style={baseStyles.buttonText}>Submit</Text>
        </Pressable>
      </View>
    </>
  );
};