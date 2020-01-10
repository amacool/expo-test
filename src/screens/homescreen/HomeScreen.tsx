import * as React from "react";
import * as screenUtils from './ScreenUtils';
import TabBarIcon from "../../components/TabBarIcon";
import images from "../../assets/images";
import navigationStore from "../../stores/navigationStore";

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
