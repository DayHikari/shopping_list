import { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  TextInput,
} from "react-native";
import ShareListOptions from "./ShareListOptions";
import capitaliser from "../functions/capitaliser";
import { supabase } from "../../supabase";
import baseStyles from "../../global_styles/baseStyle";

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
    <View style={baseStyles.form}>
      <Pressable
        style={styles.close}
        onPress={() => {
          setOptionSelected(false);
        }}
      >
        <Text style={styles.closeText}>X</Text>
      </Pressable>
      <Text style={baseStyles.formHeader}>
        {!selectedList ? "Choose a list to share:" : "Share the list."}
      </Text>
      {!selectedList ? (
        <ShareListOptions listNames={listNames} setSelectedList={setSelectedList} />
      ) : (
        <>
          <Text style={baseStyles.formSubHeader}>
            Selected list: {capitaliser(selectedList)}
          </Text>
          <Text style={baseStyles.formLabels}>
            Enter an email address to share with:
          </Text>
          <TextInput
            placeholder="Enter email address"
            style={baseStyles.textInputs}
            value={shareEmail}
            onChangeText={(text) => setShareEmail(text)}
            inputMode="email"
            autoComplete="email"
          />
        </>
      )}
      {confirmation && <Text style={baseStyles.confirmation}>{confirmation}</Text>}
      {errorMessage && <Text style={baseStyles.error}>{errorMessage}</Text>}
      {selectedList && (
        <Pressable style={baseStyles.formButtons} onPress={() => handleSubmit()}>
          <Text style={baseStyles.formButtonText}>Confirm</Text>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  close: {
    position: "absolute",
    top: "2%",
    right: "5%",
  },
  closeText: {
    fontSize: 17,
    color: "#B3BFB8",
    fontWeight: "700",
  },
});
