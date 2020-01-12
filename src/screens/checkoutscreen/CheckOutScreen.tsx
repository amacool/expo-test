import * as React from "react";
import { takeSnapshotAsync } from "expo";
import * as screenUtils from "./ScreenUtils";
import states from "../../constants/States";
import navigationStore from "../../stores/navigationStore";

export default class CheckOutScreen extends React.Component<screenUtils.Props, screenUtils.State> {
  public imageRef;
  constructor(props) {
    super(props);
    this.state = {
      checkOutInfo: {
        name: "",
        address: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        issueDate: new Date(),
      },
      checkOutInfoValidation: {
        name: true,
        address: true,
        city: true,
        state: false,
        zipcode: true,
        country: false,
        issueDate: true,
      },
      isValid: false,
      allCountryData: states,
      countries: states.map((item)=> item),
      states: states[0].states,
      changeInfo: (key, value) => this.onChangeInfo(key, value),
      changeCountry: (value, index) => this.onChangeCountry(value, index),
      checkOut: () => this.onCheckOut(),
    };
  }

  checkValid() {
    const data = this.state.checkOutInfo;
    const validObject = this.state.checkOutInfoValidation;
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

  onChangeCountry = (value, index) => {
    let someProperty = { ...this.state.checkOutInfo };
    delete someProperty['state'];
    someProperty['country'] = value;
    this.setState({ states: this.state.allCountryData[index].states });
    this.setState({ checkOutInfo: someProperty });
    this.checkValid();
  };

  onChangeInfo = (key, value) => {
    let someProperty = { ...this.state.checkOutInfo };
    if (!value) delete someProperty[key];
    else someProperty[key] = value;
    this.setState({ checkOutInfo: someProperty });
    this.checkValid();
  };

  onCheckOut = async () => {
    if (this.state.isValid)
      navigationStore.navigateTo("success");
    else
      alert("Some field is missing.");
  };

  public render() {
    return screenUtils.render(this)
  }
}
