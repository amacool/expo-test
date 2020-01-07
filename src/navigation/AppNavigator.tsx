import { NativeModules } from "react-native";
import { createBottomTabNavigator, createStackNavigator, NavigationRouteConfigMap, StackNavigatorConfig, TabNavigatorConfig } from "react-navigation";
import TabBar from "../components/TabBar";
import Colors from "../constants/Colors";
import CreatedScreen from "../screens/createdscreen/CreatedScreen";
import HomeScreen from "../screens/homescreen/HomeScreen";
import IDCreateScreen from "../screens/idcreatescreen/IDCreateScreen";
import IDEditScreen from "../screens/ideditscreen/IDEditScreen";
import IDViewScreen from "../screens/idviewscreen/IDViewScreen";
import InfoScreen from "../screens/infoscreen/InfoScreen";



const { PlatformConstants } = NativeModules;

const TabRoutes: NavigationRouteConfigMap = {
  Home: { screen: HomeScreen },
  Created: { screen: CreatedScreen },
  Create_id: { screen: IDCreateScreen },
  Info: { screen: InfoScreen },
};
let tabsOptions: TabNavigatorConfig = {
  initialRouteName: "Home",
  tabBarComponent: TabBar,
  tabBarOptions: {
    indicatorStyle: {
      opacity: 0,
    },
    style: {
      backgroundColor: "#fff",
      overflow: "visible",
      borderWidth: 0,
      elevation: 0,
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
    },
    labelStyle: {
      fontSize: PlatformConstants.interfaceIdiom == 'pad' ? 20 : 10,
      backgroundColor: Colors.tabBar,
    },
    activeTintColor: Colors.tintColor,
    inactiveTintColor: Colors.tabIconDefault,
    showIcon: true,
    showLabel: true,
  },
  swipeEnabled: false,
  animationEnabled: false,
  lazy: true,
};
const TabNavigator = (key) => {
  tabsOptions.initialRouteName = key;
  const tabNavigator = createBottomTabNavigator(TabRoutes, tabsOptions);
  tabNavigator.navigationOptions = ({ navigation }) => {
    // let { routeName } = navigation.state.routes[navigation.state.index];
    return {
      header: null,
    };
  };
  return tabNavigator;
};

const MainRoutes: NavigationRouteConfigMap = {
  main: { screen: TabNavigator("Home") },
  createid: { screen: IDCreateScreen },
  editid: { screen: IDEditScreen },
  viewid: { screen: IDViewScreen },
  created: { screen: TabNavigator("Created") },
  // cart: { screen: TabNavigator('Cart')},
  create_id: { screen: TabNavigator("Create_id") },

  info: { screen: TabNavigator("Info") },
};

const navigatorOptions: StackNavigatorConfig = {
  initialRouteName: "main",
  headerMode: "screen",
  navigationOptions: {
    header: null,
  },
};

export const AppNavigator = createStackNavigator(MainRoutes, navigatorOptions);
