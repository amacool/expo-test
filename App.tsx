import * as React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Platform, StatusBar, StyleSheet, View, ViewStyle, Image } from "react-native";
import { Root } from "native-base";
// @ts-ignore
import { AppLoading} from "expo";
import * as Icon from "@expo/vector-icons";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import { Provider as MobxProvider, observer } from "mobx-react";
import { AppNavigator } from "./src/navigation/AppNavigator";
import NavigationStore from "./src/stores/navigationStore";

interface InterfaceProps {
  skipLoadingScreen?: boolean;
}

interface InterfaceState {
  isLoadingComplete: boolean;
}

interface InterfaceStyle {
  container: ViewStyle;
}
function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

function cacheFonts(fonts) {
  return fonts.map(font => Font.loadAsync(font));
}
@observer
export default class App extends React.Component<InterfaceProps, InterfaceState> {
  constructor(props) {
    super(props);
    this.state = {
      isLoadingComplete: false,
    };
  }

  public render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <SafeAreaProvider>
          <Root style={styles.container}>
            {Platform.OS === "ios" && <StatusBar barStyle="dark-content" hidden={false} backgroundColor="#F75356" />}
            <MobxProvider navigationStore={NavigationStore}>
              <AppNavigator ref={(r) => NavigationStore.setRef(r)} />
            </MobxProvider>
          </Root>
        </SafeAreaProvider>
      );
    }
  }

  _loadResourcesAsync = async (): Promise<any> => {
    return Promise.all([
      Asset.loadAsync([
        require("./src/assets/images/robot-dev.png"),
        require("./src/assets/images/robot-prod.png"),
        require("./src/assets/images/tab_icons/home_icon.png"),
        require("./src/assets/images/tab_icons/home_select.png"),
        require("./src/assets/images/tab_icons/cart_icon.png"),
        require("./src/assets/images/tab_icons/cart_select.png"),
        require("./src/assets/images/tab_icons/missing.png"),
        require("./src/assets/images/tab_icons/missing_selected.png"),
        require("./src/assets/images/tab_icons/created_icon.png"),
        require("./src/assets/images/tab_icons/created_select.png"),
        require("./src/assets/images/tab_icons/create_id.png"),
        require("./src/assets/images/tab_icons/create_id_unselected.png"),
        require("./src/assets/images/kidsid.png"),
        require("./src/assets/images/baby5-fix.png"),
        require("./src/assets/images/freekidslogo.png"),
        require("./src/assets/images/blank.png"),
        require("./src/assets/images/header-message.png"),
        require("./src/assets/images/header-check.png"),
        require("./src/assets/images/card-top.png"),
        require("./src/assets/images/button-gradient.png"),
        require("./src/assets/images/arrow-forward.png"),
        require("./src/assets/images/pulusIcon.png"),
        require("./src/assets/images/minusIcon.png"),
        require("./src/assets/images/check-out.png"),
        require("./src/assets/images/submit-order.png"),
        require("./src/assets/images/illustration.png"),
        require("./src/assets/images/create-dog-id.png"),
        require("./src/assets/images/use-existing.png"),
        require("./src/assets/images/download-photo.png"),
        require("./src/assets/images/create-poster.png"),
        require("./src/assets/images/save-id.png"),
        require("./src/assets/images/phone.png"),
        require("./src/assets/images/phone1.png"),
        require("./src/assets/images/birthday.png"),
        require("./src/assets/images/medical.png"),
        require("./src/assets/images/notes.png"),
        require("./src/assets/images/blankbaby.jpg"),
        require("./src/assets/images/babyid.png"),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        "space-mono": require("./src/assets/fonts/SpaceMono-Regular.ttf"),
        "Poppins-Regular": require("./src/assets/fonts/Poppins-Regular.ttf"),
        "sf-heavy": require("./src/assets/fonts/SF-Compact-Display-Heavy.ttf"),
        "sf-regular": require("./src/assets/fonts/SF-UI-Display-Regular.ttf"),
        'Roboto': require("./src/assets/fonts/Roboto.ttf"),
        'Roboto_medium': require("./src/assets/fonts/Roboto_medium.ttf"),
        'Metropolis-Bold': require("./src/assets/fonts/Metropolis-Bold.otf"),
        'Metropolis-Medium': require("./src/assets/fonts/Metropolis-Medium.otf"),
        'Metropolis-Thin': require("./src/assets/fonts/Metropolis-Thin.otf"),
        "grvibo-regular": require("./src/assets/fonts/GreatVibes-Regular.ttf"),
      }),
    ]);
  };

  _handleLoadingError = (error) => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create<InterfaceStyle>({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
