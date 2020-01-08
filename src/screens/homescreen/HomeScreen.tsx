import * as React from "react";
import {  Font } from "expo";
import * as screenUtils from './ScreenUtils';
import TabBarIcon from "../../components/TabBarIcon";
import images from "../../assets/images";
import navigationStore from "../../stores/navigationStore";
import { AsyncStorage } from "react-native";

export default class HomeScreen extends React.Component<screenUtils.Props, screenUtils.State> {
  static navigationOptions = {
    tabBarLabel: "Home",
    tabBarIcon: ({ focused }) => (
      <TabBarIcon focused={focused} active={images.tabHomeSelect}  inactive={images.tabHome}/>
    ),
  };
  constructor(props) {
    super(props);
    this.state = {
      isFontLoaded: false,
      idcardInfo: {
        name: 'Rocky',
        state: 'CALIFORNIA',
        issueDate: new Date(),
        contact1: {name: 'PH', phone: '555-555-1234'},
        contact2: {name: 'PH', phone: '555-555-5678'},
        medical: 'POODLE',
        note: 'SUPERHERO',
      }
    };
  }
  async componentDidMount() {
    await Font.loadAsync({
      "sf-heavy": require("../../assets/fonts/SF-Compact-Display-Heavy.ttf"),
      "sf-regular": require("../../assets/fonts/SF-UI-Display-Regular.ttf"),
      'Metropolis-Bold': require("../../assets/fonts/Metropolis-Bold.otf"),
      'Metropolis-Medium': require("../../assets/fonts/Metropolis-Medium.otf"),
      Roboto: require("../../assets/fonts/Roboto.ttf"),
      Roboto_medium: require("../../assets/fonts/Roboto_medium.ttf"),
      // 'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf')
    });
    this.setState({isFontLoaded: true});
    // const dataStr = await AsyncStorage.getItem('kidsid');
    // console.log(dataStr);
    // if (dataStr) {
    //   const data = JSON.parse(dataStr);
    //   this.setState({idcardInfo: data});
    // }
  }
  public render() {
    return this.state.isFontLoaded && screenUtils.render(this);
  }

  _handleHelpPress = () => {
  // : { screen: TabNavigator('Create_id')},
  navigationStore.navigateTo('create_id');

  };
}
