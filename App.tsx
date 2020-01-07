import * as React from "react";
import { Platform, StatusBar, StyleSheet, View, ViewStyle } from "react-native";
import { Root } from "native-base";
// @ts-ignore
import { AppLoading, Asset, Font, Icon } from "expo";
import { Provider as MobxProvider } from "mobx-react";
import { AppNavigator } from "./src/navigation/AppNavigator";
import NavigationStore from "./src/stores/navigationStore";
import { observer } from "mobx-react/native";

interface InterfaceProps {
  skipLoadingScreen?: boolean;
}

interface InterfaceState {
  isLoadingComplete: boolean;
}

interface InterfaceStyle {
  container: ViewStyle;
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
        <Root style={styles.container}>
          {Platform.OS === "ios" && <StatusBar barStyle="default" />}
          <MobxProvider navigationStore={NavigationStore}>
            <AppNavigator ref={(r) => NavigationStore.setRef(r)} />
          </MobxProvider>
        </Root>
      );
    }
  }

  _loadResourcesAsync = async (): Promise<any> => {
    return Promise.all([
      Asset.loadAsync([
        require("./src/assets/images/robot-dev.png"),
        require("./src/assets/images/robot-prod.png"),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        "space-mono": require("./src/assets/fonts/SpaceMono-Regular.ttf"),
        "Poppins-Regular": require("./src/assets/fonts/Poppins-Regular.ttf"),
        Roboto: require("./src/assets/fonts/Roboto.ttf"),
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
