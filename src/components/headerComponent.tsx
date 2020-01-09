import React from "react";
import * as Font from "expo-font";
// @ts-ignore
import {StatusBar, StyleSheet, TouchableOpacity, View, Platform, Image} from "react-native";
import { Left, Icon, Right, Button, Title, Header, Body } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import navigationStore from "../stores/navigationStore";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "../helpers/Responsive";
import images from "../assets/images";

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

      <View style={styles.headerStyle}>
        <View style={{ width: 50 }}>
          {this.props.back && <Button transparent onPress={() => navigationStore.back()}>
            <Icon name="arrow-back" style={styles.headerBackIcon} color={Colors.black}/>
          </Button>}
        </View>

        <View style={{flexDirection: "row", marginBottom: 10}}>
          <Title style={styles.headerTitle}>
            {this.props.title}
          </Title>
          {this.props.checked &&
            <Image style={[styles.headerBackIcon, {alignSelf: 'center'}]} resizeMode="cover" source={require("../../src/assets/images/header-check.png")} />
          }
        </View>

        <View style={styles.headerRightIcon}>
          {this.props.message &&
            <TouchableOpacity>
              <Image style={styles.headerBackIcon} source={images.messageIcon} />
            </TouchableOpacity>
          }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerStyle: {
    height: hp("14"),
    marginTop: 25,
    backgroundColor: Colors.tabBar,
    flexDirection: "column",
    justifyContent: "space-between",
    borderBottomWidth: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    marginBottom: 10,
  },
  headerTitle: {
    color: "#F75356",
    textAlign: "left",
    fontFamily: 'Metropolis-Bold',
    marginLeft: wp("3"),
    alignSelf: 'center',
    fontSize: wp("7"),
    justifyContent: "center",
  },
  headerBackIcon: {
    marginLeft: 10,
    justifyContent: "center",
    color: Colors.black,
  },
  headerRightIcon: {
    position: 'absolute',
    bottom: 13,
    right: 15,
  }
});
