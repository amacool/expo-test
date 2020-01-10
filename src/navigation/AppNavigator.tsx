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
import CartScreen from "../screens/cartscreen/CartScreen";
import CheckOutScreen from "../screens/checkoutscreen/CheckOutScreen";
import SuccessScreen from "../screens/successscreen/SuccessScreen";
import ContactScreen from "../screens/contackscreen/ContactScreen";



const { PlatformConstants } = NativeModules;

const TabRoutes: NavigationRouteConfigMap = {
  Home: { screen: HomeScreen },
  Created: { screen: CreatedScreen },
  Create_id: { screen: IDCreateScreen },
  Cart: { screen: CartScreen },
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
      borderTopRightRadius: 10,
      borderTopLeftRadius: 10,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: -3,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3.00,

      elevation: 3,
      overflow: "visible",
      borderWidth: 1,
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
  checkout: { screen: CheckOutScreen },
  contact: { screen: ContactScreen },
  viewid: { screen: IDViewScreen },
  success: { screen: SuccessScreen },
  created: { screen: TabNavigator("Created") },
  cart: { screen: TabNavigator('Cart')},
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
