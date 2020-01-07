import * as React from "react";
import { ImageStyle, Text, TextStyle, View, ViewStyle } from "react-native";
import TabBarIcon from "../../components/TabBarIcon";
import images from "../../assets/images";

interface InterfaceStyle {
  [key: string]: ViewStyle | TextStyle | ImageStyle;
}

export default class CartScreen extends React.Component {
  public static navigationOptions = {
    tabBarLabel: "Cart",
    tabBarIcon: ({ focused }) => (
      <TabBarIcon focused={focused} active={images.tabCartSelect} inactive={images.tabCart} />
    ),
  };
  public render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return (
      <View>
        <Text>Cart Page</Text>
      </View>
    );
  }
}
