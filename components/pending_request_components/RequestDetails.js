import { Pressable, StyleSheet, Text, View, Platform } from "react-native";
import capitaliser from "../functions/capitaliser";
import { supabase } from "../../supabase";
import { useState } from "react";

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
      <Text style={styles.header}> List name:</Text>
      <Text style={styles.subHeader}>{capitaliser(data.lists)}</Text>
      <Text style={styles.header}>List shared by:</Text>
      <Text style={styles.subHeader}>{data.sent_by}</Text>
      {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
      <View style={styles.buttonContainer}>
        <Pressable style={styles.buttons} onPress={() => handleAccept()}>
          <Text style={styles.buttonText}>Accept</Text>
        </Pressable>
        <Pressable style={styles.buttons} onPress={() => handleDecline()}>
          <Text style={styles.buttonText}>Decline</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // borderWidth: 3,
    // borderColor: "#B3BFB870",
    backgroundColor: "#B3BFB830",
    borderRadius: 10,
    width: "90%",
    padding: 10,
  },
  header: {
    color: "#034222",
    fontFamily: Platform.select({
      ios: "Avenir-Heavy",
      default: "serif",
    }),
    fontSize: 20,
    fontWeight: "400",
    marginTop: 5,
    textAlign: "center",
  },
  subHeader: {
    color: "#034222",
    fontFamily: Platform.select({
      ios: "Avenir-Heavy",
      default: "serif",
    }),
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 5,
    textAlign: "center",
  },
  buttonContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: 5,
    marginVertical: 5,
  },
  buttons: {
    backgroundColor: "#046835",
    width: "40%",
    padding: 10,
    borderRadius: 15,
  },
  buttonText: {
    fontFamily: Platform.select({
      ios: "Avenir-Heavy",
      default: "serif",
    }),
    color: "#F0F7F4",
    fontSize: 15,
    fontWeight: "700",
    textAlign: "center",
  },
  error: {
    color: "red",
    fontSize: 16,
    fontFamily: Platform.select({
      ios: "Avenir-Heavy",
      default: "serif",
    }),
    fontWeight: "700",
  },
});
