import { StyleSheet, Text, ScrollView} from "react-native";
import ListItem from "./ListItem";
import { db, connection } from "../../database/connection";



export default function List () {
  const milk = {
    _id: "Milk",
    image: "milk",
    quantity: 2,
  };
  const carrots = {
    _id: "Carrots",
    image: "carrots",
    quantity: "10 bag(s)",
  };
  const kimchi = {
    _id: "Kimchi",
    image: "default",
    quantity: "1 bag(s)",
  }
  return(
    <ScrollView style={styles.list} contentContainerStyle={styles.contentContainer}>
      <ListItem itemData={milk} />
      <ListItem itemData={carrots} />
      <ListItem itemData={kimchi} />
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