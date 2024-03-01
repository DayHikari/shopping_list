import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Platform
} from "react-native";
import capitaliser from "../functions/capitaliser";
import { supabase } from "../../supabase";

export default function EditListForm({ selectedList, email, setSelectedList, setListNames }) {
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
        return (
          <Pressable
            style={styles.shareButton}
            onPress={() => {
              fetchUsers();
            }}
          >
            <Text style={styles.shareButtonText}>
              Click to change list access.
            </Text>
          </Pressable>
        );
      case "data":
        return (
          <View style={styles.scrollContainer}>
            <Text style={styles.scrollContainerSubheader}>
              Select a user to unshare:
            </Text>
            <ScrollView>
              {sharedData.map((obj) => {
                return (
                  <Pressable
                    key={obj.email}
                    onPress={() => {
                      addToBeDeleted(obj.email);
                    }}
                    style={
                      toBeDeleted.includes(obj.email)
                        ? styles.emailButtonSelected
                        : styles.emailButtonUnselected
                    }
                  >
                    <Text style={styles.emailButtonText}>{obj.email}</Text>
                  </Pressable>
                );
              })}
            </ScrollView>
          </View>
        );
    }
  };

  const fetchUsers = async () => {
    const { data, error } = await supabase
      .from("user_table")
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
        .update({ "list_name": newName.toLocaleLowerCase().replace(" ", "_") })
        .eq("list_id", selectedList.list_id)
        .select("*");
        
        if (error) {
          setErrorMessage(`Error: ${error}`);
        } else {
          setListNames(prev => prev.map(obj => obj.list_id === selectedList.list_id ? {...obj, list_name: data[0].list_name} : obj));
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
      <Pressable style={styles.submit} onPress={() => {handleSubmit()}}>
        <Text style={styles.submitText}>Submit</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    width: "95%",
    backgroundColor: "#046835",
    display: "flex",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
  },
  subheaders: {
    fontSize: 20,
    fontFamily: Platform.select({
      ios: "Cochin",
      default: "serif",
    }),
    color: "#FF8833",
    alignSelf: "flex-start",
    marginLeft: "5%",
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
  shareButton: {
    borderWidth: 2,
    borderColor: "#FF8833",
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginBottom: 5,
  },
  shareButtonText: {
    color: "#FF8833",
    fontFamily: Platform.select({
      ios: "Cochin",
      default: "serif",
    }),
    fontSize: 18,
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
  scrollContainer: {
    maxHeight: 180,
    width: "90%",
  },
  scrollContainerSubheader: {
    color: "#FF8833",
    fontFamily: Platform.select({
      ios: "Cochin",
      default: "serif",
    }),
    fontSize: 18,
  },
  emailButtonUnselected: {
    borderWidth: 3,
    borderColor: "#FF8833",
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  emailButtonSelected: {
    borderWidth: 3,
    borderColor: "#CDEEFD",
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  emailButtonText: {
    color: "#FF8833",
    fontFamily: Platform.select({
      ios: "Cochin",
      default: "serif",
    }),
    fontSize: 18,
    alignSelf: "center",
  },
});
