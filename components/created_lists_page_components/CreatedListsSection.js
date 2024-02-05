import { ScrollView, StyleSheet, Text } from "react-native";
import ListName from "./ListName";

export default function CreatedListsSection ({listNames}) {
    return (
        <ScrollView style={styles.list} contentContainerStyle={styles.contentContainer}>
            <ListName listNames={listNames}/>
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