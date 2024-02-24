import { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Platform,
  TextInput,
} from "react-native";
import ListOptions from "./ListOptions";
import capitaliser from "../functions/capitaliser";
import { supabase } from "../../supabase";

export default function ShareList({
  listNames,
  setOptionSelected,
  email,
}) {
  const [selectedList, setSelectedList] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [shareEmail, setShareEmail] = useState("");
  const [confirmation, setConfirmation] = useState(null);

  const handleSubmit = async () => {
    if (shareEmail === "") {
      return setErrorMessage("Please enter a email address.");
    } else if (!confirmation) {
      setErrorMessage(null);
      return setConfirmation("Are you sure you wish to share this list?");
    }

    const { data, error } = await supabase
      .from("users")
      .select("email")
      .eq("email", shareEmail.toLocaleLowerCase());

    if (error) {
      setConfirmation(null);
      return setErrorMessage(`Error: ${error}`);
    } else if (data.length === 0) {
      setConfirmation(null);
      return setErrorMessage(
        "No user with email address exists. Confirm and try again."
      );
    }

    const { sharedData, sharedDataError } = await supabase
      .from("pending_requests")
      .insert([
        {
          list_id: selectedList.list_id,
          sent_by: email,
          sent_to: data[0].email,
        },
      ])
      .select();
    
    if (sharedDataError) {
      return setErrorMessage(`Error: ${sharedDataError}`)
    };

    setConfirmation(null);
    setErrorMessage(null);
    setSelectedList(null);
    setShareEmail("");
    setOptionSelected(false);
  };

  return (
    <View style={styles.form}>
      <Pressable
        style={styles.close}
        onPress={() => {
          setOptionSelected(false);
        }}
      >
        <Text style={styles.closeText}>X</Text>
      </Pressable>
      <Text style={styles.header}>
        {!selectedList ? "Choose a list to share:" : "Share the list."}
      </Text>
      {!selectedList ? (
        <ListOptions listNames={listNames} setSelectedList={setSelectedList} />
      ) : (
        <>
          <Text style={styles.selected}>
            Selected list: {capitaliser(selectedList)}
          </Text>
          <Text style={styles.subheader}>
            Enter an email address to share with:
          </Text>
          <TextInput
            placeholder="Enter email address"
            style={styles.textInputs}
            value={shareEmail}
            onChangeText={(text) => setShareEmail(text)}
            inputMode="email"
            autoComplete="email"
          />
        </>
      )}
      {confirmation && <Text style={styles.error}>{confirmation}</Text>}
      {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
      {selectedList && (
        <Pressable style={styles.confirm} onPress={() => handleSubmit()}>
          <Text style={styles.confirmText}>Confirm</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    width: "95%",
    height: "fit",
    backgroundColor: "#046835",
    display: "flex",
    alignItems: "center",
    padding: 5,
    borderRadius: 10,
  },
  close: {
    position: "absolute",
    top: "2%",
    right: "5%",
  },
  closeText: {
    fontSize: 17,
    color: "#FF8833",
    fontWeight: "700",
  },
  header: {
    fontSize: 25,
    fontFamily: Platform.select({
      ios: "Cochin",
      default: "serif",
    }),
    color: "#FF8833",
    marginBottom: 10,
  },
  selected: {
    color: "#FF8833",
    fontSize: 22,
    fontFamily: Platform.select({
      ios: "Cochin",
      default: "serif",
    }),
    textAlign: "center",
  },
  subheader: {
    color: "#FF8833",
    fontSize: 16,
    fontFamily: Platform.select({
      ios: "Cochin",
      default: "serif",
    }),
    textAlign: "center",
    marginTop: 10,
    marginBottom: 3,
  },
  textInputs: {
    backgroundColor: "#CDEEFD",
    width: "90%",
    height: 40,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#FF8833",
    padding: 10,
    marginBottom: 10,
    marginTop: 2,
    fontSize: 15,
    color: "#046835",
    fontFamily: Platform.select({
      ios: "Cochin",
      default: "serif",
    }),
    fontWeight: "700",
  },
  confirm: {
    borderRadius: 10,
    backgroundColor: "#FF8833",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    margin: 10,
  },
  confirmText: {
    fontSize: 18,
    fontFamily: Platform.select({
      ios: "Cochin",
      default: "serif",
    }),
    color: "#046835",
    fontWeight: "700",
  },
  error: {
    color: "red",
    fontSize: 16,
    fontFamily: Platform.select({
      ios: "Cochin",
      default: "serif",
    }),
    fontWeight: "700",
  },
});