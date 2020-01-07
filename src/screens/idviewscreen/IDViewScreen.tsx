import * as React from "react";
import { Font } from "expo";
import * as screenUtils from "./ScreenUtils";
import states from "../../constants/States";
import navigationStore from "../../stores/navigationStore";
export default class IDViewScreen extends React.Component<screenUtils.Props, screenUtils.State> {
  public static navigationOptions = {
    title: "View your Kid's ID",
  };
  public imageRef;
  constructor(props) {
    super(props);
    const params = props.navigation.state.params;
    this.state = {
      isFontLoaded: false,
      idcardInfo: params.card,
      cardIndex: params.index,
      states: states,
      editId: () => this._editId(),
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

  _editId() {
    navigationStore.navigateTo("editid", {
      card: this.state.idcardInfo,
      index: this.state.cardIndex,
    });
  }

  public render() {
    return this.state.isFontLoaded && screenUtils.render(this);
  }
}
