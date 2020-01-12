import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";
import Colors from "../../constants/Colors";

interface CheckOutScreenStyles {
  container: ViewStyle;
  welcomeContainer: ViewStyle;
  buttonContainer: ViewStyle;
  formText: ViewStyle;
  inValidForm: ViewStyle;
  multilineInput: ViewStyle;
  formSwitch: ViewStyle;
  uploadBotton: ViewStyle;
  problemBotton: ViewStyle;
  createBotton: ViewStyle;
  claimText: TextStyle;
  problemText: TextStyle;
}

export const styles = StyleSheet.create<CheckOutScreenStyles>({
  container: {
    flex: 1,
    backgroundColor: Colors.mainBackground,
  },
  welcomeContainer: {
    marginTop: 30,
    alignItems: "center",
    paddingHorizontal: 0,
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  formText: {
    fontFamily: 'Metropolis-Bold',
    width: "100%",
    backgroundColor: Colors.transparent,
    borderBottomWidth: 1,
    height: 20,
    borderBottomColor: Colors.tabIconDefault,
  },
  inValidForm: {
    fontFamily: 'Metropolis-Bold',
    borderBottomColor: Colors.buttonRed,
  },
  multilineInput: {
    fontFamily: 'Metropolis-Bold',
    minHeight: 100,
    paddingTop: 10,
    textAlignVertical: 'top'
  },
  formSwitch: {
    marginTop: 20,
  },
  uploadBotton: {
    justifyContent: "center",
    alignItems: "center",
    width: "70%",
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: Colors.tintColor,
    paddingHorizontal: 25,
  },
  problemBotton: {
    justifyContent: "center",
    alignItems: "center",
    width: "70%",
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: Colors.transparent,
    paddingHorizontal: 25,
  },
  createBotton: {
    justifyContent: "center",
    alignItems: "center",
    width: "70%",
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: Colors.buttonRed,
    paddingHorizontal: 25,
    marginBottom: 70,
  },
  claimText: {
    fontSize: 15,
    fontFamily: "sf-regular",
    color: "#fff",
  },
  problemText: {
    fontSize: 15,
    fontFamily: "sf-regular",
    color: Colors.mainfontColor,
  },
});
