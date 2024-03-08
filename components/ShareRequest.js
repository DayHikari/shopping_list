import { StyleSheet, Text, View, Platform } from "react-native";
import { supabase } from "../supabase";
import { useEffect, useState } from "react";
import RequestDetails from "./pending_request_components/RequestDetails";

export default function ShareRequestPage({ email, setDisplayedPage, initialLoad, setInitialLoad }) {
  const [requestData, setRequestData] = useState(null);

  useEffect(() => {
    const checkRequests = async () => {
      const { data, error } = await supabase
        .from("users")
        .select("*, pending_requests(*)")
        .eq("email", email);
        // .from("pending_requests")
        // .select("*, lists(list_name), users(name)")
        // .eq("sent_to", email);
      console.log("data: ", data.pending_requests)
      console.log("users name: ", data[0].name)

      if (error) {
        console.error(`Error: ${error}`);
        setDisplayedPage("createdLists");
        return null;
      } else if (data[0].name === null) {
        setInitialLoad(false);
        setDisplayedPage("userInfo");
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
    <>
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
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    color: "#034222",
    fontSize: 25,
    fontWeight: "700",
    fontFamily: Platform.select({
      ios: "Avenir-Heavy",
      default: "serif",
    }),
    textAlign: "center",
  },
});
