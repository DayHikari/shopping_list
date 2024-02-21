import { StyleSheet, Text, View } from "react-native";
import { supabase } from "../supabase";
import { useEffect, useState } from "react";

export default function ShareRequestPage({ email, setDisplayedPage }) {
  const [requestData, setRequestData] = useState(null);

  useEffect(() => {
    const checkRequests = async () => {
      const { data, error } = await supabase
        .from("pending_requests")
        .select("*")
        .eq("sent_to", email);

        console.log("Data: ", data);
        console.log("Error: ", error);

      if (error) {
        console.error(`Error: ${error}`);
        setDisplayedPage("createdLists");
        return null;
      } else if (data.length === 0) {
        setDisplayedPage("createdLists");
        return null;
      } else {
        setRequestData(data)
      };
    };

    checkRequests();
  }, []);

  return (
    <View style={styles.container}>
      {requestData && (
        <Text style={styles.header}>{"You have pending request(s)!"}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "74%",
    display: "flex",
    alignItems: "center",
  },
  header: {
    color: "#FF8833",
    fontSize: 25,
    fontWeight: "700",
    fontFamily: Platform.select({
      ios: "Cochin",
      default: "serif",
    }),
    marginVertical: 10,
    textAlign: "center"
  },
});
