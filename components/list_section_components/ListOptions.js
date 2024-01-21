import { StyleSheet, Text, View } from "react-native";

export default function ListOptions () {
  return(
    <View style={styles.listOptions}>
      <Text style={styles.buttonOptions}>Add</Text>
      <Text style={styles.buttonOptions}>Edit</Text>
      <Text style={styles.buttonOptions}>Delete</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  listOptions: {
    // backgroundColor: 'red',
    height: '12%',
    width: '100%',
    display:'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  buttonOptions: {
    fontFamily: Platform.select({
      ios: "Cochin",
      default: "serif"
    }),
    fontSize: 25,
  },
});