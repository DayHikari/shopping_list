import { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Platform,
} from "react-native";
import { supabase } from "../../supabase";

export default function AddList({ setListNames, setOptionSelected, email }) {
  const [newListName, setNewListName] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);

  const handleSubmit = async () => {
    if (newListName === "") {
      return setErrorMessage("Please enter a list name.");
    }

    const { data, error } = await supabase
      .from("lists")
      .insert([
        {
          list_name: newListName.toLocaleLowerCase().replace(" ", "_"),
          created_by: email,
        },
      ])
      .select();

    if (error) {
      setErrorMessage(`Error: ${error}`);
    } else {
      const { userData, userError } = await supabase
        .from("user_lists")
        .insert([
          {
            email: email,
            list_id: data[0].list_id,
          },
        ])
        .select();

      setListNames((prev) => [...prev, data[0]]);

      setNewListName("");

      if (userError) {
        setErrorMessage(`Error: ${userError}`);
      } else {
        setErrorMessage(false);
        setOptionSelected(false);
      };
    };
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
      <Text style={styles.header}>Add new list</Text>
      <Text style={styles.subHeaders}>List name:</Text>
      <TextInput
        style={styles.textInputs}
        placeholder="Enter list name"
        onChangeText={(text) => {
          setNewListName(text);
        }}
        value={newListName}
      />
      {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
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
    maxHeight: 300,
    backgroundColor: "#034222",
    display: "flex",
    alignItems: "center",
    padding: 10,
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
      ios: "Avenir-Heavy",
      default: "notoserif",
    }),
    color: "#F0F7F4",
    fontWeight: "700",
    marginBottom: 10,
  },
  subHeaders: {
    fontSize: 17,
    fontFamily: Platform.select({
      ios: "Avenir-Heavy",
      default: "notoserif",
    }),
    color: "#B3BFB8",
    fontWeight: "700",
    alignSelf: "flex-start",
    paddingLeft: 20,
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
    color: "#046835",
    fontFamily: Platform.select({
      ios: "Avenir-Heavy",
      default: "notoserif",
    }),
    fontWeight: "700",
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
      ios: "Avenir-Heavy",
      default: "notoserif",
    }),
    color: "#034222",
    fontWeight: "700",
  },
  error: {
    color: "red",
    fontSize: 16,
    fontFamily: Platform.select({
      ios: "Avenir-Heavy",
      default: "notoserif",
    }),
    fontWeight: "700",
  },
});
