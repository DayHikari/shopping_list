import { StyleSheet, Text, View } from "react-native";

export default function ListOptions () {
  return(
    <View style={styles.listOptions}>
      <Text>Add</Text>
      <Text>Edit</Text>
      <Text>Delete</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  listOptions: {
    // backgroundColor: 'red',
    height: '15%',
    width: '100%',
    display:'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});