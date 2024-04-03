import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
} from "react-native";
import baseStyles from "../../global_styles/baseStyle";

export default function SignUpForm({
  email,
  setEmail,
  password,
  setPassword,
  passwordCheck,
  setPasswordCheck,
  earlyAccessCode,
  setEarlyAccessCode,
  handleSignUp,
  handleSignUpPage,
}) {
  return (
    <ScrollView
      style={styles.signUpContainer}
      contentContainerStyle={styles.signUpContainerContent}
    >
      <Text style={baseStyles.pageLabels}>Email</Text>
      <TextInput
        style={baseStyles.textInputs}
        placeholder="Enter email address"
        autoComplete="email"
        inputMode="email"
        onChangeText={(text) => {
          setEmail(text);
        }}
        value={email}
      />
      <Text style={baseStyles.pageLabels}>Password</Text>
      <TextInput
        style={baseStyles.textInputs}
        placeholder="Enter password"
        autoComplete="current-password"
        secureTextEntry={true}
        onChangeText={(text) => {
          setPassword(text);
        }}
        value={password}
      />
      <Text style={baseStyles.pageLabels}>Confirm Password</Text>
      <TextInput
        style={baseStyles.textInputs}
        placeholder="Confirm password"
        autoComplete="new-password"
        secureTextEntry={true}
        onChangeText={(text) => {
          setPasswordCheck(text);
        }}
        value={passwordCheck}
      />
        <Text style={baseStyles.pageLabels}>Early Access Code</Text>
        <TextInput
          style={baseStyles.textInputs}
          placeholder="Enter the early access code"
          autoComplete="name"
          onChangeText={(text) => {
            setEarlyAccessCode(text);
          }}
          value={earlyAccessCode}
        />
      <View style={baseStyles.buttonSection}>
        <Pressable style={baseStyles.buttons} onPress={() => handleSignUpPage()}>
          <Text style={baseStyles.buttonText}>Cancel</Text>
        </Pressable>
        <Pressable style={baseStyles.buttons} onPress={() => handleSignUp()}>
          <Text style={baseStyles.buttonText}>Sign Up</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  signUpContainer: {
    display: "flex",
    width: "100%",
    marginBottom: 15,
  },
  signUpContainerContent: {
    alignItems: "center",
  },
});
