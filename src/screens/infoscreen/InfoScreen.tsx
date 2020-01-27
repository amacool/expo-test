import * as React from "react";
import { ActionSheet } from "native-base";
import * as screenUtils from "./ScreenUtils";
import { takeSnapshotAsync, FileSystem } from "expo";
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from "expo-permissions";
import { AsyncStorage } from "react-native";
import states from "../../constants/States";
import images from "../../assets/images";
import TabBarIcon from "../../components/TabBarIcon";
import navigationStore from "../../stores/navigationStore";
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
      cardIndex: -1,
      idcardInfo: {
        name: "ROCKET",
        birthday: new Date(),
        breed: "",
        gender: "male",
        color: "",
        contact: "",
        contactoth: "",
        address: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        note: "",
        issueDate: new Date(),
        missingDate: new Date(),
      },
      idcardRender: {
        name: "ROCKET",
        birthday: new Date(),
        breed: "",
        gender: "male",
        color: "",
        contact: "",
        contactoth: "",
        address: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        note: "",
        issueDate: new Date(),
        missingDate: new Date(),
      },
      idcardInfoValidation: {
        photo: true,
        name: true,
        birthday: true,
        breed: true,
        gender: true,
        color: true,
        contact: true,
        contactoth: false,
        address: false,
        city: false,
        state: false,
        zipcode: false,
        country: false,
        note: true,
        issueDate: true,
        missingDate: true
      },
      isValid: false,
      isIDSelected: false,
      isRewarded: false,
      states: states,
      countries: states.map((item)=> item),
      uploadPhoto: () => this.uploadPhoto(),
      chooseExistingID: () => this.chooseExistingID(),
      changeInfo: (key, value) => this.onChangeInfo(key, value),
      changeContactInfo: (key, value) => this.onChangeContactInfo(key, value),
      createKidsId: () => this.createKidsId(),
    };
  }

  createKidsId = async () => {
    const data = this.state.idcardRender;
    const validObject = this.state.idcardInfoValidation;
    let isValid = true;
    const array = Object.keys(validObject);
    for (let i in array) {
      const key = array[i];
      if (validObject[key] && !data[key]) {
        console.log(key);
        alert("Some fields is required and you must upload a photo.");
        isValid = false;
        return false;
      }
    }
    if (isValid) {
      console.log(JSON.stringify(data));
      const kidIds = await AsyncStorage.getItem("petsIds");
      let petsIds = kidIds ? JSON.parse(kidIds) : [];
      petsIds[this.state.cardIndex] = data;
      await AsyncStorage.setItem("petsIds", JSON.stringify(petsIds));
      navigationStore.navigateTo("created");
    }
  };

  checkValid() {
    const data = this.state.idcardRender;
    const validObject = this.state.idcardInfoValidation;
    let isValid = true;
    const array = Object.keys(validObject);
    for (let i in array) {
      const key = array[i];
      if (validObject[key] && !data[key]) {
        isValid = false;
      }
    }
    this.setState({isValid});
  }

  async chooseExistingID() {
    const kidIds = await AsyncStorage.getItem("petsIds");
    const kidIdsArr = kidIds ? JSON.parse(kidIds) : [];
    let actionArr = [];
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

          this.setState({
            idcardInfo: {...selectedKidsId},
            idcardRender: {...selectedKidsId},
            isIDSelected: true
          });
        }
      },
    );
  }

  uploadPhoto = async () => {
    await this.askPermissionsAsync();
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (!result.cancelled) {
      let someProperty = { ...this.state.idcardInfo };
      someProperty.photo = result.uri;
      this.setState({ idcardInfo: someProperty });
      this.setState({ idcardRender: someProperty });
    }
    this.checkValid();
  };

  onChangeInfo = (key, value) => {
    let someProperty = { ...this.state.idcardInfo };
    if (!value) delete someProperty[key];
    else someProperty[key] = value;
    this.setState({ idcardInfo: someProperty });
    this.setState({ idcardRender: someProperty });
    this.checkValid();
  };

  onChangeContactInfo = (key, value) => {
    let phoneNumber = value;
    let someProperty = { ...this.state.idcardInfo };
    const _str = value.toString().split("-").join("");
    if (_str.length > 3 && _str.length < 6)
      phoneNumber = _str.slice(0, 3) + "-" + _str.slice(3);
    if (_str.length > 6)
      phoneNumber = _str.slice(0, 3) + "-" + _str.slice(3, 6) + "-" + _str.slice(6);
    someProperty[key] = phoneNumber;
    this.setState({ idcardInfo: someProperty });
    this.setState({ idcardRender: someProperty });
    this.checkValid();
  };

  askPermissionsAsync = async () => {
    try {
      await Permissions.askAsync(Permissions.CAMERA);
      await Permissions.askAsync(Permissions.CAMERA_ROLL);
    } catch (e) {
      console.log('permission Error', e);
    }
  };

  public render() {
    return screenUtils.render(this);
  }
}
