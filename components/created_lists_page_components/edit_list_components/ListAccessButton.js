import { Pressable, StyleSheet, Text, Platform } from "react-native";

export default function ListAccessButton({ fetchUsers }) {
  return (
    <Pressable
      style={styles.button}
      onPress={() => {
        fetchUsers();
      }}
    >
      <Text style={styles.buttonText}>Click to change list access.</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    borderWidth: 2,
    borderColor: "#B3BFB8",
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginBottom: 5,
  },
  buttonText: {
    color: "#B3BFB8",
    fontFamily: Platform.select({
      ios: "Avenir-Heavy",
      default: "notoserif",
    }),
    fontSize: 18,
  },
})