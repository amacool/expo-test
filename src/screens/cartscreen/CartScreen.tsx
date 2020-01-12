import * as React from "react";
import { AsyncStorage, Alert, StyleSheet, Text, View, ViewStyle } from "react-native";
import { ExpoLinksView } from "@expo/samples";
import TabBarIcon from "../../components/TabBarIcon";
import images from "../../assets/images";
import * as screenUtils from "./ScreenUtils";
import navigationStore from "../../stores/navigationStore";

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
    if (this.state.isValid)
      navigationStore.navigateTo('checkout');
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

  _enterGitCode () {
    if (this.state.gitCode)
      this.setState({isVerifedGit: true});
    else
      alert("Enter code please");
  }

  public render() {
    return screenUtils.render(this);
  }
}

const styles = StyleSheet.create<InterfaceStyle>({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#fff",
  },
});
