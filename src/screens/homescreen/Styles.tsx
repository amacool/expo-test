import {ImageStyle, StyleSheet, TextStyle, ViewStyle} from 'react-native';
import Colors from "../../constants/Colors";
import RF from "react-native-responsive-fontsize";
import { widthPercentageToDP as wp} from "../../helpers/Responsive";
interface HomeScreenStyles {
  container: ViewStyle;
  contentContainer: ViewStyle;
  headerContainer: ViewStyle;
  bodyContainer: ViewStyle;
  welcomeContainer: ViewStyle;
  bottomContainer: ViewStyle;
  headerTitle: TextStyle;
  buttonContainer: ViewStyle;
  headerBodayTitle: TextStyle;
  bottomTitle: TextStyle;
  welcomeImage: ImageStyle;
  claimBotton: ViewStyle;
  claimText: TextStyle;
  createDogIdBtn: TextStyle;
}

export const styles = StyleSheet.create<HomeScreenStyles>({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundDefault,
    marginBottom: 10
  },
  contentContainer: {
    padding: 0,
  },
  headerContainer: {
    marginTop: 80,
    alignItems: "center",
    paddingHorizontal: 30,
  },
  bodyContainer: {
    // marginTop: 20,
    marginTop:wp('5'),
    alignItems: "center",
    paddingHorizontal: wp('10'),
  },
  welcomeContainer: {
    marginTop:wp('5'),
    alignItems: "center",
    paddingHorizontal: 0,
  },
  bottomContainer: {
    marginTop: wp('5'),
    marginBottom: wp('1'),
    alignItems: "center",
    paddingHorizontal: wp('10'),
  },
  buttonContainer: {
    marginTop:wp('3'),
    alignItems: "center",
    marginBottom: wp('20'),
  },
  headerTitle: {
    fontSize: RF(5.3),
    fontFamily: 'sf-heavy',
    color: Colors.mainfontColor,
    textAlign: "center",
  },
  headerBodayTitle: {
    fontSize: RF(3.5),
    fontFamily: 'sf-regular',
    color: Colors.mainfontColor,
    lineHeight: wp('8'),
    textAlign: "center",
    fontWeight: "bold"
  },
  bottomTitle: {
    fontSize: RF(2.8),
    fontFamily: 'sf-regular',
    color: Colors.mainfontColor,
    textAlign: "center",
  },
  welcomeImage: {
    width: '100%',
    resizeMode: "contain",
    borderRadius: 3,
    overflow: 'hidden',
  },
  claimBotton: {
    paddingVertical: wp('3.5'),
    borderRadius: wp('8'),
    backgroundColor: '#00CCCC',
    paddingHorizontal: wp('20'),
  },
  claimText: {
    fontSize: RF(2.2),
    fontFamily: 'Metropolis-Bold',
    color: "#fff",
    fontWeight:'600'
  },
  createDogIdBtn: {
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
  }
});
