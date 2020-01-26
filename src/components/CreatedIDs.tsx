import React from "react";
import { StyleSheet, Image, Dimensions, TouchableOpacity, NativeModules } from "react-native";
import { View, Card, CardItem, Text, Body, Spinner, Title } from "native-base";
import Colors from "../constants/Colors";
import images from "../assets/images";
import { Col, Grid } from "react-native-easy-grid";
import { widthPercentageToDP as wp } from "../helpers/Responsive";
const { PlatformConstants } = NativeModules;

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
            <Title style={[styles.headerState,  {fontFamily: "Metropolis-Bold",}]} uppercase>
              Pet Identification
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
                    <Text style={styles.inforTitle} uppercase>{this.props.name}</Text>
                  </View>
                  <View style={styles.inforDetaiItem}>
                    <Image style={styles.inforIcon} source={images.phoneIcon1} />
                    <Text style={styles.inforDetail}>
                      +1 (425) 632-1264
                    </Text>
                  </View>
                  <View style={styles.inforDetaiItem}>
                    <Image style={styles.inforIcon} source={images.appleIcon} />
                    <Text style={styles.inforDetail}>
                      23/01/2015
                    </Text>
                  </View>
                  <View style={styles.inforDetaiItem}>
                    <Image style={styles.inforIcon} source={images.dialIcon} />
                    <Text style={styles.inforDetail}>
                      Black
                    </Text>
                  </View>
                  <View style={styles.inforDetaiItem}>
                    <Image style={styles.inforIcon} source={images.pugIcon} />
                    <Text style={styles.inforDetail}>
                      Pug
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
            <Grid style={{ flex: 1, justifyContent: "space-between", padding: 0 }}>
              <Col style={{ height: 50, flexDirection: 'column', alignItems: 'center', paddingHorizontal: 0 }} size={3}>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "flex-start",
                    flexDirection: "row",
                  }}
                  onPress={() => this.props.viewId(this.props.index)}
                >
                  <Text style={styles.btnAction}>
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
                  <Text style={styles.btnAction}>
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
                  <Text style={styles.btnBuy}>
                    Buy
                  </Text>
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
    shadowOpacity: 0,
    elevation: 0,
    borderWidth: 0,
    borderColor: 'transparent',
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
    fontSize: wp("5.3"),
    marginTop: wp("2"),
    fontFamily: 'Metropolis-Bold',
    color: Colors.mainfontColor,
  },
  headerIssueDate: {
    color: Colors.mainfontColor,
    fontSize: 17,
    lineHeight: 17,
    margin: 0,
  },

  cardBody: {
    flexDirection: "row",
    padding: 0,
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
    flex: 0.4,
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
    paddingLeft: 20,
    flexDirection: "column",
    flex: 0.58,
    justifyContent: "space-evenly",
  },
  inforDetailNameContainer: {
    flexDirection: "row",
    flex: 1,
  },
  inforDetailContainer: {
    flexDirection: "column",
    flex: 1,
    justifyContent: 'space-between',
    height: '100%'
    // height: 30,
    // marginTop: 5,
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
    fontSize: wp("4.8"),
    paddingHorizontal: 10,
    fontWeight: "bold",
    color: Colors.mainfontColor
  },
  inforTitle: {
    fontSize: wp("4.2"),
    fontFamily: "sf-regular",
    fontWeight: 'bold',
    marginLeft: PlatformConstants.interfaceIdiom == 'pad' ? 15 : 5,
    color: Colors.mainfontColor
  },
  inforIcon: {
    width: wp("3"),
    height: wp("3"),
  },
  inforDetail: {
    fontSize: wp("3.4"),
    marginLeft: 20,
    fontFamily: "sf-regular",
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
  btnAction: {
    fontFamily: "sf-regular",
    fontSize: wp("4.5"),
    color: Colors.mainfontColor,
    backgroundColor: 'rgba(197, 201, 217, 0.16)',
    paddingHorizontal: wp("6"),
    paddingVertical: wp("2"),
    borderRadius: 20
  },
  btnBuy: {
    fontFamily: "sf-regular",
    fontSize: wp("4.5"),
    color: Colors.white,
    backgroundColor: Colors.mainColor,
    paddingHorizontal: wp("12"),
    paddingVertical: wp("2"),
    borderRadius: 20
  }
});
