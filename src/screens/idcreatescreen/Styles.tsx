import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";
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
  uploadPhotoButtonStyle: ViewStyle;
  uploadPhotoText: TextStyle;
  uplaodPhotoBtnStyle: ViewStyle;
  btnSave: ViewStyle;
}

export const styles = StyleSheet.create<HomeScreenStyles>({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundDefault,
    marginBottom: 30,
  },
  welcomeContainer: {
    marginTop: 30,
    paddingHorizontal: wp(4),
    width: '100%'
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  formText: {
    width: "100%",
    backgroundColor: Colors.transparent,
    height: 20,
    fontSize: 16,
    fontFamily: 'Metropolis-Medium',
    color: Colors.mainfontColor
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
    paddingHorizontal: wp(4),
  },
  problemBotton: {
    justifyContent: "center",
    alignItems: "center",
    width: "70%",
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: Colors.transparent,
    paddingHorizontal: wp(4),
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
  uploadPhotoButtonStyle: {
    fontFamily: "Metropolis-Medium",
    color: "white",
    fontWeight: "400",
    borderRadius: wp('4'),
    backgroundColor: '#FD7468',
    lineHeight: wp('8'),
    width: wp('95'),
    fontSize: RF(3),
    textTransform: 'none',
    padding: wp(4),
    textAlign: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  uploadPhotoText: {
    fontFamily: "Metropolis-Medium",
    fontSize: RF(2.2),
    color: "white",
    fontWeight: "400",
    paddingLeft: 10
  },
  uplaodPhotoBtnStyle: {
    width: wp('5'),
    height: wp('5'),
    marginRight: 10,
    resizeMode: 'contain'
  },
  btnSave: {
    justifyContent: 'center',
  }
});
