import * as React from "react";
import { AsyncStorage, Alert } from "react-native";
import { ExpoLinksView } from "@expo/samples";
import TabBarIcon from "../../components/TabBarIcon";
import images from "../../assets/images";
import * as screenUtils from "./ScreenUtils";
import navigationStore from "../../stores/navigationStore";
import ViewScreenSnapStore from "../../stores/viewScreenSnapStore";

export default class CreatedScreen extends React.Component {
  public static navigationOptions = {
    tabBarLabel: "IDs",
    tabBarIcon: ({ focused }) => (
      <TabBarIcon focused={focused} active={images.tabCreatedSelect}  inactive={images.tabCreated}/>
    ),
  };
  public imageRef;
  constructor(props) {
    super(props);
    this.state = {
      isFontLoaded: false,
      data: [],
      modalVisible: false,
      idcardInfo: {},
      viewId: (index)=> this._viewId(index),
      editId: (index)=> this._editId(index),
      deleteId: (index)=> this._deleteId(index),
      downloadId: (index)=> this._downloadId(index),
    }
  }

  async componentDidMount() {
    this.setState({isFontLoaded: true});
    const kidIds = await AsyncStorage.getItem('petsIds');
    const kidIdsArr = (kidIds)? JSON.parse(kidIds) : [];
    this.setState({data: kidIdsArr});
  }

  async _viewId (index) {
    const _data = this.state.data;
    navigationStore.navigateTo('viewid', {card: _data[index], index: index});
  }

  async _downloadId (index) {
    await ViewScreenSnapStore.download(this.imageRef);
  }

  async _editId (index) {
    const _data = this.state.data;
    navigationStore.navigateTo('editid', {card: _data[index], index: index});
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
            AsyncStorage.setItem('petsIds', JSON.stringify(_data));
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
    return screenUtils.render(this);
  }
}
