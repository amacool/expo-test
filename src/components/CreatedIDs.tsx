import React from "react";
// @ts-ignore
import { Font, Icon } from "expo";
import { StyleSheet, Image, Dimensions, ScrollView, TouchableOpacity } from "react-native";
import { Left, Button, Right, View, Card, CardItem, Text, Body, Spinner } from "native-base";
import Colors from "../constants/Colors";
import images from "../assets/images";
import moment from "moment";
import { Col, Grid } from "react-native-easy-grid";
import { widthPercentageToDP as wp } from "../helpers/Responsive";

interface Props {
  name?: string;
  state?: string;
  photo?: string;
  issueDate?: Date;
  index?: number;
  birthday?: Date;
  contact1?: { name: string; phone: string };
  contact2?: { name: string; phone: string };
  medical?: string;
  note?: string;
  gender?: string;
  viewId?: (key) => void;
  editId?: (key) => void;
  deleteId?: (key) => void;
}

export default class CreatedID extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      isFontLoaded: false,
    };
  }
  async componentDidMount() {
    await Font.loadAsync({
      "sf-heavy": require("../assets/fonts/SF-Compact-Display-Heavy.ttf"),
      "sf-regular": require("../assets/fonts/SF-UI-Display-Regular.ttf"),
      "grvibo-regular": require("../assets/fonts/GreatVibes-Regular.ttf"),
    });
    this.setState({ isFontLoaded: true });
  }

  public render() {
    if (this.state.isFontLoaded) {
      return (
        <Card
          style={
            this.props.length === this.props.index + 1
              ? [styles.cardContainer, styles.noPadding, { marginBottom: 40 }]
              : [styles.cardContainer, styles.noPadding]
          }
          key={this.props.index}
        >
          <CardItem style={styles.noPadding}>
            <Body style={styles.cardBody}>
              <View style={styles.avatarImageView}>
                {!!this.props.photo && (
                  <Image style={styles.avatarImage} source={{ uri: this.props.photo }} />
                )}
                {!this.props.photo && (
                  <Image style={styles.avatarImage} source={images.blankBaby} />
                )}
              </View>
              <View style={styles.informationView}>
                <View style={styles.inforDetailContainer}>
                  <View style={styles.inforDetaiItem}>
                    <Text style={styles.inforTitle}>ID For:</Text>
                    <Text style={styles.inforDetail}>{this.props.name}</Text>
                  </View>
                  <View style={styles.inforDetaiItem}>
                    <Text style={styles.inforTitle}>Date:</Text>
                    <Text style={styles.inforDetail}>
                      {moment(this.props.issueDate).format("MM-DD-YYYY")}
                    </Text>
                  </View>
                </View>
                <View style={styles.inforDetailNoteContainer}>
                  <Grid style={{ position: "absolute", bottom: 0, width: "100%" }}>
                    <Col>
                      <Text style={styles.inforTitle}>Price:</Text>
                    </Col>
                    <Col>
                      <Text style={styles.inforMoney}>$1.00</Text>
                    </Col>
                  </Grid>
                </View>
              </View>
            </Body>
          </CardItem>
          <CardItem>
            <Grid style={{ flex: 1, justifyContent: "space-between", marginLeft: 5 }}>
              <Col style={{ height: 50 }}>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "flex-start",
                    flexDirection: "row",
                  }}
                  onPress={() => this.props.viewId(this.props.index)}
                >
                  <Image
                    source={require("../assets/images/view.png")}
                    resizeMode="contain"
                    style={{ height: wp("5"), width: wp("5"), marginRight: wp("2") }}
                  />
                  <Text style={{ fontFamily: "Roboto", fontSize: wp("4"), color: "#00CCCC" }}>
                    View
                  </Text>
                </TouchableOpacity>
              </Col>
              <Col style={{ flex: 1 }}>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                  onPress={() => this.props.editId(this.props.index)}
                >
                  <Image
                    source={require("../assets/images/Vector.png")}
                    resizeMode="contain"
                    style={{ height: wp("4.5"), width: wp("4.5"), marginRight: wp("2") }}
                  />
                  <Text style={{ fontFamily: "Roboto", fontSize: wp("4"), color: "#00CCCC" }}>
                    Edit
                  </Text>
                </TouchableOpacity>
              </Col>
              <Col style={{ flex: 1 }}>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    justifyContent: "flex-end",
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                  onPress={() => this.props.deleteId(this.props.index)}
                >
                  <Image
                    source={require("../assets/images/cancel.png")}
                    resizeMode="contain"
                    style={{
                      height: wp("4.5"),
                      width: wp("4.5"),
                      marginRight: wp("2"),
                      tintColor: "red",
                    }}
                  />
                  <Text
                    style={{
                      fontFamily: "sf-regular",
                      fontSize: wp("4"),
                      color: "red",
                    }}
                  >
                    Delete
                  </Text>
                </TouchableOpacity>
              </Col>
              {/* <Col size={3}>
                <Button full style={{backgroundColor: Colors.buttonRed, borderRadius: 7}}>
                  <Text style={{fontFamily: 'sf-regular', fontSize: 13}}>ADD TO CART</Text>
                </Button>
              </Col> */}
            </Grid>
          </CardItem>
        </Card>
      );
    } else {
      return <Spinner />;
    }
  }
}

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 5,
    width: "96%",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    padding: 0,
    alignSelf: "center",
  },
  cardHeader: {
    justifyContent: "center",
    display: "flex",
    flexDirection: "column",
    padding: 0,
    height: 50,
    backgroundColor: Colors.mainfontColor,
  },
  noPadding: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  headerState: {
    lineHeight: 17,
    fontSize: 17,
    margin: 1,
    color: Colors.white,
  },
  headerIssueDate: {
    color: Colors.mainfontColor,
    fontSize: 17,
    lineHeight: 17,
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
    height: 40,
    display: "flex",
    flexDirection: "column",
    padding: 0,
    flex: 1,
    backgroundColor: Colors.white,
  },
  avatarImageView: {
    justifyContent: "flex-start",
    flex: 0.44,
    height: Dimensions.get("screen").width * 0.4,
    color: Colors.mainfontColor,
  },
  avatarImage: {
    resizeMode: "contain",
    width: "100%",
    height: "100%",
    justifyContent: "flex-start",
  },
  informationView: {
    paddingHorizontal: 10,
    flexDirection: "column",
    flex: 0.54,
    height: Dimensions.get("screen").width * 0.4 - 10,
    justifyContent: "space-evenly",
  },
  inforDetailNameContainer: {
    flexDirection: "row",
    flex: 1,
  },
  inforDetailContainer: {
    flexDirection: "column",
    flex: 1,
    height: 30,
    marginTop: 5,
  },
  inforDetaiItem: {
    flexDirection: "row",
    flex: 1,
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
    fontSize: 17,
    marginLeft: 5,
    lineHeight: 17,
    fontWeight: "bold",
    fontFamily: "sf-regular",
    color: Colors.mainfontColor,
  },
  inforDetail: {
    fontSize: 17,
    marginLeft: 5,
    lineHeight: 17,
    textAlign: "right",
    fontFamily: "sf-regular",
    color: Colors.mainfontColor,
  },
  inforMoney: {
    fontSize: 19,
    marginLeft: 5,
    lineHeight: 19,
    fontWeight: "bold",
    textAlign: "right",
    fontFamily: "sf-heavy",
    color: Colors.mainfontColor,
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
