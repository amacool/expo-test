import * as React from "react";
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
    this.setState({ isFontLoaded: true });
  }

  _continueApp() {
    navigationStore.navigateTo("main");
  }

  public render() {
    return this.state.isFontLoaded && screenUtils.render(this);
  }
}
