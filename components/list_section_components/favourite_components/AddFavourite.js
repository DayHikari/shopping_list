import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View, Platform } from "react-native";

export default function AddFavourite({ handleAddSubmit, handleAddCancel, productName }) {
  const [quantity, setQuantity] = useState("");

  return (
    <>
      <Text style={styles.subHeader}>{`Add selected product: ${productName}`}</Text>
      <Text style={styles.label}>Quantity:</Text>
      <TextInput
        style={styles.textInputs}
        placeholder="Enter quantity"
        onChangeText={(text) => {
          setQuantity(text);
        }}
        value={quantity}
      />
      <View style={styles.buttonContainer}>
        <Pressable onPress={() => handleAddCancel()} style={styles.button}>
          <Text style={styles.buttonText}>Cancel</Text>
        </Pressable>
        <Pressable onPress={() => handleAddSubmit(quantity)} style={styles.button}>
          <Text style={styles.buttonText}>Submit</Text>
        </Pressable>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
    subHeader: {
        fontSize: 17,
        fontFamily: Platform.select({
          ios: "Avenir-Heavy",
          default: "serif",
        }),
        color: "#FF8833",
        fontWeight: "700",
        alignSelf: "center",
        paddingLeft: 20,
        paddingBottom: 10,
      },
      label: {
        fontSize: 17,
        fontFamily: Platform.select({
          ios: "Avenir-Heavy",
          default: "serif",
        }),
        color: "#FF8833",
        fontWeight: "700",
        alignSelf: "flex-start",
        paddingLeft: 20,
      },
      textInputs: {
        backgroundColor: "#CDEEFD",
        width: "90%",
        height: 40,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#FF8833",
        padding: 10,
        marginBottom: 10,
        marginTop: 2,
        fontSize: 15,
        color: "#046835",
        fontFamily: Platform.select({
          ios: "Avenir-Heavy",
          default: "serif",
        }),
        fontWeight: "700",
      },
    buttonContainer: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
        width: "80%",
      },
      button: {
        borderRadius: 15,
        backgroundColor: "#FF8833",
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginBottom: 5,
        marginTop: 10,
      },
      buttonText: {
        color: "#034222",
        fontSize: 18,
        fontFamily: Platform.select({
          ios: "Avenir-Heavy",
          default: "serif",
        }),
        fontWeight: "700",
      },
})
