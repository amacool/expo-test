import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import Colors from "../../constants/Colors";
import RF from "react-native-responsive-fontsize";
import { widthPercentageToDP as wp} from "../../helpers/Responsive";

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
  uploadPhotoText: TextStyle;
  uplaodPhotoBtnStyle: ViewStyle;
  btnContainer: ViewStyle;
  btnAction: ViewStyle;
  btnForward: ViewStyle;
  btnSave: ViewStyle;
  forwardText: TextStyle;
  saveText: TextStyle;
}

export const styles = StyleSheet.create<HomeScreenStyles>({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundDefault,
  },
  welcomeContainer: {
    marginTop: 20,
    paddingHorizontal: wp(4),
    width: '100%'
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  formText: {
    width: '100%',
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.tabIconDefault,
  },
  formSwitch: {
    marginTop: 20,
  },
  uploadBotton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '70%',
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: Colors.tintColor,
    paddingHorizontal: 25,
  },
  problemBotton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '70%',
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: Colors.transparent,
    paddingHorizontal: 25,
  },
  createBotton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '70%',
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: Colors.buttonRed,
    paddingHorizontal: 25,
  },
  claimText: {
    fontSize: 15,
    fontFamily: 'sf-regular',
    color: "#fff",
  },
  problemText: {
    fontSize: 15,
    fontFamily: 'sf-regular',
    color: Colors.mainfontColor,
  },
  btnText: {
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
  btnAction: {
    fontFamily: "sf-regular",
    fontWeight: "400",
    borderRadius: wp('4'),
    lineHeight: wp('8'),
    marginBottom: wp('15'),
    width: '48%',
    fontSize: RF(3),
    textTransform: 'none',
    padding: wp(4),
    textAlign: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  btnContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp(4),
  },
  forwardText: {
    color: Colors.mainColor,
  },
  btnForward: {
    backgroundColor: Colors.white,
  },
  btnSave: {
    backgroundColor: Colors.mainColor,
    color: Colors.mainColor
  }
});
