import * as React from "react";
import { takeSnapshotAsync } from "expo";
import * as screenUtils from "./ScreenUtils";
import navigationStore from "../../stores/navigationStore";

export default class ContactScreen extends React.Component<screenUtils.Props, screenUtils.State> {
  public imageRef;
  constructor(props) {
    super(props);

    this.state = {
      contactInfo : {
        name: "",
        email: "",
        message: ""
      },
      contactInfoValidation: {
        name: true,
        email: true,
        message: true,
      },
      isValid: false,
      changeInfo: (key, value) => this.onChangeInfo(key, value),
      sendMessage: () => this.onSendMessage(),
    };
  }

  checkValid() {
    const data = this.state.contactInfo;
    const validObject = this.state.contactInfoValidation;
    let isValid = true;
    const array = Object.keys(validObject);
    for (let i in array) {
      const key = array[i];
      if (validObject[key] && !data[key]) {
        isValid = false;
      }
    }
    this.setState({ isValid: isValid });
  }

  onChangeInfo = (key, value) => {
    let someProperty = { ...this.state.contactInfo };
    if (!value) delete someProperty[key];
    else someProperty[key] = value;
    this.setState({ contactInfo: someProperty });
    this.checkValid();
  };

  onSendMessage = () => {
    if (this.state.isValid)
      navigationStore.navigateTo("success");
    else
      alert("Some field is missing.");
  };

  public render() {
    return screenUtils.render(this);
  }
}
