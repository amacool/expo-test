import * as React from "react";
import * as Font from "expo-font";
import * as screenUtils from "./ScreenUtils";
import states from "../../constants/States";
import navigationStore from "../../stores/navigationStore";
export default class SuccessScreen extends React.Component<screenUtils.Props, screenUtils.State> {
  public static navigationOptions = {
    title: "View your Kid's ID",
  };
  public imageRef;
  constructor(props) {
    super(props);
    this.state = {
      isFontLoaded: false,
      states: states,
      continueApp: () => this._continueApp(),
    };
  }
  async componentDidMount() {
    await Font.loadAsync({
      "sf-heavy": require("../../assets/fonts/SF-Compact-Display-Heavy.ttf"),
      "sf-regular": require("../../assets/fonts/SF-UI-Display-Regular.ttf"),
      Roboto: require("../../assets/fonts/Roboto.ttf"),
      Roboto_medium: require("../../assets/fonts/Roboto_medium.ttf"),
      // 'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf')
    });
    this.setState({ isFontLoaded: true });
  }

  _continueApp() {
    navigationStore.navigateTo("main");
  }

  public render() {
    return this.state.isFontLoaded && screenUtils.render(this);
  }
}
