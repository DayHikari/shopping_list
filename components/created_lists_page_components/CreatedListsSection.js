import { ScrollView, StyleSheet, Text } from "react-native";
import ListName from "./ListName";

export default function CreatedListsSection ({listNames, handleListSelect}) {
    return (
        <ScrollView style={styles.list} contentContainerStyle={styles.contentContainer}>
            {listNames && listNames.map((listName, index) => <ListName listName={listName} handleListSelect={handleListSelect} key={index}/>)}
            <Text>TEST</Text>
            <Text>TEST</Text>
            <Text>TEST</Text>
            <Text>TEST</Text>
            <Text>TEST</Text>
            <Text>TEST</Text>
            <Text>TEST</Text>
            <Text>TEST</Text>
            <Text>TEST</Text>
            <Text>TEST</Text>
            <Text>TEST</Text>
            <Text>TEST</Text>
            <Text>TEST</Text>
            <Text>TEST</Text>
            <Text>TEST</Text>
            <Text>TEST</Text>
            <Text>TEST</Text>
            <Text>TEST</Text>
            <Text>TEST</Text>
            <Text>TEST</Text>
            <Text>TEST</Text>
            <Text>TEST</Text>
            <Text>TEST</Text>
            <Text>TEST</Text>
            <Text>TEST</Text>
            <Text>TEST</Text>
            <Text>TEST</Text>
            <Text>TEST</Text>
            <Text>TEST</Text>
            <Text>TEST</Text>
            <Text>TEST</Text>
            <Text>TEST</Text>
            <Text>TEST</Text>
            <Text>TEST</Text>
            <Text>TEST</Text>
            <Text>TEST</Text>
            <Text>TEST</Text>
            <Text>TEST</Text>
            <Text>TEST</Text>
            <Text>TEST</Text>
            <Text>TEST</Text>
            <Text>TEST</Text>
            <Text>TEST</Text>
            <Text>TEST</Text>
            <Text>TEST</Text>
            <Text>TEST</Text>
            <Text>TEST</Text>
            <Text>TEST</Text>
            <Text>TEST</Text>
            <Text>TEST</Text>
            <Text>TEST</Text>
            <Text>TEST</Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    list: {
        width: "100%",
      },
      contentContainer: {
        display: "flex",
        alignItems: "center",
      },
})