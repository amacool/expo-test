import {ImageStyle, StyleSheet, TextStyle, ViewStyle} from 'react-native';
import Colors from "../../constants/Colors";
import { heightPercentageToDP as hp} from "../../helpers/Responsive"
interface SuccessScreenStyles {
  container: ViewStyle;
  welcomeContainer: ViewStyle;
  buttonContainer: ViewStyle;
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
});
