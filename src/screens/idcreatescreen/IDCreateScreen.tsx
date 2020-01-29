import * as React from "react";
import * as screenUtils from "./ScreenUtils";
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from "expo-permissions";
import { AsyncStorage } from "react-native";
import states from "../../constants/States";
import navigationStore from "../../stores/navigationStore";
import images from "../../assets/images";
import TabBarBigIcon from "../../components/TabBarBigIcon";
import { captureRef as takeSnapshotAsync } from 'react-native-view-shot';
import ViewScreenSnapStore from "../../stores/viewScreenSnapStore";

export default class IDCreateScreen extends React.Component<screenUtils.Props, screenUtils.State> {
  public imageRef;
  public static navigationOptions = {
    title: "",
    tabBarLabel: "",
    tabBarIcon: ({ focused }) => (
      <TabBarBigIcon
        focused={focused}
        active={images.tabCreateNew}
        inactive={images.tabCreateNewUnselected}
      />
    ),
  };
  constructor(props) {
    super(props);
    this.state = {
      scrollPos: 0,
      idcardInfo: {
        name: "",
        birthday: new Date(),
        breed: "",
        gender: "male",
        color: "",
        contact: "",
        contactoth: "",
        address: "",
        city: "",
        state: "CALIFORNIA",
        zipcode: "",
        country: "",
        note: "",
        issueDate: new Date(),
      },
      idcardRender: {
        name: "",
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
      },
      isValid: false,
      allCountryData: states,
      countries: states.map((item)=> item),
      states: states[0].states,
      uploadPhoto: () => this.uploadPhoto(),
      changeInfo: (key, value) => this.onChangeInfo(key, value),
      changeContactInfo: (key, value) => this.onChangeContactInfo(key, value),
      changeCountry: (value, index) => this.onChangeCountry(value, index),
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
      let result  = await takeSnapshotAsync(this.imageRef, {
        result: "tmpfile",
        width: 1013,
        height: 644,
        quality: 1,
        format: "png",
      });
      data.cardImage = result;
      await ViewScreenSnapStore.download(this.imageRef);
      console.log(data);
      const kidIds = await AsyncStorage.getItem("petsIds");
      let kidIdsArr = kidIds ? JSON.parse(kidIds) : [];
      kidIdsArr.push(data);
      await AsyncStorage.setItem("petsIds", JSON.stringify(kidIdsArr));
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
    this.setState({ isValid: isValid });
  }

  uploadPhoto = async () => {
    await this.askPermissionsAsync();
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1],
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1
      });

      console.log(result);

      if (!result.cancelled) {
        let someProperty = { ...this.state.idcardInfo };
        someProperty.photo = result.uri;
        this.setState({ idcardInfo: someProperty });
        this.setState({ idcardRender: someProperty });
      }
      this.checkValid();

    } catch (e) {
      console.log(e);
    }
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

  onChangeCountry = (value, index) => {
    let someProperty = { ...this.state.idcardInfo };
    delete someProperty['state'];
    someProperty['country'] = value;
    this.setState({ states: this.state.allCountryData[index].states });
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
