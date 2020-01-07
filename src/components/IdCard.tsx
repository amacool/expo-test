// @ts-ignore
import { Font } from "expo";
import moment from "moment";
import { Card, CardItem, Text, View } from "native-base";
import React from "react";
import { Image, Linking, NativeModules, StyleSheet } from "react-native";
import images from "../assets/images";
import Colors from "../constants/Colors";
import { widthPercentageToDP as wp } from "../helpers/Responsive";
const { PlatformConstants } = NativeModules;
export default class IDCard extends React.Component<IDCardInterface> {
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
    // console.log(name)
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

  _handlePress = () => {
    Linking.openURL('tel:+123456789');
  };

  public render() {
    const name = this.state.renderFullName(this.props.name);
    return (
      !!this.state.isFontLoaded && (
        <Card style={[styles.cardContainer, styles.noPadding]}>
          <CardItem header bordered style={styles.cardHeader}>
            <Text style={styles.headerState} uppercase>
              {this.props.state || "Free Kids Id"}
            </Text>
            <Text style={styles.headerIssueDate} uppercase>
              Issue Date: {moment(this.props.issueDate || new Date()).format("MM-DD-YYYY")}
            </Text>
          </CardItem>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={styles.avatarImageView}>
              <View style={{ flex: .9 }}>
                {this.props.photo && (
                  <Image style={styles.avatarImage} source={{ uri: this.props.photo }} />
                )}
                {!this.props.photo && (
                  <Image
                    style={styles.avatarImage}
                    source={this.props.isHome ? images.babyId : images.blankBaby}
                  />
                )}
              </View>
              <View style={{ flex: .1, justifyContent: 'center', alignItems: 'center' }}>
                {!!this.state.isFontLoaded && name && name !== "" && (
                  <Text
                    style={{
                      color: Colors.signColor,
                      fontSize: PlatformConstants.interfaceIdiom == 'pad' ? 35 : 22,
                      fontFamily: "grvibo-regular",
                      textAlign: 'center'
                    }}
                  >{name}
                  </Text>
                )}
              </View>

            </View>
            <View style={styles.informationView}>
              <View style={[styles.inforDetailContainer]}>
                <Text
                  uppercase
                  numberOfLines={1} adjustsFontSizeToFit
                  style={[
                    styles.inforName,
                    {
                      fontSize: PlatformConstants.interfaceIdiom == 'pad' ? 40 : 30,
                      //paddingLeft: PlatformConstants.interfaceIdiom == 'pad' ? 15 : 0
                    }
                  ]}
                >
                  {name}
                </Text>
              </View>

              {!!this.props.contact1 && (
                <View style={[styles.inforDetailContainer, { height: PlatformConstants.interfaceIdiom == 'pad' ? 50 : 30 }]}>
                  <Image
                    style={styles.inforIcon}
                    resizeMode="contain"
                    source={images.phoneIcon}
                  />
                  <Text style={styles.inforTitle}>{this.props.contact1.name || "Mom"}:</Text>
                  <Text style={styles.inforDetail} onPress={this._handlePress}>
                    {this.props.contact1.phone || "555 555 5555"}
                  </Text>
                </View>
              )}
              {!!this.props.contact2 && (
                <View style={[styles.inforDetailContainer, { marginTop: PlatformConstants.interfaceIdiom == 'pad' ? 10 : 5, height: PlatformConstants.interfaceIdiom == 'pad' ? 50 : 30 }]}>
                  <Image
                    style={styles.inforIcon}
                    resizeMode="contain"
                    source={images.phoneIcon}
                  />
                  <Text style={styles.inforTitle}>{this.props.contact2.name || "Dad"}:</Text>
                  <Text style={styles.inforDetail}>
                    {this.props.contact2.phone || "555 555 5555"}
                  </Text>
                </View>
              )}
              {!!this.props.birthday && (
                <View style={[styles.inforDetailContainer, { marginTop: PlatformConstants.interfaceIdiom == 'pad' ? 10 : 5, height: PlatformConstants.interfaceIdiom == 'pad' ? 50 : 30 }]}>
                  <Image
                    style={styles.inforIcon}
                    resizeMode="contain"
                    source={images.birthdayIcon}
                  />
                  <Text style={styles.inforTitle}>Birthday:</Text>
                  <Text style={styles.inforDetail}>
                    {moment(this.props.birthday || new Date()).format("MM-DD-YYYY")}
                  </Text>
                </View>
              )}
              <View style={[styles.inforDetailContainer, { marginTop: PlatformConstants.interfaceIdiom == 'pad' ? 10 : 5, height: PlatformConstants.interfaceIdiom == 'pad' ? 50 : 30 }]}>
                <Image
                  style={styles.inforIcon}
                  resizeMode="contain"
                  source={images.medicalIcon}
                />
                <Text style={styles.inforTitle}>Medical:</Text>
                <Text style={styles.inforDetail}>{this.props.medical || "Medical"}</Text>
              </View>
              <View style={[styles.inforDetailNoteContainer, { marginTop: PlatformConstants.interfaceIdiom == 'pad' ? 10 : 5, height: PlatformConstants.interfaceIdiom == 'pad' ? 50 : 30 }]}>
                <Image style={styles.inforIcon} resizeMode="contain" source={images.noteIcon} />
                <Text style={styles.inforTitle}>Notes:</Text>
                <Text style={styles.inforDetail}>{this.props.note || "Note"}</Text>
              </View>
              <View style={[styles.inforDetailNoteContainer, { marginTop: PlatformConstants.interfaceIdiom == 'pad' ? 10 : 5, height: PlatformConstants.interfaceIdiom == 'pad' ? 50 : 30 }]}>
                <Image style={styles.logoImage} source={images.logiTemplate} />
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
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,

    width: "95%",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    padding: 0,

    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 1,
  },
  cardHeader: {
    justifyContent: "center",
    display: "flex",
    flexDirection: "column",
    padding: 0,
    //height: 60,
    backgroundColor: Colors.tintColor,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
  },
  noPadding: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  headerState: {
    lineHeight: wp("6.8"),
    fontSize: wp("6.8"),
    margin: 1,
    // color: Colors.white,
    color: "#f8f7f7",
  },
  headerIssueDate: {
    color: "#000",
    fontSize: wp("2.9"),
    lineHeight: wp("2.9"),
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
    display: "flex",
    flexDirection: "column",
    padding: 0,
    flex: 1,
    backgroundColor: Colors.white,
    paddingBottom: 10
  },
  avatarImageView: {
    justifyContent: "flex-start",
    flex: 0.44,
    //height: 150,
    paddingTop: PlatformConstants.interfaceIdiom == 'pad' ? 10 : 0,
    paddingLeft: 10,
    color: Colors.mainfontColor,
  },
  avatarImage: {
    marginTop: 10,
    resizeMode: "contain",
    paddingLeft: 10,
    width: "100%",
    height: "100%",
    justifyContent: "flex-start",
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
    alignContent: "center",
  },
  inforDetailNoteContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    // height: 15,
    flex: 1,
    marginTop: -10,
  },
  inforName: {
    paddingHorizontal: 10,
    fontWeight: "500",
  },
  inforIcon: {
    width: PlatformConstants.interfaceIdiom == 'pad' ? 26 : 13,
    height: PlatformConstants.interfaceIdiom == 'pad' ? 26 : 13,
  },
  inforTitle: {
    fontSize: wp("2.8"),
    marginLeft: PlatformConstants.interfaceIdiom == 'pad' ? 15 : 5,
    // width:wp('14'),
    // backgroundColor:'red',
    // lineHeight: 13,
    // fontWeight: 'bold',
    // color: Colors.mainfontColor,
    color: "#000",
  },
  inforDetail: {
    fontSize: wp("2.8"),
    marginLeft: 5,
    // lineHeight: wp(''),
    //width: wp("32"),
    // backgroundColor:'red',
    fontWeight: "bold",
    // color: Colors.tintColor,
    color: "#00CCCC",
  },
  logoImage: {
    position: "absolute",
    right: 0,
    width: PlatformConstants.interfaceIdiom == 'pad' ? 100 : 70,
    height: PlatformConstants.interfaceIdiom == 'pad' ? 79 : 49,
    resizeMode: "contain",
  },
});
