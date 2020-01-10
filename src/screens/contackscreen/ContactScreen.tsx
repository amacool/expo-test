import * as React from "react";
import { takeSnapshotAsync } from "expo";
import * as screenUtils from "./ScreenUtils";
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from "expo-permissions";
import { AsyncStorage } from "react-native";
import navigationStore from "../../stores/navigationStore";

export default class ContactScreen extends React.Component<screenUtils.Props, screenUtils.State> {
  public imageRef;
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  async componentDidMount() {
    this.setState({ isFontLoaded: true });
    const dataStr = await AsyncStorage.getItem("kidsid");
    if (dataStr) {
      const data = JSON.parse(dataStr);
      const parsing = { ...data };
      setTimeout(() => {
        // this.setState({idcardInfo: parsing, idcardRender: parsing});
      }, 500);
    }
  }

  createKidsId = async () => {
    navigationStore.navigateTo("success");
  };

  uploadPhoto = async () => {
    await this.askPermissionsAsync();
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
    });

    console.log(result);

    if (!result.cancelled) {
      let someProperty = { ...this.state.idcardInfo };
      someProperty.photo = result.uri;
      this.setState({ idcardInfo: someProperty });
      this.setState({ idcardRender: someProperty });
    }
  };

  changeStates = (key) => {
    let someProperty = { ...this.state.idcardInfo };
    if (!key) delete someProperty.state;
    else someProperty.state = key;
    this.setState({ idcardInfo: someProperty });
    this.setState({ idcardRender: someProperty });
  };

  changeName = (key) => {
    let someProperty = { ...this.state.idcardInfo };
    if (!key) delete someProperty.name;
    else someProperty.name = key;
    this.setState({ idcardRender: someProperty });
    this.setState({ idcardInfo: someProperty });
  };

  changeGender = (key) => {
    let someProperty = { ...this.state.idcardInfo };
    someProperty.gender = key;
    this.setState({ idcardInfo: someProperty });
    this.setState({ idcardRender: someProperty });
  };

  changeBirth = (key) => {
    let someProperty = { ...this.state.idcardInfo };
    someProperty.birthday = key;
    this.setState({ idcardInfo: someProperty });
    this.setState({ idcardRender: someProperty });
  };

  changeContact1Name = (key) => {
    let someProperty = { ...this.state.idcardInfo };
    let contactPro = { ...someProperty.contact1 };
    contactPro.name = key;
    someProperty.contact1 = contactPro;
    this.setState({ idcardInfo: someProperty });
    this.setState({ idcardRender: someProperty });
  };

  changeContact1Phone = (key) => {
    let someProperty = { ...this.state.idcardInfo };
    let contactPro = { ...someProperty.contact1 };
    contactPro.phone = key;
    const _str = contactPro.phone.split("-").join("");
    if (_str.length > 3 && _str.length < 6)
      contactPro.phone = _str.slice(0, 3) + "-" + _str.slice(3);
    if (_str.length > 6)
      contactPro.phone = _str.slice(0, 3) + "-" + _str.slice(3, 6) + "-" + _str.slice(6);
    someProperty.contact1 = contactPro;
    this.setState({ idcardInfo: someProperty });
    this.setState({ idcardRender: someProperty });
  };
  changeContact2Name = (key) => {
    let someProperty = { ...this.state.idcardInfo };
    let contactPro = { ...someProperty.contact2 };
    contactPro.name = key;
    someProperty.contact2 = contactPro;
    this.setState({ idcardInfo: someProperty });
    this.setState({ idcardRender: someProperty });
  };

  changeContact2Phone = (key) => {
    let someProperty = { ...this.state.idcardInfo };
    let contactPro = { ...someProperty.contact2 };
    contactPro.phone = key;
    const _str = contactPro.phone.split("-").join("");
    if (_str.length > 3 && _str.length < 6)
      contactPro.phone = _str.slice(0, 3) + "-" + _str.slice(3);
    if (_str.length > 6)
      contactPro.phone = _str.slice(0, 3) + "-" + _str.slice(3, 6) + "-" + _str.slice(6);
    someProperty.contact2 = contactPro;
    this.setState({ idcardInfo: someProperty });
    this.setState({ idcardRender: someProperty });
  };

  changeMedical = (key) => {
    let someProperty = { ...this.state.idcardInfo };
    someProperty.medical = key;
    this.setState({ idcardInfo: someProperty });
    this.setState({ idcardRender: someProperty });
  };

  changeNote = (key) => {
    let someProperty = { ...this.state.idcardInfo };
    someProperty.note = key;
    this.setState({ idcardInfo: someProperty });
    this.setState({ idcardRender: someProperty });
  };

  askPermissionsAsync = async () => {
    await Permissions.askAsync(Permissions.CAMERA);
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    // you would probably do something to verify that permissions
    // are actually granted, but I'm skipping that for brevity
  };

  public render() {
    return this.state.isFontLoaded && screenUtils.render(this);
  }

  _handleHelpPress = () => {};
}
