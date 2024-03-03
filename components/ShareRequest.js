import { StyleSheet, Text, View, Platform } from "react-native";
import { supabase } from "../supabase";
import { useEffect, useState } from "react";
import RequestDetails from "./pending_request_components/RequestDetails";

export default function ShareRequestPage({ email, setDisplayedPage, initialLoad, setInitialLoad }) {
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
      } else if (data.length === 0 && initialLoad === true) {
        setInitialLoad(false);
        setDisplayedPage("createdLists");
        return null;
      }

      data.length !== 0 && setRequestData(data);
    };

    checkRequests();
  }, []);

  useEffect(() => {
    if (requestData) {
      requestData.length === 0 && setRequestData(null);
    }
  }, [requestData]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        {!requestData
          ? "No new requests at the moment!"
          : requestData.length > 1
          ? `You have ${requestData.length} requests!`
          : "You have 1 new request!"}
      </Text>
      {requestData &&
        requestData.map((data) => {
          return (
            <RequestDetails
              key={data.id}
              data={data}
              setRequestData={setRequestData}
            />
          );
        })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "70%",
    padding: 5,
    display: "flex",
    alignItems: "center",
  },
  header: {
    color: "#034222",
    fontSize: 25,
    fontWeight: "700",
    fontFamily: Platform.select({
      ios: "Cochin",
      default: "serif",
    }),
    marginVertical: 15,
    textAlign: "center",
  },
});
