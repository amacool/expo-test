import React from "react";
import {StyleSheet, Image, Dimensions, TouchableOpacity, NativeModules} from "react-native";
import {View, Card, CardItem, Text, Body, Spinner, Title} from "native-base";
import Colors from "../constants/Colors";
import images from "../assets/images";
import moment from "moment";
import { Col, Grid } from "react-native-easy-grid";
const { PlatformConstants } = NativeModules;
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
          noShadow
        >
          <CardItem header style={styles.cardHeader}>
            {/* <Image source={images.cardTopSlot}  style={{position: 'absolute', top: -20, zIndex: 10,}}/> */}
            <Title style={[styles.headerState,  {fontFamily: "Metropolis-Bold",}]} uppercase>
              PET IDENTIFICATION
            </Title>
          </CardItem>
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
                    <Text style={styles.inforDetail} uppercase>{this.props.name}</Text>
                  </View>
                  <View style={styles.inforDetaiItem}>
                    <Text style={styles.inforTitle}>Date:</Text>
                    <Text style={styles.inforDetail}>
                      {moment(this.props.issueDate).format("DD/MM/YYYY")}
                    </Text>
                  </View>
                </View>
                <View style={styles.inforDetailNoteContainer}>
                  <Grid style={{ position: "absolute", bottom: 0, width: "100%" }}>
                    <Col>
                    </Col>
                    <Col>
                    </Col>
                  </Grid>
                </View>
              </View>
            </Body>
          </CardItem>
          <CardItem style={styles.cardHeader}>
            <Grid style={{ flex: 1, justifyContent: "space-between", marginLeft: 5}}>
              <Col style={{ height: 50, flexDirection: 'column', alignItems: 'center' }} size={3}>
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
                  <Text style={{ fontFamily: "Roboto", fontSize: wp("4"), color: Colors.tintColor }}>
                    View
                  </Text>
                </TouchableOpacity>
              </Col>
              <Col style={{ flexDirection: 'column', height: 50, alignItems: 'center' }} size={3}>
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
                  <Text style={{ fontFamily: "Roboto", fontSize: wp("4"), color: Colors.tintColor }}>
                    Edit
                  </Text>
                </TouchableOpacity>
              </Col>
              <Col style={{ flexDirection: 'column', height: 50, alignItems: 'center' }} size={4}>
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
                    source={images.buyButton}
                    resizeMode="contain"
                    style={{
                      width: '100%',
                      marginTop: 8
                    }}
                  />
                </TouchableOpacity>
              </Col>
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
    marginTop: 30,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    width: "95%",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    padding: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    borderWidth: 0,
    alignSelf: "center",
  },
  cardHeader: {
    borderWidth: 0,
    justifyContent: "center",
    display: "flex",
    flexDirection: "column",
    padding: 0,
    backgroundColor: Colors.transparent,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
  },
  noPadding: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  headerState: {
    lineHeight: wp("5.1"),
    fontSize: wp("5.1"),
    margin: 1,
    fontFamily: 'Metropolis-Bold',
    color: Colors.tintColor,
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
    height: Dimensions.get("screen").width * 0.35,
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
    alignItems: "center",
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
    fontSize: wp("3.5"),
    fontFamily: "Metropolis-Medium",
    marginLeft: PlatformConstants.interfaceIdiom == 'pad' ? 15 : 5,
    color: "#000",
  },
  inforDetail: {
    fontSize: wp("4.8"),
    marginLeft: 5,
    fontFamily: "Metropolis-Bold",
    fontWeight: "bold",
    color: "#000",
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
