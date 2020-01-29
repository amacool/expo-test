import { StyleSheet, TextStyle, ViewStyle } from "react-native";
import Colors from "../../constants/Colors";
import { widthPercentageToDP as wp} from "../../helpers/Responsive";
import RF from "react-native-responsive-fontsize";

interface HomeScreenStyles {
  container: ViewStyle;
  bodyContainer: ViewStyle;
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
  btnExistingWrapper: ViewStyle;
  switchReward: TextStyle;
}

export const styles = StyleSheet.create<HomeScreenStyles>({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundDefault,
    
  },
  bodyContainer: {
    marginTop: wp(4),
    marginBottom: wp(15),
    paddingHorizontal: wp(4)
  },
  welcomeContainer: {
    marginTop: 10,
    alignItems: "center",
    paddingHorizontal: 0
  },
  buttonContainer: {
    marginTop: 10,
    alignItems: "center",
    paddingHorizontal: 0
  },
  formText: {
    width: "100%",
    backgroundColor: Colors.transparent,
    height: 20,
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
    color: "#7F8FA6",
    fontWeight: '300'
  },
  btnExisting: {
    fontFamily: "sf-regular",
    color: "white",
    fontWeight: "400",
    lineHeight: wp('8'),
    fontSize: RF(2.7),
    textTransform: 'none',
    padding: wp(3),
    textAlign: 'center'
  },
  btnExistingWrapper: {
    borderRadius: wp('4'),
    backgroundColor: '#FD7468',
  },
  switchReward: {
    fontFamily: "sf-regular",
    fontSize: RF(4),
    color: Colors.mainfontColor,
    borderRadius: wp('4'),
    backgroundColor: 'white',
    marginBottom: 1,
    textTransform: 'none',
    padding: wp(3),
    textAlign: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: wp(3),
    paddingBottom: wp(3),
    paddingLeft: wp(7),
    paddingRight: wp(7),
  },
});
