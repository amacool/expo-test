import {ImageStyle, StyleSheet, TextStyle, ViewStyle} from 'react-native';
import Colors from "../../constants/Colors";
import RF from "react-native-responsive-fontsize"
import { widthPercentageToDP as wp} from "../../helpers/Responsive"
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
}

export const styles = StyleSheet.create<HomeScreenStyles>({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    // marginTop: 20,
    // backgroundColor:'red',
    marginTop:wp('5'),

    alignItems: "center",
    paddingHorizontal: 0,
  },
  bottomContainer: {
    // marginTop: 20,
    marginTop:wp('3'),
    alignItems: "center",
    paddingHorizontal: wp('10'),
  },
  buttonContainer: {
    // marginTop: 20,
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
    fontFamily: 'Poppins-Regular',
    color: "#fff",
    fontWeight:'600'
  },
});
