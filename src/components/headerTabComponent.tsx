import React from "react";
import { StatusBar, StyleSheet, Platform } from "react-native";
import { Title, Header, Body } from "native-base";
import Colors from "../constants/Colors";
import { widthPercentageToDP as wp } from "../helpers/Responsive";

export default class HeaderTabComponent extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      isFontLoaded: false,
    };
  }

  // you can put this inside your render method

  async componentDidMount() {
    if (Platform.OS === "android") StatusBar.setTranslucent(true);
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
