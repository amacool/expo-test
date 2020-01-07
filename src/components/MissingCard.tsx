// @ts-ignore
import { Font } from "expo";
import moment from "moment";
import { Card, Text, View } from "native-base";
import React from "react";
import { Dimensions, Image, NativeModules, StyleSheet } from "react-native";
import { Col, Grid, Row } from "react-native-easy-grid";
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
              <Text style={[styles.headerState]}>MISSING CHILD</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 0.30 }} />
              <View style={{ flex: 0.70, flexDirection: 'row', justifyContent: 'flex-start', alignContent: 'center', paddingLeft: 20 }}>
                <Text
                  numberOfLines={1} adjustsFontSizeToFit
                  style={[
                    styles.headerName,
                    { paddingTop: 10, fontSize: PlatformConstants.interfaceIdiom == 'pad' ? 45 : 30 }
                    ,
                  ]}
                >
                  {name}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.cardContent}>
            <View style={{ flex: 0.02 }}></View>
            <View style={[styles.stateContent, { justifyContent: 'center', alignContent: 'center' }]}>
              <View style={[styles.avatarImageView, { flex: 1, justifyContent: "flex-start", alignItems: "center", marginTop: -60 }]}>
                <Image
                  style={styles.avatarImage}
                  source={this.props.photo ? { uri: this.props.photo } : images.blankBaby}
                />
              </View>
              <View style={{ flex: 1, justifyContent: "flex-start", alignItems: "center" }}>
                {this.props.missingDate ? (
                  <Text style={{ color: Colors.missingHeader, fontSize: 14, textAlign: 'left' }}>
                    Missing since: {moment(this.props.missingDate).format("MM-DD-YYYY")}
                  </Text>
                ) : (
                    <Text style={{ color: Colors.missingHeader, fontSize: 11 }}>
                      Missing since: {moment(new Date()).format("MM-DD-YYYY")}
                    </Text>
                  )}
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: "flex-start", alignItems: "center",
                }}
              >
                <Text
                  style={[styles.inforTitle, { textAlign: "left", fontSize: 18, }]}
                >
                  {(this.props.city !== "" ? this.props.city + ", " : "La Mesa, ") +
                    (this.props.state ? this.getAbbreviationState(this.props.state) : "CA")}
                </Text>
              </View>
            </View>
            <View style={[styles.propertyContent, { marginLeft: 20, }]}>
              <View style={styles.inforDetailContainer}>
                <Grid>
                  <Row>
                    <Col size={2}>
                      <Text style={[styles.inforTitle, { marginTop: 10 }]}>AGE:</Text>
                    </Col>
                    <Col size={2}>
                      <Text style={[styles.inforTitle, { marginTop: 10 }]}>SEX:</Text>
                    </Col>
                  </Row>
                  <Row>
                    <Col size={2}>
                      {/* {!!this.props.birthday && ( */}
                      <Text style={[styles.inforTitle, { marginTop: 3 }]}>
                        {/* {moment(this.props.birthday).format("MM-DD-YYYY") || "birthday"} */}
                        {this.props.birthday ? this.calculateAge(this.props.birthday) : "0"}
                      </Text>
                      {/* )} */}
                    </Col>
                    <Col size={2}>
                      {/* {!!this.props.gender && ( */}
                      <Text style={[styles.inforTitle, { marginTop: 3 }]}>
                        {this.props.gender || "male"}
                      </Text>
                      {/* )} */}
                    </Col>
                  </Row>
                </Grid>
              </View>
              <View style={styles.inforDetailContainer}>
                <Grid>
                  <Row>
                    <Col size={2}>
                      <Text style={[styles.inforTitle, { marginTop: 10 }]}>HEIGHT:</Text>
                    </Col>
                    <Col size={2}>
                      <Text style={[styles.inforTitle, { marginTop: 10 }]}>WEIGHT:</Text>
                    </Col>
                  </Row>
                  <Row>
                    <Col size={2}>
                      {/* {!!this.props.height && ( */}
                      <Text style={[styles.inforTitle, { marginTop: 3 }]}>
                        {this.props.height || "3'00"}
                      </Text>
                      {/* )} */}
                    </Col>
                    <Col size={2}>
                      {/* {!!this.props.weight && ( */}
                      <Text style={[styles.inforTitle, { marginTop: 3 }]}>
                        {this.props.weight || "1KG"}
                      </Text>
                      {/* )} */}
                    </Col>
                  </Row>
                </Grid>
              </View>
              <View style={styles.inforDetailContainer}>
                <Grid>
                  <Row>
                    <Col size={2}>
                      <Text style={[styles.inforTitle, { marginTop: 10 }]}>HAIR:</Text>
                    </Col>
                    <Col size={2}>
                      <Text style={[styles.inforTitle, { marginTop: 10 }]}>EYES:</Text>
                    </Col>
                  </Row>
                  <Row>
                    <Col size={2}>
                      {/* {!!this.props.haircolor && ( */}
                      <Text style={[styles.inforTitle, { marginTop: 3 }]}>
                        {this.props.haircolor || "black"}
                      </Text>
                      {/* )} */}
                    </Col>
                    <Col size={2}>
                      {/* {!!this.props.eyecolor && ( */}
                      <Text style={[styles.inforTitle, { marginTop: 3 }]}>
                        {this.props.eyecolor || "green"}
                      </Text>
                      {/* )} */}
                    </Col>
                  </Row>
                </Grid>
              </View>
            </View>
          </View>
          <View style={styles.cardFooter}>
            <View
              style={{
                height: 65,
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={styles.headerState} uppercase>
                Please call
              </Text>
            </View>

            <View style={{ height: 55, width: "100%", marginTop: 10 }}>
              <View style={{ flex: 1, flexDirection: "row", justifyContent: "center" }}>
                <View
                  style={{
                    flex: 0.45,
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={images.phoneIcon1}
                    style={{ width: 18, height: 18, tintColor: Colors.white, marginRight: 3 }}
                  />
                  <Text style={[styles.footerName, { fontSize: 17 }]}>
                    {this.props.contact1 || "555-555-5555"}
                  </Text>
                </View>

                <View
                  style={{
                    flex: 0.1,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text style={[styles.footerName, { fontSize: 17 }]}>or</Text>
                </View>

                <View
                  style={{
                    flex: 0.45,
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={images.phoneIcon1}
                    style={{ width: 18, height: 18, tintColor: Colors.white, marginRight: 3 }}
                  />
                  <Text style={[styles.footerName, { fontSize: 17 }]}>
                    {this.props.contact2 || "555-555-5555"}
                  </Text>
                </View>
              </View>
              <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                {!!this.props.note && (
                  <Text style={[styles.footerName, { fontSize: 17 }]} numberOfLines={1}>
                    Note: {this.props.note}
                  </Text>
                )}
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
    height: 120,
    marginTop: 20,
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
    fontFamily: "Roboto",
    fontWeight: "bold",
    color: Colors.white,
  },
  headerName: {
    fontFamily: "Roboto",
    // fontFamily: 'sf-regular',
    color: Colors.white,
  },
  footerName: {
    lineHeight: 20,
    fontSize: 20,
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
    flex: 0.5,
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
    fontFamily: "Roboto",
    color: Colors.black,
    fontSize: 20
    // backgroundColor:'red'
  },
  inforDetail: {
    fontSize: 13,
    marginLeft: 5,
    lineHeight: 13,
    fontFamily: "sf-regular",
    fontWeight: "bold",
    color: Colors.tintColor,
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
