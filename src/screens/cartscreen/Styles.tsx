import { StyleSheet, TextStyle, ViewStyle } from "react-native";
import Colors from "../../constants/Colors";

interface CartScreenStyles {
  container: ViewStyle;
  formText: ViewStyle;
  noIDText: TextStyle;
}

export const styles = StyleSheet.create<CartScreenStyles>({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundDefault,
    marginBottom: 30,
  },
  formText: {
    width: "100%",
    backgroundColor: Colors.transparent,
    borderBottomWidth: 0.1,
    height: 20,
    borderBottomColor: Colors.tabIconDefault,
    fontSize: 14,
    fontFamily: 'Metropolis-Thin'
  },
  noIDText: {
    fontSize: 24,
    fontFamily: "Metropolis-Medium",
  },
});
