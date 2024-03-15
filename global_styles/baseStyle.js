import { StyleSheet, Platform } from "react-native";

const baseStyles = StyleSheet.create({
  buttons: {
    backgroundColor: "#034222",
    width: "40%",
    display: "flex",
    alignItems: "center",
    margin: 5,
    padding: 10,
    borderRadius: 15,
  },
  buttonSection: {
    width: "85%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    margin: 10,
  },
  buttonText: {
    fontFamily: Platform.select({
      ios: "Avenir-Heavy",
      default: "serif",
    }),
    color: "#F0F7F4",
    fontSize: 15,
    fontWeight: "700",
  },
  confirmation: {
    color: "#034222",
    fontSize: 16,
    fontFamily: Platform.select({
      ios: "Avenir-Heavy",
      default: "notoserif",
    }),
    fontWeight: "700",
    marginBottom: 5,
  },
  error: {
    color: "red",
    fontSize: Platform.select({
      ios: 27,
      android: 20,
      default: 25,
    }),
    fontFamily: Platform.select({
      ios: "Avenir-Heavy",
      default: "notoserif",
    }),
    fontWeight: "700",
    textAlign: "center",
  },
  form: {
    width: "100%",
    maxHeight: 375,
    backgroundColor: "#034222",
    display: "flex",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
  },
  formButtons: {
    borderRadius: 10,
    backgroundColor: "#FF8833",
    paddingHorizontal: 20,
    paddingVertical: 10,
    margin: 10,
  },
  formButtonsSection: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  formButtonText: {
    fontSize: 17,
    fontFamily: Platform.select({
      ios: "Avenir-Heavy",
      default: "notoserif",
    }),
    color: "#034222",
    fontWeight: "700",
  },
  formHeader: {
    fontSize: 25,
    fontFamily: Platform.select({
      ios: "Avenir-Heavy",
      default: "notoserif",
    }),
    color: "#F0F7F4",
    fontWeight: "700",
    marginBottom: 10,
  },
  formlLabels: {
    fontSize: 17,
    fontFamily: Platform.select({
      ios: "Avenir-Heavy",
      default: "notoserif",
    }),
    color: "#B3BFB8",
    fontWeight: "700",
    alignSelf: "flex-start",
    paddingLeft: 20,
  },
  pageLabels: {
    fontSize: 17,
    fontFamily: Platform.select({
      ios: "Avenir-Heavy",
      default: "notoserif",
    }),
    color: "#034222",
    fontWeight: "700",
    alignSelf: "flex-start",
    paddingLeft: 20,
  },
  pageHeader: {
    fontSize: Platform.select({
      ios: 35,
      android: 26,
      default: 37,
    }),
    fontFamily: Platform.select({
      ios: "Avenir-Heavy",
      android: "notoserif",
    }),
    fontWeight: "700",
    color: "#034222",
    textAlign: "center",
    textDecorationLine: "underline",
    marginVertical: 5
  },
  pageSubHeader: {
    color: "#034222",
    fontSize: Platform.select({
      ios: 30,
      android: 21,
      default: 33,
    }),
    fontWeight: "700",
    fontFamily: Platform.select({
      ios: "Avenir-Heavy",
      default: "serif",
    }),
    textAlign: "center",
    marginVertical: 10,
  },
  separator: {
    marginVertical: 5,
    borderBottomColor: "#046835",
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: "85%",
  },
  sectionHeader: {
    fontSize: 25,
    fontFamily: Platform.select({
      ios: "Avenir-Heavy",
      default: "notoserif",
    }),
    color: "#F0F7F4",
    fontWeight: "700",
    marginBottom: 10,
  },
  textInputs: {
    backgroundColor: "#F0F7F4",
    width: "90%",
    height: 40,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#B3BFB8",
    padding: 10,
    marginBottom: 10,
    marginTop: 2,
    fontSize: 15,
    color: "#034222",
    fontFamily: Platform.select({
      ios: "Avenir-Heavy",
      default: "notoserif",
    }),
    fontWeight: "700",
  },
});

export default baseStyles;