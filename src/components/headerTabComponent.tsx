import React from "react";
import { Font } from "expo";
// @ts-ignore
import { StatusBar, StyleSheet, TouchableOpacity, Platform } from "react-native";
import { Left, Icon, Right, Button, Title, Header, Body } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import navigationStore from "../stores/navigationStore";
import { widthPercentageToDP as wp } from "../helpers/Responsive";

export default class HeaderTabComponent extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
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
        <Body>
          <Title style={styles.headerTitle}>{this.props.title}</Title>
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
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "row",
    borderColor: Colors.mainfontColor,
  },
  headerBackContain: {
    backgroundColor: "transparent",
  },
  headerIcon: {
    color: Colors.white,
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
    // backgroundColor:'red',
    justifyContent: "center",
  },
  headerBack: {
    color: Colors.white,
    marginLeft: 10,
    justifyContent: "center",
  },
});
