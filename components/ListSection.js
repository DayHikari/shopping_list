import { StyleSheet, Text, View } from "react-native";
import List from "./list_section_components/List";
import ListOptions from "./list_section_components/ListOptions";

export default function ListSection () {
  return(
    <View style={styles.listSection}>
      <List />
      <View style={styles.separator}/>
      <ListOptions />
    </View>
  );
};

const styles = StyleSheet.create({
  listSection: {
    // backgroundColor: 'red',
    height: '72%',
    display: 'flex',
    alignItems: 'center',
  },
  separator: {
    marginVertical: 5,
    borderBottomColor: '#046835',
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: '85%'
  }
});