import React from "react";
import { Font } from "expo";
// @ts-ignore
import { StatusBar, StyleSheet, TouchableOpacity, View, Platform } from "react-native";
import { Left, Icon, Right, Button, Title, Header, Body } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import navigationStore from "../stores/navigationStore";
import { widthPercentageToDP as wp } from "../helpers/Responsive";

export default class HeaderComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFontLoaded: false,
    };
  }

  componentWillMount() {
    if (Platform.OS === "android") StatusBar.setTranslucent(true);
  }

  // you can put this inside your render method

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require("../assets/fonts/Roboto.ttf"),
      Roboto_medium: require("../assets/fonts/Roboto_medium.ttf"),
      // 'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    });
    this.setState({ isFontLoaded: true });
  }
  public render() {
    return (
      <Header style={styles.headerStyle}>
        {this.props.from == "edit"
          ? [
              <View style={{ width: wp("12") }}>
                <Left style={{ justifyContent: "center" }}>
                  <Button transparent onPress={() => navigationStore.back()}>
                    <Icon name="arrow-back" style={styles.headerBack} />
                  </Button>
                </Left>
              </View>,
            ]
          : []}

        <Body>
          <Title style={styles.headerTitle}>Edit your Kid's ID</Title>
        </Body>
        {/* <Right /> */}
      </Header>
    );
  }
}

const styles = StyleSheet.create({
  headerStyle: {
    // marginTop: 20,
    height: wp("25"),

    backgroundColor: Colors.tabBar,
    display: "flex",
    flexDirection: "row",
    borderColor: Colors.mainfontColor,
  },
  headerBackContain: {
    backgroundColor: "transparent",
  },
  headerIcon: {
    color: Colors.tintColor,
  },
  headerTitleContain: {
    width: "100%",
    justifyContent: "center",
    height: 55,
  },
  headerTitle: {
    color: "#000",
    textAlign: "left",
    width: "100%",
    marginLeft: wp("2"),
    fontSize: wp("7"),
    // backgroundColor: 'red',
    justifyContent: "center",
  },
  headerBack: {
    color: Colors.tintColor,
    marginLeft: 10,
    justifyContent: "center",
  },
});
