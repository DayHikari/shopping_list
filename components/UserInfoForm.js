import { useState } from "react";
import { Text, TextInput, Pressable } from "react-native";
import { supabase } from "../supabase";
import baseStyles from "../global_styles/baseStyle";

export default function UserInfoForm({ email, setDisplayedPage }) {
  const [usersName, setUsersName] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async () => {
    if (usersName === "") {
      return setErrorMessage("Please enter your full name.");
    }

    const capitalisedName = usersName
      .split(" ")
      .map((elem) =>
        elem
          .split("")
          .map((e, i) => (i === 0 ? e.toUpperCase() : e))
          .join("")
      )
      .join(" ");

    const { data, error } = await supabase
      .from("users")
      .insert([{ email: email, name: capitalisedName }])
      .select();

    if (error) {
      return setErrorMessage(`${error}. Please try again later.`);
    };

    setUsersName("");
    setErrorMessage(null);
    setDisplayedPage("shareRequest");
  };

  return (
    <>
      <Text style={baseStyles.pageHeader}>Welcome!</Text>
      <Text style={baseStyles.pageSubHeader}>Please enter your details below.</Text>
      <Text style={baseStyles.pageLabels}>Full name</Text>
      <TextInput
        style={baseStyles.textInputs}
        placeholder="Enter your full name"
        autoComplete="name"
        onChangeText={(text) => {
          setUsersName(text);
        }}
        value={usersName}
      />
      <Pressable style={baseStyles.buttons} onPress={() => handleSubmit()}>
        <Text style={baseStyles.buttonText}>Submit</Text>
      </Pressable>
      {errorMessage && (<Text style={baseStyles.error}>{errorMessage}</Text>)}
    </>
  );
};