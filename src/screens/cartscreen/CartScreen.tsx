import * as React from "react";
import { AsyncStorage, Alert, StyleSheet, Text, View, ViewStyle } from "react-native";
import { ExpoLinksView } from "@expo/samples";
import TabBarIcon from "../../components/TabBarIcon";
import images from "../../assets/images";
import * as screenUtils from "./ScreenUtils";
import * as Font from "expo-font";
import navigationStore from "../../stores/navigationStore";
import ViewScreenSnapStore from "../../stores/viewScreenSnapStore";

interface InterfaceStyle {
  [key: string]: ViewStyle;
}

export default class CartScreen extends React.Component {
  public static navigationOptions = {
    tabBarLabel: "Cart",
    tabBarIcon: ({ focused }) => (
      <TabBarIcon focused={focused} active={images.tabCartSelect} inactive={images.tabCart} />
    ),
  };
  public imageRef;
  constructor(props) {
    super(props);
    this.state = {
      isVerifedGit: false,
      isFontLoaded: false,
      data: [],
      modalVisible: false,
      idcardInfo: {},
      viewId: (index)=> this._viewId(index),
      editId: (index)=> this._editId(index),
      enterGitCode: (index)=> this._enterGitCode(index),
      deleteId: (index)=> this._deleteId(index),
      downloadId: (index)=> this._downloadId(index),
    }
  }

  async componentDidMount() {
    await Font.loadAsync({
      'sf-heavy': require('../../assets/fonts/SF-Compact-Display-Heavy.ttf'),
      'sf-regular': require('../../assets/fonts/SF-UI-Display-Regular.ttf'),
      'Roboto': require('../../assets/fonts/Roboto.ttf'),
      'Roboto_medium': require('../../assets/fonts/Roboto_medium.ttf'),
      // 'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf')

    });
    this.setState({isFontLoaded: true});
    const kidIds = await AsyncStorage.getItem('kidsids');
    const kidIdsArr = (kidIds)? JSON.parse(kidIds) : [];
    console.log('kidIds', kidIds);
    this.setState({data: kidIdsArr});
  }

  async _viewId (index) {
    const _data = this.state.data;
    const isModal = this.state.modalVisible;
    this.setState({modalVisible: !isModal, idcardInfo: _data[index]});
    // const _data = this.state.data;
    // navigationStore.navigateTo('viewid', {card: _data[index], index: index});
  }

  async _downloadId (index) {
    await ViewScreenSnapStore.screenShot(this.imageRef, 1013/644);
  }

  async _editId (index) {
    const _data = this.state.data;
    navigationStore.navigateTo('checkout');
  }

  async _enterGitCode (code) {
    console.log('enter git');
    this.setState({isVerifedGit: true});
  }

  async _deleteId (index) {
    Alert.alert(
      'FreeKidsID',
      'Are you sure to delete this id card?',
      [
        {text: 'Delete', onPress: () => {
            const _data = this.state.data;
            _data.splice(index, 1);
            this.setState({data: _data});
            AsyncStorage.setItem('kidsids', JSON.stringify(_data));
          }},
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );
  }

  public render() {
    return this.state.isFontLoaded && screenUtils.render(this);
  }
}

const styles = StyleSheet.create<InterfaceStyle>({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#fff",
  },
});
