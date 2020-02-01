import * as React from "react";
import { Animated, AppState, Dimensions, Platform, StyleSheet, TouchableWithoutFeedback, View,TouchableOpacity } from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import images from "../assets/images";
import Colors from "../constants/Colors";
import navigationStore from "../stores/navigationStore";
import CrossFadeIcon from "./CrossFadeIcon";

function isIphoneXorAbove() {
  const dimen = Dimensions.get("window");
  return (
    Platform.OS === "ios" &&
    (dimen.height === 812 || dimen.width === 812 || (dimen.height === 896 || dimen.width === 896))
  );
}

class TouchableWithoutFeedbackWrapper extends React.Component<any> {
  render() {
    const { onPress, testID, accessibilityLabel, ...props } = this.props;

    return (
      <TouchableWithoutFeedback
        onPress={onPress}
        testID={testID}
        hitSlop={{ left: 15, right: 15, top: 5, bottom: 5 }}
        accessibilityLabel={accessibilityLabel}
      >
        <View {...props} />
      </TouchableWithoutFeedback>
    );
  }
}

// Define PropTypes
export type TabBarOptions = {
  activeTintColor?: string;
  inactiveTintColor?: string;
  activeBackgroundColor?: string;
  inactiveBackgroundColor?: string;
  allowFontScaling: boolean;
  showLabel: boolean;
  showIcon: boolean;
  labelStyle: any;
  tabStyle: any;
  adaptive?: boolean;
  style: any;
};

type Props = TabBarOptions & {
  navigation: any;
  descriptors: any;
  jumpTo: any;
  onTabPress: any;
  getAccessibilityLabel: (props: { route: any }) => string;
  getButtonComponent: (props: { route: any }) => any;
  getLabelText: (props: { route: any }) => any;
  getTestID: (props: { route: any }) => string;
  renderIcon: any;
  dimensions: { width: number; height: number };
  isLandscape: boolean;
  safeAreaInset: { top: string; right: string; bottom: string; left: string };
};

type States = {
  imageOpacity: Animated.Value;
  textOpacity: Animated.Value;
  appState: string;
  onPress: () => void;
};

const majorVersion = parseInt(`${Platform.Version}`, 10);
const isIos = Platform.OS === "ios";
const isIOS11 = majorVersion >= 11 && isIos;
const isIPad = false;

const DEFAULT_MAX_TAB_ITEM_WIDTH = 125;

class TabBar extends React.Component<Props, States> {
  static defaultProps = {
    activeTintColor: "#007AFF",
    activeBackgroundColor: "transparent",
    inactiveTintColor: "#8E8E93",
    inactiveBackgroundColor: "transparent",
    showLabel: true,
    showIcon: true,
    allowFontScaling: true,
    adaptive: isIOS11,
    safeAreaInset: { bottom: "always", top: "never" },
  };
  constructor(props) {
    super(props);
    this.state = {
      imageOpacity: new Animated.Value(0),
      textOpacity: new Animated.Value(1),
      appState: "active",
      onPress: () => { },
    };
  }
  componentDidMount = () => {
    AppState.addEventListener("change", this._handleAppStateChange);
    this.startAnimation();

    this.props.navigation.addListener("willFocus", (payload) => {
      this.startAnimation();
    });
  };
  startAnimation = () => {
    const duration = 2000;
    Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(this.state.textOpacity, {
            toValue: 0,
            duration,
          }),
          Animated.timing(this.state.imageOpacity, {
            toValue: 1,
            duration,
          }),
        ]),
        Animated.parallel([
          Animated.timing(this.state.imageOpacity, {
            toValue: 0,
            duration,
          }),
          Animated.timing(this.state.textOpacity, {
            toValue: 1,
            duration,
          }),
        ]),
      ]),
      {
        iterations: -1,
      },
    ).start();
  };
  _renderLabel = ({ route, focused }) => {
    const {
      activeTintColor,
      inactiveTintColor,
      labelStyle,
      showLabel,
      showIcon,
      allowFontScaling,
    } = this.props;

    const label = this.props.getLabelText({ route });
    const tintColor = focused ? activeTintColor : inactiveTintColor;

    if (typeof label === "string") {
      return (
        <Animated.Text
          numberOfLines={1}
          style={[
            styles.label,
            { color: tintColor },
            showIcon && this._shouldUseHorizontalLabels()
              ? styles.labelBeside
              : styles.labelBeneath,
            labelStyle,
          ]}
          allowFontScaling={allowFontScaling}
        >
          {label}
        </Animated.Text>
      );
    }

    if (typeof label === "function") {
      return label({ route, focused, tintColor });
    }

    return label;
  };
  componentWillUnmount() {
    AppState.removeEventListener("change", this._handleAppStateChange);
  }
  _handleAppStateChange = (nextAppState) => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === "active") {
    }
    this.setState({ appState: nextAppState });
  };
  _renderIcon = ({ route, focused }) => {
    const {
      navigation,
      activeTintColor,
      inactiveTintColor,
      renderIcon,
      showIcon,
      showLabel,
    } = this.props;
    if (showIcon === false) {
      return null;
    }

    const horizontal = this._shouldUseHorizontalLabels();

    const activeOpacity = focused ? 1 : 0;
    const inactiveOpacity = focused ? 0 : 1;

    return (
      <CrossFadeIcon
        route={route}
        horizontal={horizontal}
        navigation={navigation}
        activeOpacity={activeOpacity}
        inactiveOpacity={inactiveOpacity}
        activeTintColor={activeTintColor}
        inactiveTintColor={inactiveTintColor}
        renderIcon={renderIcon}
        style={[
          styles.iconWithExplicitHeight,
          showLabel === false && !horizontal && styles.iconWithoutLabel,
          showLabel !== false && !horizontal && styles.iconWithLabel,
        ]}
      />
    );
  };

  _shouldUseHorizontalLabels = () => {
    const { routes } = this.props.navigation.state;
    const { isLandscape, dimensions, adaptive, tabStyle } = this.props;

    if (!adaptive) {
      return false;
    }

    if (isIPad) {
      let maxTabItemWidth = DEFAULT_MAX_TAB_ITEM_WIDTH;

      const flattenedStyle: any = StyleSheet.flatten(tabStyle);

      if (flattenedStyle) {
        if (typeof flattenedStyle.width === "number") {
          maxTabItemWidth = flattenedStyle.width;
        } else if (typeof flattenedStyle.maxWidth === "number") {
          maxTabItemWidth = flattenedStyle.maxWidth;
        }
      }

      return routes.length * maxTabItemWidth <= dimensions.width;
    } else {
      return isLandscape;
    }
  };

  render() {
    const {
      navigation,
      activeBackgroundColor,
      inactiveBackgroundColor,
      onTabPress,
      safeAreaInset,
      style,
      tabStyle,
    } = this.props;

    const floatingButtonTextAnimated = {
      opacity: this.state.textOpacity,
    };
    const floatingButtonImageAnimated = {
      opacity: this.state.imageOpacity,
    };
    const { routes } = navigation.state;

    const tabBarStyle = [
      styles.tabBar,
      this._shouldUseHorizontalLabels() && !isIPad
        ? styles.tabBarWrapperCompact
        : styles.tabBarWrapperRegular,
      style,
    ];

    const tabBarInternalStyle = [
      styles.tabBarInternal,
      this._shouldUseHorizontalLabels() && !isIPad ? styles.tabBarCompact : styles.tabBarRegular,
    ];

    const tabBarButtons: any[] = routes.map((route, index) => {
      const focused = index === navigation.state.index;
      const scene = { route, focused };
      const accessibilityLabel = this.props.getAccessibilityLabel({
        route,
      });
      const testID = this.props.getTestID({ route });

      const backgroundColor = focused ? activeBackgroundColor : inactiveBackgroundColor;

      const ButtonComponent =
        this.props.getButtonComponent({ route }) || TouchableWithoutFeedbackWrapper;

      if (!route.key) {
        return null;
      }

      if (index === 2) {
        return (
          <ButtonComponent
            key={route.key}
            onPress={() => onTabPress({ route })}
            testID={testID}
            accessibilityLabel={accessibilityLabel}
            style={[
              styles.tab,
              this._shouldUseHorizontalLabels() ? styles.tabLandscape : styles.tabPortrait,
              tabStyle,
              {
                zIndex: 300,
                marginTop: -40
              }
            ]}
          >
              {this._renderIcon(scene)}
          </ButtonComponent>
        );
      }
      else 
        return (
          <ButtonComponent
            key={route.key}
            onPress={() => onTabPress({ route })}
            testID={testID}
            accessibilityLabel={accessibilityLabel}
            style={[
              styles.tab,
              this._shouldUseHorizontalLabels() ? styles.tabLandscape : styles.tabPortrait,
              tabStyle,
              {paddingTop: 10}
            ]}
          >
              {this._renderIcon(scene)}
              {this._renderLabel(scene)}
          </ButtonComponent>
        );
    });

    const floatingButtonFillerStyles = [
      styles.floatingButtonFiller,
      this._shouldUseHorizontalLabels() && !isIPad
        ? styles.floatingButtonFillerCompact
        : styles.floatingButtonFillerRegular,
    ];
    const floatingButtonWrapperStyles = [
      styles.floatingButtonWrapper,
      this._shouldUseHorizontalLabels() && !isIPad
        ? styles.floatingButtonWrapperCompact
        : styles.floatingButtonWrapperRegular,
    ];
    const floatingButtonBackgroundStyles = [
      styles.floatingButtonBackground,
      this._shouldUseHorizontalLabels() && !isIPad
        ? styles.floatingButtonBackgroundCompact
        : styles.floatingButtonBackgroundRegular,
    ];
    const floatingButtonStyles = [
      styles.floatingButton,
      this._shouldUseHorizontalLabels() && !isIPad
        ? styles.floatingButtonCompact
        : styles.floatingButtonRegular,
    ];

    const iPhoneXBottomFillerStyles = [styles.iPhoneXBottomFillerStyles];

    const floatingButton = (
      <View style={floatingButtonWrapperStyles} pointerEvents="box-none">
        <TouchableWithoutFeedback onPress={() => navigationStore.navigateTo("createid")}>
          <View style={floatingButtonStyles}>
            <Animated.Text style={[styles.floatingButtonText, floatingButtonTextAnimated]}>
              Create ID
            </Animated.Text>
            <Animated.Image
              source={images.tabCreateNew}
              style={[styles.floatingButtonImage, floatingButtonImageAnimated]}
            />
          </View>
        </TouchableWithoutFeedback>
        <View style={floatingButtonBackgroundStyles} />
      </View>
    );
    const floatingButtonFiller = (
      <View style={floatingButtonFillerStyles} pointerEvents="box-none" />
    );

    return (
      <SafeAreaView style={[tabBarStyle, {height: 90, backgroundColor: '#0000000', borderRadius: 0, shadowOpacity: 0, shadowColor: "transparent", elevation: 0, borderWidth: 0}]} pointerEvents="box-none" forceInset={{ bottom: "never" }}>
        <View style={StyleSheet.flatten([tabBarInternalStyle, styles.tabBarInternal, { height: 90, backgroundColor: '#00000000'}])}>
          <View style={{flexDirection: 'row', width: '100%', backgroundColor: '#fff', marginTop: 30, borderTopRightRadius: 10, borderTopLeftRadius: 10, shadowColor: '#000', shadowOffset:0, shadowOpacity: 0,elevation: 0}}>
            {tabBarButtons.filter((i, index) => index < Math.floor(tabBarButtons.length / 2))}
            {/*{floatingButtonFiller}*/}
            {tabBarButtons.filter((i, index) => index >= Math.floor(tabBarButtons.length / 2))}
          </View>
        </View>
        {isIphoneXorAbove() && <View style={iPhoneXBottomFillerStyles} />}
         {/*{floatingButton}*/}
      </SafeAreaView>
    );
  }
}

const DEFAULT_HEIGHT = 49;
const COMPACT_HEIGHT = 29;

const DEFAULT_IPHONEX_BOTTOM_PADDING = isIphoneXorAbove() ? 35 : 0;

const DEFAULT_FLOATING_BUTTON_GAP = 10;
const COMPACT_FLOATING_BUTTON_GAP = 7;
const FLOATING_BUTTON_HEIGHT_RATIO = 2 / 3;

const styles = StyleSheet.create({
  tabBar: {
    overflow: "visible",
    backgroundColor: Colors.black,
    borderTopWidth: 0,
    borderTopColor: "rgba(0, 0, 0, 0)",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "stretch"
  },
  tabBarInternal: {
    overflow: "visible",
    flexDirection: "row",
    backgroundColor: Colors.tabBar,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderTopWidth: 0,
    borderTopColor: Colors.tabIconDefault,
    justifyContent: "space-between",
    paddingVertical: 0,
  },
  floatingButtonWrapper: {
    backgroundColor: Colors.transparent,
    alignSelf: "flex-end",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    position: "absolute",
  },
  floatingButtonFiller: {
    backgroundColor: Colors.transparent,
    alignSelf: "flex-end",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  floatingButtonBackground: {
    overflow: "visible",
    backgroundColor: Colors.transparent,
    alignSelf: "flex-start",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    position: "absolute",
  },
  floatingButtonWrapperCompact: {
    height:
      DEFAULT_IPHONEX_BOTTOM_PADDING +
      COMPACT_HEIGHT +
      (COMPACT_HEIGHT - COMPACT_FLOATING_BUTTON_GAP) * FLOATING_BUTTON_HEIGHT_RATIO,
    width: COMPACT_HEIGHT * FLOATING_BUTTON_HEIGHT_RATIO * 2,
    left: Dimensions.get("screen").width / 2 - COMPACT_HEIGHT * FLOATING_BUTTON_HEIGHT_RATIO,
  },
  floatingButtonWrapperRegular: {
    height:
      DEFAULT_IPHONEX_BOTTOM_PADDING +
      DEFAULT_HEIGHT +
      (DEFAULT_HEIGHT - DEFAULT_FLOATING_BUTTON_GAP) * FLOATING_BUTTON_HEIGHT_RATIO,
    width: DEFAULT_HEIGHT * FLOATING_BUTTON_HEIGHT_RATIO * 2,
    left: Dimensions.get("screen").width / 2 - DEFAULT_HEIGHT * FLOATING_BUTTON_HEIGHT_RATIO,
  },
  floatingButtonFillerCompact: {
    height: COMPACT_HEIGHT * (1 + FLOATING_BUTTON_HEIGHT_RATIO),
    width: COMPACT_HEIGHT * FLOATING_BUTTON_HEIGHT_RATIO * 2,
  },
  floatingButtonFillerRegular: {
    height: DEFAULT_HEIGHT * (1 + FLOATING_BUTTON_HEIGHT_RATIO),
    width: DEFAULT_HEIGHT * FLOATING_BUTTON_HEIGHT_RATIO * 2,
  },
  floatingButtonBackgroundCompact: {
    borderBottomLeftRadius: COMPACT_HEIGHT * FLOATING_BUTTON_HEIGHT_RATIO,
    borderBottomRightRadius: COMPACT_HEIGHT * FLOATING_BUTTON_HEIGHT_RATIO,
    width: COMPACT_HEIGHT * FLOATING_BUTTON_HEIGHT_RATIO * 2,
    paddingBottom: COMPACT_FLOATING_BUTTON_GAP * FLOATING_BUTTON_HEIGHT_RATIO,
    height: COMPACT_HEIGHT * FLOATING_BUTTON_HEIGHT_RATIO,
    top: (COMPACT_HEIGHT - COMPACT_FLOATING_BUTTON_GAP) * FLOATING_BUTTON_HEIGHT_RATIO,
  },
  floatingButtonBackgroundRegular: {
    borderBottomLeftRadius: DEFAULT_HEIGHT * FLOATING_BUTTON_HEIGHT_RATIO,
    borderBottomRightRadius: DEFAULT_HEIGHT * FLOATING_BUTTON_HEIGHT_RATIO,
    width: DEFAULT_HEIGHT * FLOATING_BUTTON_HEIGHT_RATIO * 2,
    paddingBottom: DEFAULT_FLOATING_BUTTON_GAP * FLOATING_BUTTON_HEIGHT_RATIO,
    height: DEFAULT_HEIGHT * FLOATING_BUTTON_HEIGHT_RATIO,
    top: (DEFAULT_HEIGHT - DEFAULT_FLOATING_BUTTON_GAP) * FLOATING_BUTTON_HEIGHT_RATIO,
  },
  floatingButton: {
    backgroundColor: Colors.tintColor,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  iPhoneXBottomFillerStyles: {
    height: DEFAULT_IPHONEX_BOTTOM_PADDING,
    backgroundColor: Colors.transparent,
  },
  floatingButtonText: {
    paddingHorizontal: 50,
    color: Colors.white,
    fontWeight: "bold",
    fontSize: 12,
    position: "absolute",
  },
  floatingButtonImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    backgroundColor: Colors.transparent,
    position: "absolute",
  },
  floatingButtonCompact: {
    borderBottomLeftRadius:
      (COMPACT_HEIGHT - COMPACT_FLOATING_BUTTON_GAP) * FLOATING_BUTTON_HEIGHT_RATIO,
    borderBottomRightRadius:
      (COMPACT_HEIGHT - COMPACT_FLOATING_BUTTON_GAP) * FLOATING_BUTTON_HEIGHT_RATIO,
    borderTopLeftRadius:
      (COMPACT_HEIGHT - COMPACT_FLOATING_BUTTON_GAP) * FLOATING_BUTTON_HEIGHT_RATIO,
    borderTopRightRadius:
      (COMPACT_HEIGHT - COMPACT_FLOATING_BUTTON_GAP) * FLOATING_BUTTON_HEIGHT_RATIO,
    width: (COMPACT_HEIGHT - COMPACT_FLOATING_BUTTON_GAP) * FLOATING_BUTTON_HEIGHT_RATIO * 2,
    height: (COMPACT_HEIGHT - COMPACT_FLOATING_BUTTON_GAP) * FLOATING_BUTTON_HEIGHT_RATIO * 2,
  },
  floatingButtonRegular: {
    borderBottomLeftRadius:
      (DEFAULT_HEIGHT - DEFAULT_FLOATING_BUTTON_GAP) * FLOATING_BUTTON_HEIGHT_RATIO,
    borderBottomRightRadius:
      (DEFAULT_HEIGHT - DEFAULT_FLOATING_BUTTON_GAP) * FLOATING_BUTTON_HEIGHT_RATIO,
    borderTopLeftRadius:
      (DEFAULT_HEIGHT - DEFAULT_FLOATING_BUTTON_GAP) * FLOATING_BUTTON_HEIGHT_RATIO,
    borderTopRightRadius:
      (DEFAULT_HEIGHT - DEFAULT_FLOATING_BUTTON_GAP) * FLOATING_BUTTON_HEIGHT_RATIO,
    width: (DEFAULT_HEIGHT - DEFAULT_FLOATING_BUTTON_GAP) * FLOATING_BUTTON_HEIGHT_RATIO * 2,
    height: (DEFAULT_HEIGHT - DEFAULT_FLOATING_BUTTON_GAP) * FLOATING_BUTTON_HEIGHT_RATIO * 2,
  },
  tabBarCompact: {
    height: COMPACT_HEIGHT,
  },
  tabBarRegular: {
    height: DEFAULT_HEIGHT,
  },
  tabBarWrapperCompact: {
    height:
      COMPACT_HEIGHT +
      (COMPACT_HEIGHT - COMPACT_FLOATING_BUTTON_GAP) * FLOATING_BUTTON_HEIGHT_RATIO,
    backgroundColor: Colors.transparent,
  },
  tabBarWrapperRegular: {
    height:
      DEFAULT_HEIGHT +
      (DEFAULT_HEIGHT - DEFAULT_FLOATING_BUTTON_GAP) * FLOATING_BUTTON_HEIGHT_RATIO,
    backgroundColor: Colors.transparent,
  },
  tab: {
    flex: 1,
    alignItems: isIos ? "center" : "stretch",
  },
  tabPortrait: {
    justifyContent: "flex-end",
    flexDirection: "column",
  },
  tabLandscape: {
    justifyContent: "center",
    flexDirection: "row",
  },
  iconWithoutLabel: {
    flex: 1,
  },
  iconWithLabel: {
    flex: 1,
  },
  iconWithExplicitHeight: {
    height: isIPad ? DEFAULT_HEIGHT : COMPACT_HEIGHT,
  },
  label: {
    textAlign: "center",
    backgroundColor: "transparent",
  },
  labelBeneath: {
    fontSize: 11,
    marginBottom: 1.5,
  },
  labelBeside: {
    fontSize: 12,
    marginLeft: 15,
  },
  modalContainer: {
    flex: 1,
    paddingVertical: 37.5,
  },
  imageBackground: {
    width: "100%",
    height: Dimensions.get("screen").height / 2 - 75,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  imageCentered: {
    width: "60%",
    height: "60%",
    // borderRadius: 50% ,
  },
  textTitle: {
    color: Colors.white,
    fontSize: 14,
    textAlign: "center",
    fontWeight: "600",
  },
  description: {
    color: Colors.transparent,
    fontSize: 12,
    textAlign: "center",
  },
  viewContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 30,
  },
  buttonContainer: {
    marginTop: 80,
    flexDirection: "row",
    backgroundColor: Colors.transparent,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 34.5,
    paddingVertical: 14.5,
  },
  smallIcon: {
    width: 22,
    height: 25,
    resizeMode: "contain",
    marginRight: 10,
  },
});

export default TabBar;
