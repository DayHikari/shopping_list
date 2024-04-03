import { useState } from "react";
import { Text, View, Pressable } from "react-native";
import { supabase } from "../../supabase";
import baseStyles from "../../global_styles/baseStyle";

export default function Logout ({ setSettingChoice, handleLogOut }) {
  const [errorMessage, setErrorMessage] = useState(null);

  const handleConfirm = async () => {
    const {error} = await supabase.auth.signOut();

    if (error) {
      setErrorMessage("Error logging out. Please try again later");
    };

    handleLogOut();
  }
  return (
    <>
      <Text style={baseStyles.pageHeader}>Logout</Text>
      <Text style={baseStyles.subHeaders}>Are you sure you wish to logout?</Text>
      <View style={baseStyles.buttonSection}>
      {errorMessage && (<Text style={baseStyles.error}>{errorMessage}</Text>)}
      <Pressable
          style={baseStyles.buttons}
          onPress={() => {
            setSettingChoice("options");
          }}
        >
          <Text style={baseStyles.buttonText}>Cancel</Text>
        </Pressable>
        <Pressable style={baseStyles.buttons} onPress={() => {handleConfirm()}}>
          <Text style={baseStyles.buttonText}>Confirm</Text>
        </Pressable>
      </View>
    </>
  );
};