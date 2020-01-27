import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import Colors from "../../constants/Colors";
import { heightPercentageToDP as hp} from "../../helpers/Responsive";
import { widthPercentageToDP as wp } from "../../helpers/Responsive";
import RF from "react-native-responsive-fontsize";

interface SuccessScreenStyles {
  container: ViewStyle;
  welcomeContainer: ViewStyle;
  buttonContainer: ViewStyle;
  btnBottom: TextStyle;
}

export const styles = StyleSheet.create<SuccessScreenStyles>({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  welcomeContainer: {
    height: hp(80),
    marginTop: 20,
    alignItems: "center",
    paddingHorizontal: 0,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  btnBottom: {
    fontFamily: "sf-regular",
    color: "white",
    fontWeight: "400",
    borderRadius: wp('4'),
    backgroundColor: '#FD7468',
    lineHeight: wp('8'),
    marginBottom: wp('5'),
    width: wp('95'),
    fontSize: RF(2.7),
    textTransform: 'none',
    padding: wp(3),
    textAlign: 'center'
  }
});
