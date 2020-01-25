import { StyleSheet, TextStyle, ViewStyle } from "react-native";
import Colors from "../../constants/Colors";
import { widthPercentageToDP as wp } from "../../helpers/Responsive";
import RF from "react-native-responsive-fontsize"

interface CartScreenStyles {
  container: ViewStyle;
  formText: ViewStyle;
  noIDText: TextStyle;
  inputWrapper: ViewStyle;
  bottomWrapper: ViewStyle;
  description: TextStyle;
  btnContact: TextStyle;
  buttonContainer: ViewStyle;
  btnBottom: TextStyle;
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
    height: 20,
    fontSize: wp("4"),
    color: Colors.mainfontColor,
    fontFamily: 'sf-regular',
    letterSpacing: 0.2,
    shadowOpacity: 0,
    elevation: 0
  },
  noIDText: {
    fontSize: 24,
    fontFamily: "Metropolis-Medium",
  },
  inputWrapper: {
    width: '95%',
    backgroundColor: 'white',
    justifyContent: "center",
    flexDirection: 'row',
    height: 64,
    paddingLeft: 10,
    borderRadius: 10,
    marginBottom: 20
  },
  bottomWrapper: {
    width: '95%',
    flexDirection: 'column',
    alignItems: 'center',
  },
  description: {
    color: '#7F8FA6',
    fontSize: wp("4"),
    textAlign: 'center',
    lineHeight: 27,
    fontFamily: 'sf-regular',
    marginBottom: 10,
  },
  btnContact: {
    color: '#FD7468',
    fontSize: wp("4"),
    textAlign: 'center',
    fontFamily: 'sf-regular',
    textDecorationColor: '#FD7468',
    textDecorationLine: 'underline',
  },
  btnBottom: {
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
  buttonContainer: {
    width: '95%',
    flexDirection: 'column',
    alignItems: 'center',
  }
});
