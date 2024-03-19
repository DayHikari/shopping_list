import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import baseStyles from "../../global_styles/baseStyle";

export default function LoginForm ({email, setEmail, password, setPassword, handleLogin, handleSignUpPage}) {
  return (
    <View style={styles.loginContainer}>
        <Text style={baseStyles.labels}>Email</Text>
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
        <Text style={baseStyles.labels}>Password</Text>
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
        <View style={baseStyles.buttonSection}>
          <Pressable style={baseStyles.buttons} onPress={() => handleSignUpPage()}>
            <Text style={baseStyles.buttonText}>Sign Up</Text>
          </Pressable>
          <Pressable style={baseStyles.buttons} onPress={() => handleLogin()}>
            <Text style={baseStyles.buttonText}>Login</Text>
          </Pressable>
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  loginContainer: {
    display: "flex",
    alignItems: "center",
    width: "100%",
  },
});