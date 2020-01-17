import * as React from "react";
import * as screenUtils from "./ScreenUtils";
import states from "../../constants/States";
import ViewScreenSnapStore from "../../stores/viewScreenSnapStore";
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
      share: () => this.onShare(),
      download: () => this.onDownload(),
    };
  }
  async componentDidMount() {
    this.setState({ isFontLoaded: true });
  }

  async onShare() {
    await ViewScreenSnapStore.share(this.imageRef);
  }

  async onDownload() {
    await ViewScreenSnapStore.download(this.imageRef);
  }

  public render() {
    return this.state.isFontLoaded && screenUtils.render(this);
  }
}
