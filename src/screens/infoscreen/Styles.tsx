import { StyleSheet, TextStyle, ViewStyle } from "react-native";
import Colors from "../../constants/Colors";
import { widthPercentageToDP as wp} from "../../helpers/Responsive";
import RF from "react-native-responsive-fontsize";

interface HomeScreenStyles {
  container: ViewStyle;
  welcomeContainer: ViewStyle;
  buttonContainer: ViewStyle;
  formText: ViewStyle;
  inputForm: ViewStyle;
  inValidForm: ViewStyle;
  formSwitch: ViewStyle;
  uploadBotton: ViewStyle;
  problemBotton: ViewStyle;
  createBotton: ViewStyle;
  claimText: TextStyle;
  problemText: TextStyle;
  btnExisting: TextStyle;
  switchReward: TextStyle;
}

export const styles = StyleSheet.create<HomeScreenStyles>({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundDefault,
    marginBottom: 30,
  },
  welcomeContainer: {
    marginTop: 30,
    alignItems: "center",
    paddingHorizontal: 0,
  },
  buttonContainer: {
    marginTop: 10,
    alignItems: "center",
  },
  formText: {
    width: "100%",
    backgroundColor: Colors.transparent,
    borderBottomWidth: 0.1,
    height: 20,
    borderBottomColor: Colors.tabIconDefault,
    fontSize: 14,
    fontFamily: 'Metropolis-Medium',
    color: Colors.black,
  },
  inValidForm: {
    borderBottomColor: Colors.buttonRed,
    borderBottomWidth: 1,
  },
  inputForm: {
    fontSize: 14,
    fontFamily: 'Metropolis-Medium'
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
  btnExisting: {
    fontFamily: "Metropolis-Medium",
    color: "white",
    fontWeight: "400",
    borderRadius: wp('4'),
    backgroundColor: '#FD7468',
    lineHeight: wp('8'),
    marginBottom: wp('15'),
    width: wp('95'),
    fontSize: RF(2.7),
    textTransform: 'none',
    padding: wp(3),
    textAlign: 'center'
  },
  switchReward: {
    fontFamily: "Metropolis-Medium",
    color: Colors.mainfontColor,
    fontWeight: "400",
    borderRadius: wp('4'),
    backgroundColor: 'white',
    lineHeight: wp('8'),
    marginBottom: wp('15'),
    width: wp('95'),
    fontSize: RF(2.7),
    textTransform: 'none',
    padding: wp(3),
    textAlign: 'center'
  }
});
