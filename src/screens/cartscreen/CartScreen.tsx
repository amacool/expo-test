import * as React from "react";
import { AsyncStorage, StyleSheet, ViewStyle } from "react-native";
import { ExpoLinksView } from "@expo/samples";
import TabBarIcon from "../../components/TabBarIcon";
import images from "../../assets/images";
import * as screenUtils from "./ScreenUtils";
import navigationStore from "../../stores/navigationStore";
import {get} from "../../helpers/Request";
import Config from "../../Config";

interface InterfaceStyle {
  [key: string]: ViewStyle;
}

export default class CartScreen extends React.Component<screenUtils.Props, screenUtils.State> {
  public static navigationOptions = {
    tabBarLabel: "Shop",
    tabBarIcon: ({ focused }) => (
      <TabBarIcon focused={focused} active={images.tabCartSelect} inactive={images.tabCart} />
    ),
  };
  public imageRef;
  constructor(props) {
    super(props);
    this.state = {
      isVerifedGit: false,
      isLoading: false,
      data: [],
      gitCode: "",
      isValid: false,
      addCart: (index)=> this._addCart(index),
      deleteCart: (index)=> this._deleteCart(index),
      checkOut: ()=> this._checkOut(),
      changeGitCode: (code)=> this._changeGitCode(code),
      enterGitCode: ()=> this._enterGitCode(),
    }
  }

  async componentDidMount() {
    const _petsIds = await AsyncStorage.getItem('petsIds');
    const petsIds = (_petsIds)? JSON.parse(_petsIds) : [];
    let cartIds = petsIds.map(item => {
      let tempItem = item;
      tempItem.count = 0;
      return tempItem;
    });
    this.setState({data: cartIds});
  }

  checkValid() {
    let isValid = false;
    this.state.data.map(item => {
      if (item.count > 0) isValid = true;
    });
    this.setState({isValid});
  }

  _checkOut () {
    if (this.state.isValid) {
      let checkoutData = [];
      this.state.data.map(item => {
        if (item.count > 0) checkoutData.push(item);
      });
      navigationStore.navigateTo('checkout', {data: checkoutData});
    }
    else
      alert("Add one at least");
  }

  _addCart (index) {
    console.log('added', index);
    let tempData = this.state.data;
    tempData[index].count++;
    this.setState({data: tempData});
    this.checkValid();
  }

  _deleteCart (index) {
    console.log('deleted', index);
    let tempData = this.state.data;
    if (tempData[index].count > 0) tempData[index].count--;
    this.setState({data: tempData});
    this.checkValid();
  }

  _changeGitCode (code) {
    this.setState({gitCode: code});
  }

  async _enterGitCode () {
    if (this.state.gitCode) {
      this.setState({isLoading: true});
      fetch(Config.promoEndpoint, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'x-api-key': Config.xApiKey,
          'x-api-promo': this.state.gitCode,
          'Content-Type': 'application/json'
        },
      }).then(result => {
        console.log('result =============== ;', result);
        result.json().then(_r => {
          alert(_r.message);
          this.setState({isLoading: false, isVerifedGit: true});
        }, _e => {
          alert("Failed json parsing.");
          this.setState({isLoading: false});
        });

      }, error => {
        console.log('error =============== ;', error);
        alert("Network Failed!");
        this.setState({isLoading: false});
      });
    }
    else
      alert("Enter code please");
  }

  _handleContactPress = () => {
    navigationStore.navigateTo('contact');
  };

  public render() {
    return screenUtils.render(this);
  }
}
