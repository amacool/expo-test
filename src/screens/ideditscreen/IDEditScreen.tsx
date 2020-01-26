import * as ImagePicker from 'expo-image-picker';
import * as Permissions from "expo-permissions";
import * as React from "react";
import { AsyncStorage } from "react-native";
import states from "../../constants/States";
import navigationStore from "../../stores/navigationStore";
import * as screenUtils from "./ScreenUtils";
export default class IDEditScreen extends React.Component<screenUtils.Props, screenUtils.State> {
  public static navigationOptions = {
    title: "Edit your Kid's ID",
  };
  public imageRef;
  constructor(props) {
    super(props);
    console.log(props.navigation.state.params.card);
    const params = props.navigation.state.params;
    this.state = {
      idcardInfo: params.card,
      idcardRender: params.card,
      cardIndex: params.index,
      idcardInfoStatus: {
        name: !!params.card.name,
        birthday: !!params.card.birthday,
        breed: !!params.card.breed,
        gender: !!params.card.gender,
        color: !!params.card.color,
        contact:!!params.card.contact,
        contactoth: !!params.card.contactoth,
        address: !!params.card.address,
        city: !!params.card.city,
        state: !!params.card.state,
        zipcode: !!params.card.zipcode,
        country: !!params.card.country,
        note: !!params.card.note,
        issueDate: !!params.card.issueDate,
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
      states: states,
      uploadPhoto: () => this.onUploadPhoto(),
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
      let kidIdsArr = kidIds ? JSON.parse(kidIds) : [];
      kidIdsArr[this.state.cardIndex] = data;
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

  onUploadPhoto = async () => {
    await this.askPermissionsAsync();
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1
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
