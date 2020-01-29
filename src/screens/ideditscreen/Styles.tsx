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
  btnUploadTextWrapper: ViewStyle;
  uploadPhotoBtn: ViewStyle;
}

export const styles = StyleSheet.create<HomeScreenStyles>({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundDefault
  },
  welcomeContainer: {
    marginTop: 30,
    paddingHorizontal: wp(4)
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: "center",
    paddingHorizontal: wp(4)
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
    paddingHorizontal: wp(4)
  },
  createBotton: {
    justifyContent: "center",
    alignItems: "center",
    width: "70%",
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: Colors.buttonRed,
    paddingHorizontal: wp(4),
    marginBottom: 70,
  },
  claimText: {
    fontSize: 15,
    fontFamily: "sf-regular",
    color: "#fff",
  },
  problemText: {
    fontSize: wp(3.5),
    fontFamily: "sf-regular",
    color: "#7F8FA6",
  },
  btnUpload: {
    borderRadius: wp('4.5'),
    backgroundColor: '#FD7468',
    width: '100%',
    paddingVertical: wp(4),
    paddingHorizontal: wp(6),
    textAlign: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  btnUploadText: {
    fontFamily: "sf-regular",
    color: "white",
    fontWeight: "400",
    fontSize: RF(2.7),
    textTransform: 'none',
    textAlign: 'center'
  },
  btnUploadTextWrapper: {
    width: '100%',
    borderRadius: wp('4'),
    backgroundColor: '#FD7468',
  },
  uploadPhotoBtn: {
    width: 30,
    height: 30,
  }
});
