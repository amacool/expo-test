import * as React from "react";
import { takeSnapshotAsync } from "expo";
import * as screenUtils from "./ScreenUtils";
import states from "../../constants/States";
import navigationStore from "../../stores/navigationStore";
import Config from "../../Config";

export default class CheckOutScreen extends React.Component<screenUtils.Props, screenUtils.State> {
  public imageRef;
  constructor(props) {
    super(props);
    const params = props.navigation.state.params;
    this.state = {
      checkoutData: params.data,
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
        address: false,
        city: false,
        state: false,
        zipcode: false,
        country: false,
        issueDate: true,
      },
      isLoading: false,
      isValid: false,
      allCountryData: states,
      countries: states.map((item)=> item),
      states: states[0].states,
      changeInfo: (key, value) => this.onChangeInfo(key, value),
      changeCountry: (value, index) => this.onChangeCountry(value, index),
      checkOut: () => this.onCheckOut(),
    };
    console.log('this.state.checkoutData', params.data);
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
    // this.setState({ states: this.state.allCountryData[index].states });
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

  uploadData = async (url, data) => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let formData = new FormData();
    Object.keys(data).map(key => {
      formData.append(key, data[key]);
    });
    formData.append('file', {
      uri: data.cardImage,
      type: 'image/jpeg',
      name: `sm_${new Date().getTime()}`
    });

    let opts = {
      method: 'POST',
      headers: myHeaders,
      body: formData
    };

    return new Promise((res, rej) => {
      let xhr = new XMLHttpRequest();
      xhr.open(opts.method || 'get', url);
      for (let i in opts.headers || {})
        xhr.setRequestHeader(i, opts.headers[i]);
      xhr.onload = e => {
        return res(data);
      };
      xhr.onerror = error => {
        console.log('error===============;', error);
        return rej(error);
      };
      if (xhr.upload) xhr.upload.onprogress = (progress) => {
        console.log('progress', progress);
      };
      xhr.send(opts.body);
    });
  };

  onCheckOut = async () => {
    if (this.state.isValid) {
      let multiUpload = [];
      console.log(this.state.checkoutData);
      this.state.checkoutData.map(item =>
        multiUpload.push(this.uploadData(Config.checkoutEndpoint, item))
      );
      if (multiUpload.length) {
        Promise.all(multiUpload).then(result => {
          alert("Upload Success.");
          this.setState({isLoading: false});
          navigationStore.navigateTo("success");
        }, error => {
          console.log('error', error);
          alert(`Uploading Failed. ${JSON.stringify(error)}`);
          this.setState({isLoading: false});
          navigationStore.navigateTo("success");
        });
      }
    }
    else
      alert("Some field is missing.");
  };

  public render() {
    return screenUtils.render(this)
  }
}
