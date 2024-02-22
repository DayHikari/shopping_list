import { StyleSheet, Text, View } from "react-native";
import { supabase } from "../supabase";
import { useEffect, useState } from "react";
import RequestDetails from "./pending_request_components/RequestDetails";

export default function ShareRequestPage({ email, setDisplayedPage }) {
  const [requestData, setRequestData] = useState(null);

  useEffect(() => {
    const checkRequests = async () => {
      const { data, error } = await supabase
        .from("pending_requests")
        .select("*, lists(list_name)")
        .eq("sent_to", email);

      if (error) {
        console.error(`Error: ${error}`);
        setDisplayedPage("createdLists");
        return null;
      } else if (data.length === 0) {
        setDisplayedPage("createdLists");
        return null;
      }

      setRequestData(data);
    };

    checkRequests();
  }, []);

  return (
    <View style={styles.container}>
      {requestData && (
        <Text style={styles.header}>{"You have pending request(s)!"}</Text>
      )}
      {requestData && requestData.map(data => {
        return (
          <RequestDetails key={data.id} data={data} setRequestData={setRequestData}/>
        )
      })}
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
    textAlign: "center",
  },
});
