import * as React from "react";
import { ActionSheet } from "native-base";
import * as screenUtils from "./ScreenUtils";
import { takeSnapshotAsync, FileSystem } from "expo";
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from "expo-permissions";
import { AsyncStorage } from "react-native";
import states from "../../constants/States";
import heights from "../../constants/Height";
import weight from "../../constants/Weight";
import eyescolors from "../../constants/EyeColor";
import haircolors from "../../constants/HairColor";
import ViewScreenSnapStore from "../../stores/viewScreenSnapStore";
import images from "../../assets/images";
import TabBarIcon from "../../components/TabBarIcon";
export default class MissingScreen extends React.Component<screenUtils.Props, screenUtils.State> {
  public static navigationOptions = {
    tabBarLabel: "Report",
    tabBarIcon: ({ focused }) => (
      <TabBarIcon focused={focused} active={images.tabInfoSelect} inactive={images.tabInfo} />
    ),
  };
  public imageRef;
  constructor(props) {
    super(props);
    this.state = {
      isFontLoaded: false,
      heights: heights,
      eyescolors: eyescolors,
      haircolors: haircolors,
      weight: weight,
      isIDSelected: false,
      scrollPos: 0,
      idcardInfo: {
        name: "",
        state: "",
        city: "",
        weight: 0,
        height: 0,
        haircolor: "",
        eyecolor: "",
        issueDate: new Date(),
        birthday: new Date(),
        missingDate: new Date(),
        contact1: "",
        contact2: "",
        medical: "",
        note: "",
        gender: "",
      },
      idcardRender: {
        name: "",
        state: "",
        city: "",
        weight: 0,
        height: 0,
        haircolor: "",
        eyecolor: "",
        issueDate: new Date(),
        birthday: new Date(),
        missingDate: new Date(),
        contact1: "",
        contact2: "",
        medical: "",
        note: "",
        gender: "",
      },
      idcardInfoStatus: {
        photo: true,
        name: true,
        statecity: true,
        weightheight: true,
        haireyescolor: true,
        issueDate: true,
        missingDate: true,
        birthday: true,
        contact: true,
        medical: true,
        note: true,
        gender: true,
      },
      idcardInfoValidation: {
        photo: true,
        name: true,
        statecity: true,
        weightheight: true,
        haireyescolor: true,
        issueDate: true,
        missingDate: true,
        birthday: true,
        contact: true,
        medical: false,
        note: true,
        gender: true,
      },
      states: states,
      chooseExistingID: () => this.chooseExistingID(),
      uploadPhoto: () => this.uploadPhoto(),
      changeName: (key) => this.changeName(key),
      changeStateName: (key) => this.changeStateName(key),
      changeCityName: (key) => this.changeCityName(key),
      changeWeight: (key) => this.changeWeight(key),
      changeHeight: (key) => this.changeHeight(key),
      changeHairColor: (key) => this.changeHairColor(key),
      changeEyesColor: (key) => this.changeEyesColor(key),
      changeMissingDate: (key) => this.changeMissingDate(key),
      changeBirth: (key) => this.changeBirth(key),
      changeGender: (key) => this.changeGender(key),
      changeMedical: (key) => this.changeMedical(key),
      changeNote: (key) => this.changeNote(key),
      changeContact1: (key) => this.changeContact1(key),
      changeContact2: (key) => this.changeContact2(key),
      createKidsId: () => this.createKidsId(),
    };
  }

  async componentDidMount() {
    this.setState({ isFontLoaded: true });
    const kidIds = await AsyncStorage.getItem("kidsMissingIds");
    const kidIdsArr = kidIds ? JSON.parse(kidIds) : [];
    console.log("kidIdsArr", kidIdsArr);
    if (kidIdsArr.length) {
      this.setState({
        idcardInfo: kidIdsArr[kidIdsArr.length - 1],
        idcardRender: kidIdsArr[kidIdsArr.length - 1],
      });
    }
  }

  async chooseExistingID() {
    const kidIds = await AsyncStorage.getItem("kidsids");
    const kidIdsArr = kidIds ? JSON.parse(kidIds) : [];
    let actionArr = [];
    console.log("kidIdsArr", kidIdsArr);
    if (kidIdsArr.length) {
      kidIdsArr.forEach((item, index) => {
        actionArr.push(item.name);
      });
    } else {
      actionArr = ["No Ids"];
    }
    ActionSheet.show(
      {
        options: actionArr,
        title: "Select Existing IDs",
      },
      (buttonIndex) => {
        console.log(buttonIndex, kidIdsArr[buttonIndex]);
        if (kidIdsArr[buttonIndex]) {
          const selectedKidsId = kidIdsArr[buttonIndex];
          let tempMissingCard = {
            photo: selectedKidsId.photo,
            name: selectedKidsId.name,
            state: selectedKidsId.state,
            city: "",
            weight: 0,
            height: 0,
            haircolor: "",
            eyecolor: "",
            issueDate: new Date(),
            birthday: selectedKidsId.birthday,
            missingDate: new Date(),
            contact1: selectedKidsId.contact1 ? selectedKidsId.contact1.phone : "",
            contact2: selectedKidsId.contact2 ? selectedKidsId.contact2.phone : "",
            medical: selectedKidsId.medical,
            note: selectedKidsId.note,
            gender: selectedKidsId.gender,
          };

          this.setState({
            idcardInfo: tempMissingCard,
            idcardRender: tempMissingCard,
            isIDSelected: true,
          });
        }
      },
    );
  }

  createKidsId = async () => {
    const data = this.state.idcardRender;
    const validObject = this.state.idcardInfoValidation;
    let isValid = true;

    const array = Object.keys(validObject);
    for (let i in array) {
      const key = array[i];
      if (key === "statecity") {
        if (validObject["statecity"] && !data["state"]) {
          alert("State field is required. Please fill out that.");
          isValid = false;
          return false;
        }
        if (validObject["statecity"] && !data["city"]) {
          alert("City field is required. Please fill out that.");
          isValid = false;
          return false;
        }
      } else if (key === "contact") {
        if (validObject["contact"] && !data["contact1"]) {
          alert("Contact fields is required. Please fill out that.");
          isValid = false;
          return false;
        }
        if (validObject["contact"] && !data["contact1"]) {
          alert("Contact fields is required. Please fill out that.");
          isValid = false;
          return false;
        }
      } else if (key === "weightheight") {
        if (validObject["weightheight"] && !data["weight"]) {
          alert("Weight fields is required. Please fill out that.");
          isValid = false;
          return false;
        }
        if (validObject["weightheight"] && !data["height"]) {
          alert("Height fields is required. Please fill out that.");
          isValid = false;
          return false;
        }
      } else if (key === "haireyescolor") {
        if (validObject["haireyescolor"] && !data["haircolor"]) {
          alert("Hair Color fields is required. Please fill out that.");
          isValid = false;
          return false;
        }
        if (validObject["haireyescolor"] && !data["eyecolor"]) {
          alert("Eyes Color fields is required. Please fill out that.");
          isValid = false;
          return false;
        }
      } else if (key === "photo") {
        if (validObject["photo"] && !data["photo"]) {
          alert("Photo is required. You must upload a photo.");
          isValid = false;
          return false;
        }
      } else if (key === "gender") {
        if (validObject["gender"] && !data["gender"]) {
          alert("Gender field is required. Please fill out that.");
          isValid = false;
          return false;
        }
      } else if (key === "note") {
        if (validObject["note"] && !data["note"]) {
          alert("Note field is required. Please fill out that.");
          isValid = false;
          return false;
        }
      } else {
        if (validObject[key] && !data[key]) {
          alert("Some fields is required. You must upload a photo.");
          isValid = false;
          return false;
        }
      }
    }
    if (isValid) {
      await ViewScreenSnapStore.screenShot(this.imageRef);
      const kidIds = await AsyncStorage.getItem("kidsMissingIds");
      let kidIdsArr = kidIds ? JSON.parse(kidIds) : [];
      kidIdsArr.push(data);
      await AsyncStorage.setItem("kidsMissingIds", JSON.stringify(kidIdsArr));
      // navigationStore.navigateTo("created");
      // this.setState({ isIDSelected: false });
    }
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

  changeName = (key) => {
    let someProperty = { ...this.state.idcardInfo };
    if (!key) delete someProperty.name;
    else someProperty.name = key;
    this.setState({ idcardRender: someProperty });
    this.setState({ idcardInfo: someProperty });
  };

  changeContact1 = (key) => {
    let someProperty = { ...this.state.idcardInfo };
    if (!key) delete someProperty.contact1;
    else {
      someProperty.contact1 = key;
      const _str = someProperty.contact1.split("-").join("");
      if (_str.length > 3 && _str.length < 6)
        someProperty.contact1 = _str.slice(0, 3) + "-" + _str.slice(3);
      if (_str.length > 6)
        someProperty.contact1 = _str.slice(0, 3) + "-" + _str.slice(3, 6) + "-" + _str.slice(6);
    }
    this.setState({ idcardRender: someProperty });
    this.setState({ idcardInfo: someProperty });
  };

  changeContact2 = (key) => {
    let someProperty = { ...this.state.idcardInfo };
    if (!key) delete someProperty.contact2;
    else {
      someProperty.contact2 = key;
      const _str = someProperty.contact2.split("-").join("");
      if (_str.length > 3 && _str.length < 6)
        someProperty.contact2 = _str.slice(0, 3) + "-" + _str.slice(3);
      if (_str.length > 6)
        someProperty.contact2 = _str.slice(0, 3) + "-" + _str.slice(3, 6) + "-" + _str.slice(6);
    }
    this.setState({ idcardRender: someProperty });
    this.setState({ idcardInfo: someProperty });
  };

  changeStateName = (key) => {
    let someProperty = { ...this.state.idcardInfo };
    console.log("-------: ", key);
    if (!key) delete someProperty.state;
    else someProperty.state = key;
    this.setState({ idcardRender: someProperty });
    this.setState({ idcardInfo: someProperty });
  };

  changeCityName = (key) => {
    let someProperty = { ...this.state.idcardInfo };
    if (!key) delete someProperty.city;
    else someProperty.city = key;
    this.setState({ idcardRender: someProperty });
    this.setState({ idcardInfo: someProperty });
  };

  changeWeight = (key) => {
    let someProperty = { ...this.state.idcardInfo };
    if (!key) delete someProperty.weight;
    else someProperty.weight = key;
    this.setState({ idcardRender: someProperty });
    this.setState({ idcardInfo: someProperty });
  };

  changeHeight = (key) => {
    let someProperty = { ...this.state.idcardInfo };
    if (!key) delete someProperty.height;
    else someProperty.height = key;
    this.setState({ idcardRender: someProperty });
    this.setState({ idcardInfo: someProperty });
  };

  changeHairColor = (key) => {
    let someProperty = { ...this.state.idcardInfo };
    if (!key) delete someProperty.haircolor;
    else someProperty.haircolor = key;
    this.setState({ idcardRender: someProperty });
    this.setState({ idcardInfo: someProperty });
  };

  changeEyesColor = (key) => {
    let someProperty = { ...this.state.idcardInfo };
    if (!key) delete someProperty.eyecolor;
    else someProperty.eyecolor = key;
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

  changeMissingDate = (key) => {
    let someProperty = { ...this.state.idcardInfo };
    someProperty.missingDate = key;
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
