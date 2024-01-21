import { StyleSheet, Text, ScrollView} from "react-native";
import ListItem from "./ListItem";


export default function List () {
  const milk = {
    product: "Milk",
    image: require("../../assets/milk.png"),
    quantity: 2,
  };
  const carrots = {
    product: "Carrots",
    image: require("../../assets/carrots.png"),
    quantity: "10 bag(s)",
  }
  return(
    <ScrollView style={styles.list} contentContainerStyle={styles.contentContainer}>
      <ListItem itemData={milk} />
      <ListItem itemData={carrots} />
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