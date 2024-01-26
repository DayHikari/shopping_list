import { StyleSheet, Text, ScrollView} from "react-native";
import ListItem from "./ListItem";
import { supabase } from "../../supabase";
import { useState, useEffect } from "react";



export default function List () {
  const [shoppingList, setShoppingList] = useState(null)

  useEffect(() => {
    const fetchList = async () => {
      const { data, error } = await supabase
      .from('initial_shopping_list')
      .select('*')

      if (error) {
        console.error("Error occured: ", error.message);
        return;
      };

      if (data) {
        setShoppingList(data);
      };
    };

    fetchList();
  }, []);


  return(
    <ScrollView style={styles.list} contentContainerStyle={styles.contentContainer}>
      {shoppingList && shoppingList.map((shoppingItem) => {return <ListItem itemData={shoppingItem}/>}) }
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