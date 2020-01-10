import * as React from "react";
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
