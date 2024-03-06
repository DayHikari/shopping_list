import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Platform,
} from "react-native";
import capitaliser from "../functions/capitaliser";
import { supabase } from "../../supabase";
import ListAccessButton from "./edit_list_components/ListAccessButton";
import SharedUserList from "./edit_list_components/SharedUserList";

export default function EditListForm({
  selectedList,
  email,
  setSelectedList,
  setListNames,
}) {
  const [newName, setNewName] = useState("");
  const [sharedState, setSharedState] = useState(
    selectedList.created_by === email
  );
  const [sharedData, setSharedData] = useState(null);
  const [toBeDeleted, setToBeDeleted] = useState([]);
  const [confirmation, setConfirmation] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const changeSharingOptions = () => {
    switch (sharedState) {
      case false:
        return;
      case true:
        return <ListAccessButton fetchUsers={fetchUsers} />;
      case "data":
        return <SharedUserList sharedData={sharedData} addToBeDeleted={addToBeDeleted} toBeDeleted={toBeDeleted}/>;
    }
  };

  const fetchUsers = async () => {
    const { data, error } = await supabase
      .from("user_lists")
      .select("email")
      .eq("list_id", selectedList.list_id)
      .neq("email", email);

    if (error) {
      setErrorMessage(`Error: ${error}`);
    } else {
      setSharedData(data);
      setSharedState("data");
    }
  };

  const addToBeDeleted = async (userEmail) => {
    toBeDeleted.includes(userEmail)
      ? setToBeDeleted((prev) => prev.filter((email) => email !== userEmail))
      : setToBeDeleted((prev) => [...prev, userEmail]);
  };

  const handleSubmit = async () => {
    if (!confirmation) {
      setConfirmation("Please confirm change");
    } else {
      const { data, error } = await supabase
        .from("lists")
        .update({ list_name: newName.toLocaleLowerCase().replace(" ", "_") })
        .eq("list_id", selectedList.list_id)
        .select("*");

      if (error) {
        setErrorMessage(`Error: ${error}`);
      } else {
        setListNames((prev) =>
          prev.map((obj) =>
            obj.list_id === selectedList.list_id
              ? { ...obj, list_name: data[0].list_name }
              : obj
          )
        );
        setSelectedList(null);
      }
    }
  };

  return (
    <View style={styles.form}>
      <Text style={styles.subheaders}>Change name:</Text>
      <TextInput
        style={styles.textInputs}
        placeholder={capitaliser(selectedList)}
        onChangeText={(text) => {
          setNewName(text);
        }}
        value={newName}
      />
      {changeSharingOptions()}
      {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
      {confirmation && <Text style={styles.error}>{confirmation}</Text>}
      <Pressable
        style={styles.submit}
        onPress={() => {
          handleSubmit();
        }}
      >
        <Text style={styles.submitText}>Submit</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    width: "100%",
    backgroundColor: "#034222",
    display: "flex",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
  },
  subheaders: {
    fontSize: 20,
    fontFamily: Platform.select({
      ios: "Cochin",
      default: "notoserif",
    }),
    color: "#B3BFB8",
    alignSelf: "flex-start",
    marginLeft: "5%",
  },
  textInputs: {
    backgroundColor: "#F0F7F4",
    width: "90%",
    height: 40,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#B3BFB8",
    padding: 10,
    marginBottom: 10,
    marginTop: 2,
    fontSize: 15,
    color: "#034222",
    fontFamily: Platform.select({
      ios: "Cochin",
      default: "notoserif",
    }),
    fontWeight: "700",
  },
  error: {
    color: "red",
    fontSize: 16,
    fontFamily: Platform.select({
      ios: "Cochin",
      default: "notoserif",
    }),
    fontWeight: "700",
    textAlign: "center",
  },
  submit: {
    borderRadius: 10,
    backgroundColor: "#FF8833",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    margin: 10,
  },
  submitText: {
    fontSize: 17,
    fontFamily: Platform.select({
      ios: "Cochin",
      default: "notoserif",
    }),
    color: "#034222",
    fontWeight: "700",
  },
});
