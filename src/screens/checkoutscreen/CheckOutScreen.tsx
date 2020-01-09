import * as React from "react";
import { takeSnapshotAsync } from "expo";
import * as Font from "expo-font";
import * as screenUtils from "./ScreenUtils";
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from "expo-permissions";
import { AsyncStorage } from "react-native";
import states from "../../constants/States";
import navigationStore from "../../stores/navigationStore";

export default class CheckOutScreen extends React.Component<screenUtils.Props, screenUtils.State> {
  public imageRef;
  constructor(props) {
    super(props);
    this.state = {
      isFontLoaded: false,
      scrollPos: 0,
      idcardInfo: {
        name: "",
        state: "",
        issueDate: new Date(),
        birthday: new Date(),
        contact1: { name: "", phone: "" },
        medical: "",
        note: "",
        gender: "",
      },
      idcardRender: {
        name: "",
        state: "",
        issueDate: new Date(),
        birthday: new Date(),
        contact1: { name: "", phone: "" },
        medical: "",
        note: "",
        gender: "",
      },
      idcardInfoStatus: {
        photo: true,
        name: true,
        state: true,
        issueDate: true,
        birthday: true,
        contact1: true,
        medical: true,
        note: true,
        gender: true,
      },
      idcardInfoValidation: {
        photo: true,
        name: true,
        state: true,
        issueDate: true,
        birthday: true,
        contact1: true,
        medical: true,
        note: true,
        gender: true,
      },
      states: states,
      uploadPhoto: () => this.uploadPhoto(),
      changeStates: (key) => this.changeStates(key),
      changeName: (key) => this.changeName(key),
      changeBirth: (key) => this.changeBirth(key),
      changeGender: (key) => this.changeGender(key),
      changeContact1Name: (key) => this.changeContact1Name(key),
      changeContact1Phone: (key) => this.changeContact1Phone(key),
      changeContact2Name: (key) => this.changeContact2Name(key),
      changeContact2Phone: (key) => this.changeContact2Phone(key),
      changeMedical: (key) => this.changeMedical(key),
      changeNote: (key) => this.changeNote(key),
      createKidsId: () => this.createKidsId(),
    };
  }

  // componentWillMount() {
  //   this.keyboardDidShowListener = Keyboard.addListener(
  //     "keyboardDidShow",
  //     this._keyboardDidShow.bind(this),
  //   );
  // }

  // componentWillUnmount() {
  //   this.keyboardDidShowListener.remove();
  // }

  // _keyboardDidShow() {
  //   console.log("Keyboard Shown: ", this.state.scrollPos);
  //   let realOffset = this.state.scrollPos;
  //   if (realOffset < DEVICE_HEIGHT / 2) {
  //     realOffset += 0;
  //   } else if (realOffset > DEVICE_HEIGHT / 2) {
  //     realOffset -= 400;
  //   }
  //   console.log("Keyboard Shown: ", realOffset, DEVICE_HEIGHT);
  //   if (this.scrollView !== undefined) {
  //     this.scrollView.scrollTo({ x: 0, y: realOffset, animaged: true });
  //   }
  // }

  async componentDidMount() {
    await Font.loadAsync({
      "sf-heavy": require("../../assets/fonts/SF-Compact-Display-Heavy.ttf"),
      "sf-regular": require("../../assets/fonts/SF-UI-Display-Regular.ttf"),
      Roboto: require("../../assets/fonts/Roboto.ttf"),
      Roboto_medium: require("../../assets/fonts/Roboto_medium.ttf"),
      // 'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf')
    });
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
