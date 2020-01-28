import { StyleSheet, TextStyle, ViewStyle } from "react-native";
import Colors from "../../constants/Colors";
import { widthPercentageToDP as wp } from "../../helpers/Responsive";
import RF from "react-native-responsive-fontsize"

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
  totalRow: ViewStyle;
  totalContainer: ViewStyle;
  totalLabel: TextStyle;
  totalValue: TextStyle;
  card: ViewStyle;
  cardWrapper: ViewStyle;
  btnBottom: TextStyle;
}

export const styles = StyleSheet.create<HomeScreenStyles>({
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
    borderRadius: wp('4'),
    backgroundColor: '#FD7468',
    width: wp('95'),
  },
  formText: {
    width: "100%",
    backgroundColor: Colors.transparent,
    borderBottomWidth: 0.1,
    height: 20,
    borderBottomColor: Colors.tabIconDefault,
    fontSize: 14,
    fontFamily: 'sf-regular'
  },
  inValidForm: {
    borderBottomColor: Colors.buttonRed,
    borderBottomWidth: 1,
  },
  inputForm: {
    fontSize: 14,
    fontFamily: 'sf-regular'
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
  totalContainer: {
    backgroundColor: Colors.white,
    padding: 20,
    marginHorizontal: '2.5%',
    borderRadius: 10
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10
  },
  totalLabel: {
    color: '#7F8FA6',
    fontSize: 17,
    fontFamily: "sf-regular",
    textAlign: 'center',
    marginTop: 5
  },
  totalValue: {
    color: Colors.mainfontColor,
    fontSize: 17,
    fontFamily: "sf-regular",
  },
  card: {
    borderRadius: 10,
    borderColor: 'transparent',
    backgroundColor: Colors.white
  },
  cardWrapper: {
    elevation: 0,
    shadowColor: 'transparent',
    backgroundColor: '#F6F7FB',
    borderColor: 'transparent',
    width: '31%'
  },
  btnBottom: {
    fontFamily: "sf-regular",
    color: "white",
    fontWeight: "400",
    fontSize: RF(2.7),
    textTransform: 'none',
    padding: wp(3),
    textAlign: 'center'
  }
});
