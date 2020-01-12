import * as React from "react";
import { takeSnapshotAsync } from "expo";
import * as screenUtils from "./ScreenUtils";

export default class ViewIdScreen extends React.Component<screenUtils.Props, screenUtils.State> {
  public imageRef;
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    this.setState({ isFontLoaded: true });
  }

  public render() {
    return screenUtils.render(this);
  }
}
