import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";
import Colors from "../../constants/Colors";

interface HomeScreenStyles {
  container: ViewStyle;
  welcomeContainer: ViewStyle;
  buttonContainer: ViewStyle;
  formText: ViewStyle;
  formSwitch: ViewStyle;
  uploadBotton: ViewStyle;
  problemBotton: ViewStyle;
  createBotton: ViewStyle;
  claimText: TextStyle;
  problemText: TextStyle;
}

export const styles = StyleSheet.create<HomeScreenStyles>({
  container: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  welcomeContainer: {
    alignItems: "center",
    paddingHorizontal: 0,
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  formText: {
    width: "100%",
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.tabIconDefault,
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
  noIDText: {
    fontSize: 24,
    fontFamily: "Roboto",
    fontWeight: "bold",
    // color: Colors.white,
  },
});
