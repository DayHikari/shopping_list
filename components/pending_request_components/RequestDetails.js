import { Pressable, StyleSheet, Text, View } from "react-native";
import capitaliser from "../functions/capitaliser";
import { supabase } from "../../supabase";
import { useState } from "react";
import baseStyles from "../../global_styles/baseStyle";

export default function RequestDetails({ data, setRequestData }) {
  const [errorMessage, setErrorMessage] = useState(null);

  const handleAccept = async () => {
    const { insertData, error } = await supabase
      .from("user_lists")
      .insert([{ email: data.sent_to, list_id: data.list_id }])
      .select();

    if (error) {
      return setErrorMessage(`Error: ${error}. Please try again later.`);
    }

    const { deleteError } = await supabase
      .from("pending_requests")
      .delete()
      .eq("id", data.id);
    
      if (deleteError) {
        return setErrorMessage(`Error: ${deleteError}. List added successfully.`);
      };

    setRequestData(prev => prev.filter(obj => obj.id !== data.id));
  };

  const handleDecline = async () => {
    const { deleteError } = await supabase
    .from("pending_requests")
    .delete()
    .eq("id", data.id);
  
    if (deleteError) {
      return setErrorMessage(`Error: ${deleteError}. Please try again later.`);
    };

  setRequestData(prev => prev.filter(obj => obj.id !== data.id));
  }

  return (
    <View style={styles.container}>
      <Text style={baseStyles.pageSubHeaderThin}> List name:</Text>
      <Text style={baseStyles.pageSubHeader}>{capitaliser(data.lists)}</Text>
      <Text style={baseStyles.pageSubHeaderThin}>List shared by:</Text>
      <Text style={baseStyles.pageSubHeader}>{data.sent_by}</Text>
      {errorMessage && <Text style={baseStyles.error}>{errorMessage}</Text>}
      <View style={baseStyles.buttonSection}>
        <Pressable style={baseStyles.buttons} onPress={() => handleAccept()}>
          <Text style={baseStyles.buttonText}>Accept</Text>
        </Pressable>
        <Pressable style={baseStyles.buttons} onPress={() => handleDecline()}>
          <Text style={baseStyles.buttonText}>Decline</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#B3BFB830",
    borderRadius: 10,
    width: "90%",
    padding: 10,
  },
});