// @ts-ignore
import * as Font from "expo-font";
import {Card, Text, Title, View} from "native-base";
import React from "react";
import { Dimensions, Image, NativeModules, StyleSheet } from "react-native";
import images from "../assets/images";
import Colors from "../constants/Colors";
import states from "../constants/States";
import { widthPercentageToDP as wp } from "../helpers/Responsive";
const { PlatformConstants } = NativeModules;


const DEVICE_WIDTH = Dimensions.get("window").width;

export default class MissingCard extends React.Component<MessingCardInterface> {
  state = {
    isFontLoaded: false,
    renderFullName: (name: string) => this.renderFullName(name),
  };
  constructor(props) {
    super(props);
  }
  async componentDidMount() {
    await Font.loadAsync({
      "sf-heavy": require("../assets/fonts/SF-Compact-Display-Heavy.ttf"),
      "sf-regular": require("../assets/fonts/SF-UI-Display-Regular.ttf"),
      "grvibo-regular": require("../assets/fonts/GreatVibes-Regular.ttf"),
    });
    this.setState({
      isFontLoaded: true,
    });
  }

  renderFullName(name) {
    console.log(name);
    if (!!name) {
      let nameArray = name.split(" ");
      let nameStr = " ";
      nameArray.forEach((string) => {
        nameStr = nameStr + string.charAt(0).toUpperCase() + string.slice(1) + " ";
      });
      return nameStr;
    } else {
      return "Full Name";
    }
  }

  getAbbreviationState(key) {
    let abbr = key;
    states.forEach((item) => {
      if (item.name === key) {
        abbr = item.abbreviation;
      }
    });
    return abbr;
  }

  calculateAge(birthday) {
    // console.log("++++++++: ", birthday);
    const birth = new Date(birthday);
    let ageDifMs = Date.now() - birth.getTime();
    let ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  public render() {
    const name = this.state.renderFullName(this.props.name);
    console.log("++++++++: ", this.props.city);
    return (
      !!this.state.isFontLoaded && (
        <Card style={styles.cardContainer}>
          <View style={styles.cardHeader}>
            <View
              style={{ height: 65, width: "100%", justifyContent: "center", alignItems: "center" }}
            >
              <Title style={[styles.headerState, {color: Colors.warningBackground}]}>MISSING DOG</Title>
            </View>
            <View style={{ flexDirection: 'row', backgroundColor: '#FFF7E2' }}>
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignContent: 'center'}}>
                <Title
                  style={[
                    styles.headerName,
                    {
                      padding: 5,
                      textAlign: 'left',
                      fontFamily: "Metropolis-Bold",
                      fontWeight: '900',
                      color: Colors.missingHeader,
                      fontSize: PlatformConstants.interfaceIdiom == 'pad' ? 45 : 30
                    }
                  ]}
                >
                  {name}
                </Title>
              </View>
            </View>
          </View>
          <View style={styles.cardContent}>
            <View style={[styles.stateContent, { justifyContent: 'center', alignContent: 'center' }]}>
              <View style={[styles.avatarImageView, { flex: 1, justifyContent: "flex-start", alignItems: "center", marginTop: 20 }]}>
                <Image
                  style={styles.avatarImage}
                  source={this.props.photo ? { uri: this.props.photo } : images.babyId}
                />
              </View>
            </View>
            <View style={[styles.propertyContent,  { justifyContent: 'center', alignItems: 'flex-start'}]}>
              <View>
                <View style={styles.inforDetailContainer}>
                  <View style={[styles.inforDetailContainer, { height: PlatformConstants.interfaceIdiom == 'pad' ? 50 : 30 }]}>
                    <Text style={styles.inforTitle}>Breed:</Text>
                    <Text style={styles.inforDetail} onPress={this._handlePress}>
                      Golder Retrieve
                    </Text>
                  </View>
                </View>
              </View>
              <View>
                <View style={styles.inforDetailContainer}>
                  <View style={[styles.inforDetailContainer, { height: PlatformConstants.interfaceIdiom == 'pad' ? 50 : 30 }]}>
                    <Text style={styles.inforTitle}>Missing Since:</Text>
                    <Text style={styles.inforDetail} onPress={this._handlePress}>
                      10/10/2019
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={{ flexDirection: 'row', backgroundColor: '#FFF7E2', marginTop: 20, }}>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start'}}>
              <Text
                style={[
                  styles.headerName,
                  {
                    padding: 15,
                    justifyContent: 'flex-start',
                    fontFamily: "Metropolis-Bold",
                    fontWeight: '900',
                    color: Colors.missingHeader,
                    fontSize: PlatformConstants.interfaceIdiom == 'pad' ? 20 : 15
                  }
                ]}
              >
                Note: {this.props.note || "Blue eyes, Red collar, Gray tag"}
              </Text>
            </View>
          </View>
          <View style={styles.cardFooter}>
            <View
              style={{
                height: 45,
                width: "100%",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={images.phoneIcon1}
                style={{ width: 18, height: 18, tintColor: Colors.white, marginRight: 3 }}
              />
              <Text style={[styles.headerState, {fontSize: 15}]} uppercase>
                Please call
              </Text>
            </View>

            <View style={{ height: 45, width: "100%" }}>
              <View style={{ flex: 1, flexDirection: "row", justifyContent: "center" }}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={[styles.footerName, { fontSize: 25 }]}>
                    Marry: {this.props.contact1 || "555-555-5555"}
                  </Text>
                </View>

              </View>
            </View>
          </View>
        </Card>
      )
    );
  }
}

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 15,
    width: "95%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  cardHeader: {
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    //height: PlatformConstants.interfaceIdiom == 'pad' ? 120 : 100,
    backgroundColor: Colors.missingHeader,
    position: "relative",
  },
  cardFooter: {
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    height: 90,
    backgroundColor: Colors.missingHeader,
  },
  cardContent: {
    //position: "relative",
    //height: DEVICE_WIDTH * 1.1 - 250,
    flexDirection: "row",
    flex: 1,
  },
  stateContent: {
    flex: .28,
  },
  propertyContent: {
    flex: 0.70,
  },
  noPadding: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  headerState: {
    lineHeight: wp("8"),
    fontSize: wp("7"),
    margin: 1,
    fontFamily: "Metropolis-Bold",
    fontWeight: '900',
    color: Colors.white,
  },
  headerName: {
    fontFamily: "Roboto",
    // fontFamily: 'sf-regular',
    color: Colors.white,
  },
  footerName: {
    lineHeight: 45,
    fontSize: 45,
    fontFamily: "Roboto",
    color: Colors.white,
  },
  headerIssueDate: {
    color: Colors.mainfontColor,
    fontSize: 10,
    lineHeight: 10,
    margin: 0,
  },

  cardBody: {
    display: "flex",
    flexDirection: "row",
    padding: 0,
    flex: 1,
    backgroundColor: Colors.white,
    paddingTop: 10,
  },
  footerContainer: {
    height: 20,
    display: "flex",
    flexDirection: "column",
    padding: 0,
    flex: 1,
    backgroundColor: Colors.white,
  },
  avatarImageView: {
    alignItems: 'center',
    height: PlatformConstants.interfaceIdiom == 'pad' ? 200 : 100,
    width: PlatformConstants.interfaceIdiom == 'pad' ? 200 : 100,
    color: Colors.mainfontColor,
  },
  avatarImage: {
    resizeMode: "contain",
    width: "100%",
    height: "100%",
    alignItems: 'center'
  },
  informationView: {
    paddingHorizontal: 10,
    flexDirection: "column",
    flex: 0.54,
    justifyContent: "flex-end",
  },
  inforDetailNameContainer: {
    flexDirection: "row",
    flex: 1,
  },
  inforDetailContainer: {
    flexDirection: "row",
    height: PlatformConstants.interfaceIdiom == 'pad' ? 60 : 40,
    alignItems: "center",
  },
  inforDetailNoteContainer: {
    flexDirection: "row",
    height: 15,
    flex: 1,
    marginTop: 5,
  },
  inforName: {
    paddingHorizontal: 10,
    fontWeight: "bold",
  },
  inforIcon: {
    width: 13,
    height: 13,
  },
  inforTitle: {
    fontSize: wp("3.5"),
    fontFamily: "Metropolis-Medium",
    marginLeft: PlatformConstants.interfaceIdiom == 'pad' ? 15 : 5,
    color: Colors.missingHeader,
  },
  inforDetail: {
    fontSize: wp("4.8"),
    marginLeft: 5,
    fontFamily: "Metropolis-Bold",
    fontWeight: "bold",
    color: Colors.missingHeader,
  },
  logoImage: {
    position: "absolute",
    right: 0,
    bottom: -10,
    width: 70,
    height: 49,
    resizeMode: "contain",
  },
});
