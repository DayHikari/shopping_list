import { StyleSheet, Text, View, Platform } from "react-native";
import { supabase } from "../supabase";
import { useEffect, useState } from "react";
import RequestDetails from "./pending_request_components/RequestDetails";

export default function ShareRequestPage({
  email,
  setDisplayedPage,
  initialLoad,
  setInitialLoad,
}) {
  const [requestData, setRequestData] = useState(null);

  useEffect(() => {
    const checkRequests = async () => {
      const { data: users, error } = await supabase
        .from("users")
        .select("*")
        .eq("email", email);

      if (error) {
        console.error(`${error}`);
      } else if (users.length === 0) {
        return setDisplayedPage("userInfo");
      };
      
      const { data: requests, requestError } = await supabase
        .from("pending_requests")
        .select("*, lists(list_name)")
        .eq("sent_to", email);


      if (requestError) {
        console.error(`Error: ${requestError}`);
        setDisplayedPage("createdLists");
        return null;
      } else if (requests.length === 0 && initialLoad === true) {
        setInitialLoad(false);
        setDisplayedPage("createdLists");
        return null;
      }

      requests.length !== 0 && setRequestData(requests);
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
