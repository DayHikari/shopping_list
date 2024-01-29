import { StyleSheet, Text, ScrollView} from "react-native";
import ListItem from "./ListItem";



export default function List ({shoppingList, setSelectedItem}) {
  return(
    <ScrollView style={styles.list} contentContainerStyle={styles.contentContainer}>
      {shoppingList && shoppingList.map((shoppingItem) => {return <ListItem key={shoppingItem.product} itemData={shoppingItem} setSelectedItem={setSelectedItem}/>}) }
      <Text style={styles.text}>Test</Text>
      <Text style={styles.text}>Test</Text>
      <Text style={styles.text}>Test</Text>
      <Text style={styles.text}>Test</Text>
      <Text style={styles.text}>Test</Text>
      <Text style={styles.text}>Test</Text>
      <Text style={styles.text}>Test</Text>
      <Text style={styles.text}>Test</Text>
      <Text style={styles.text}>Test</Text>
      <Text style={styles.text}>Test</Text>
      <Text style={styles.text}>Test</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  list: {
    width: '100%',
  },
  contentContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  text: {
    fontSize: 50
  }
});