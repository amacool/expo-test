import { StyleSheet, TextStyle, ViewStyle } from "react-native";
import Colors from "../../constants/Colors";
import RF from "react-native-responsive-fontsize";
import { widthPercentageToDP as wp} from "../../helpers/Responsive";

interface HomeScreenStyles {
  container: ViewStyle;
  welcomeContainer: ViewStyle;
  buttonContainer: ViewStyle;
  formText: ViewStyle;
  inputForm: ViewStyle;
  inValidForm: ViewStyle;
  formSwitch: ViewStyle;
  uploadBotton: ViewStyle;
  createBotton: ViewStyle;
  claimText: TextStyle;
  problemText: TextStyle;
  btnUpload: ViewStyle;
  btnUploadText: TextStyle;
  uploadPhotoBtn: ViewStyle;
  btnSave: ViewStyle;
}

export const styles = StyleSheet.create<HomeScreenStyles>({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundDefault
  },
  welcomeContainer: {
    marginTop: 30,
    alignItems: "center",
    paddingHorizontal: '2.5%'
  },
  buttonContainer: {
    marginTop: 30,
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
    fontFamily: 'Metropolis-Thin'
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
    fontSize: wp(4),
    fontFamily: "sf-regular",
    color: "#7F8FA6",
  },
  btnUpload: {
    borderRadius: wp('4.5'),
    backgroundColor: '#FD7468',
    lineHeight: wp('8'),
    width: wp('95'),
    paddingVertical: wp(4),
    paddingHorizontal: wp(6),
    textAlign: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  btnUploadText: {
    color: Colors.white,
    fontFamily: "sf-regular",
    fontSize: RF(2.7),
    textTransform: 'none',
  },
  uploadPhotoBtn: {
    width: 30,
    height: 30,
  },
  btnSave: {
    justifyContent: 'center'
  }
});
