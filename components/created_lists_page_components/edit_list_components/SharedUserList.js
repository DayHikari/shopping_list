import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export default function SharedUserList({
  sharedData,
  addToBeDeleted,
  toBeDeleted,
}) {
  return sharedData.length !== 0 ? (
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
  ) : (
    <Text style={styles.error}>List is not shared with any other users.</Text>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    maxHeight: 180,
    width: "90%",
  },
  scrollContainerSubheader: {
    color: "#B3BFB8",
    fontFamily: Platform.select({
      ios: "Cochin",
      default: "notoserif",
    }),
    fontSize: 18,
  },
  emailButtonUnselected: {
    borderWidth: 3,
    borderColor: "#B3BFB8",
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  emailButtonSelected: {
    borderWidth: 3,
    borderColor: "#B3BFB8",
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  emailButtonText: {
    color: "#B3BFB8",
    fontFamily: Platform.select({
      ios: "Cochin",
      default: "notoserif",
    }),
    fontSize: 18,
    alignSelf: "center",
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
})
