import { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { supabase } from "../../supabase";
import baseStyles from "../../global_styles/baseStyle";

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
    <View style={baseStyles.form}>
      <Text style={baseStyles.formHeader}>Add new list</Text>
      <Text style={baseStyles.formLabels}>List name:</Text>
      <TextInput
        style={baseStyles.textInputs}
        placeholder="Enter list name"
        onChangeText={(text) => {
          setNewListName(text);
        }}
        value={newListName}
      />
      {errorMessage && <Text style={baseStyles.error}>{errorMessage}</Text>}
      <Pressable
        style={baseStyles.formButtons}
        onPress={() => {
          handleSubmit();
        }}
      >
        <Text style={baseStyles.formButtonText}>Submit</Text>
      </Pressable>
    </View>
  );
};