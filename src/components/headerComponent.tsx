import React from "react";
import {StatusBar, StyleSheet, TouchableOpacity, View, Platform, Image} from "react-native";
import { Text, Button, Title } from "native-base";
import Colors from "../constants/Colors";
import navigationStore from "../stores/navigationStore";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "../helpers/Responsive";
import images from "../assets/images";
interface InterfaceProps {
  back?: boolean;
  checked?: boolean;
  message?: boolean;
  title: string;
}
export default class HeaderComponent extends React.Component<InterfaceProps> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (Platform.OS === "android") StatusBar.setTranslucent(true);
  }

  public render() {
    return (
      <View style={styles.headerStyle}>
        <View style={{ width: 150, marginTop: 10 }}>
          {this.props.back && <Button transparent onPress={() => navigationStore.back()}>
            <Image style={styles.headerArrowBack} source={images.headerArrowBack} />
            <Text style={styles.headerBackText}>Back</Text>
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
            <TouchableOpacity onPress={() => navigationStore.navigateTo('contact')}>
              <Image style={styles.headerMessageIcon} source={images.messageIcon} />
            </TouchableOpacity>
          }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerStyle: {
    marginTop: 25,
    backgroundColor: Colors.tabBar,
    flexDirection: "column",
    justifyContent: "space-between",
    paddingBottom: 5,
    marginBottom: 10,
  },
  headerTitle: {
    color: "#1E202B",
    textAlign: "left",
    fontFamily: 'sf-regular',
    fontWeight: 'bold',
    marginLeft: wp("4"),
    alignSelf: 'center',
    fontSize: wp("9"),
    letterSpacing: 1,
    justifyContent: "center",
  },
  headerArrowBack: {
    width: 13,
    height: 23,
    marginLeft: wp("3"),
  },
  headerBackText: {
    color: Colors.mainColor,
    fontSize: wp("4"),
    width: 200,
    marginLeft: -5,
    fontFamily: 'sf-regular'
  },
  headerBackIcon: {
    marginLeft: 10,
    justifyContent: "center",
    color: Colors.black,
  },
  headerRightIcon: {
    position: 'absolute',
    bottom: 5,
    right: 0,
  },
  headerMessageIcon: {
    width: wp("7"),
    height: wp("7"),
    marginRight: wp("3"),
    marginBottom: 10
  }
});
