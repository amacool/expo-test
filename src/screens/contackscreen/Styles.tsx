import { StyleSheet, TextStyle, ViewStyle } from "react-native";
import Colors from "../../constants/Colors";
import { widthPercentageToDP as wp} from "../../helpers/Responsive";
import RF from "react-native-responsive-fontsize";

interface CheckOutScreenStyles {
  container: ViewStyle;
  welcomeContainer: ViewStyle;
  buttonContainer: ViewStyle;
  formText: ViewStyle;
  multilineInput: ViewStyle;
  formSwitch: ViewStyle;
  uploadBotton: ViewStyle;
  problemBotton: ViewStyle;
  createBotton: ViewStyle;
  claimText: TextStyle;
  problemText: TextStyle;
  btnSendMsg: TextStyle;
}

export const styles = StyleSheet.create<CheckOutScreenStyles>({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundDefault,
  },
  welcomeContainer: {
    marginTop: 30,
    alignItems: "center",
    paddingHorizontal: 0,
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: "center",
    marginBottom: wp(18)
  },
  formText: {
    fontFamily: 'sf-regular',
    width: "100%",
    backgroundColor: Colors.transparent,
    borderBottomWidth: 0,
    borderBottomColor: 'transparent',
    marginTop: 10,
    textAlign: 'left',
    minHeight: 50
  },
  multilineInput: {
    fontFamily: 'sf-regular',
    minHeight: 100,
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
  btnSendMsg: {
    fontFamily: "Metropolis-Medium",
    color: "white",
    fontWeight: "400",
    borderRadius: wp('4'),
    backgroundColor: '#FD7468',
    lineHeight: wp('8'),
    width: wp('95'),
    fontSize: RF(2.7),
    textTransform: 'none',
    padding: wp(3),
    textAlign: 'center'
  }
});
