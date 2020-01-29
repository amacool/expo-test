import {ImageStyle, StyleSheet, TextStyle, ViewStyle} from 'react-native';
import Colors from "../../constants/Colors";
import RF from "react-native-responsive-fontsize";
import { widthPercentageToDP as wp} from "../../helpers/Responsive";
interface HomeScreenStyles {
  container: ViewStyle;
  contentContainer: ViewStyle;
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
  createDogIdBtnWrapper: ViewStyle;
}

export const styles = StyleSheet.create<HomeScreenStyles>({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundDefault,
  },
  contentContainer: {
    padding: 0,
  },
  bodyContainer: {
    marginTop: wp('5'),
    alignItems: "center",
    paddingHorizontal: wp(4),
  },
  welcomeContainer: {
    marginTop: wp('5'),
    marginLeft: 0,
    paddingHorizontal: wp(4),
  },
  bottomContainer: {
    marginTop: wp('5'),
    marginBottom: wp('1'),
    alignItems: "center",
  },
  buttonContainer: {
    marginTop:wp('3'),
    alignItems: "center",
    marginBottom: wp('20'),
    paddingHorizontal: wp(4),
    width: '100%'
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
    fontWeight: 'bold',
    color: Colors.mainfontColor,
    lineHeight: wp('8'),
    textAlign: "center",
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
    fontFamily: "sf-regular",
    color: "white",
    fontWeight: "400",
    lineHeight: wp('8'),
    fontSize: RF(2.7),
    textTransform: 'none',
    padding: wp(2.5),
    textAlign: 'center'
  },
  createDogIdBtnWrapper: {
    marginBottom: wp('20'),
    width: '100%',
    borderRadius: wp('4'),
    backgroundColor: '#FD7468',
  }
});
