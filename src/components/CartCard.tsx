import React from "react";
// @ts-ignore
import * as Icon from "@expo/vector-icons";
import * as Font from "expo-font";
import {StyleSheet, Image, Dimensions, ScrollView, TouchableOpacity, NativeModules} from "react-native";
import {Left, Button, Right, View, Card, CardItem, Text, Body, Spinner, Title} from "native-base";
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

export default class CartCard extends React.Component<Props> {
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
          noShadow
        >
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
                      {moment(this.props.issueDate).format("MM-DD-YYYY")}
                    </Text>
                  </View>
                </View>
                <View style={styles.inforDetailNoteContainer}>
                  <Grid style={{ position: "absolute", bottom: 0, width: "100%", flex: 1, justifyContent: "center", alignItems: "center"  }}>
                    <Col>
                      <TouchableOpacity>
                        <Image
                          source={images.minusIcon}
                          resizeMode="contain"
                          style={{
                            width: '100%',
                            marginTop: 8
                          }}
                        />
                      </TouchableOpacity>
                    </Col>
                    <Col>
                      <Text style={{ width: "100%", textAlign: 'center'}}>1</Text>
                    </Col>
                    <Col>
                      <TouchableOpacity>
                        <Image
                          source={images.pulusIcon}
                          resizeMode="contain"
                          style={{
                            width: '100%',
                            marginTop: 8
                          }}
                        />
                      </TouchableOpacity>
                    </Col>
                    <Col></Col>
                  </Grid>
                </View>
              </View>
            </Body>
        </Card>
      );
    } else {
      return <Spinner />;
    }
  }
}

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 10,
    width: "95%",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    padding: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 0,
    borderWidth: 0,
    alignSelf: "center",
    justifyContent: "flex-start",
  },
  noPadding: {
    padding: 0,
  },

  cardBody: {
    display: "flex",
    flexDirection: "row",
    padding: 0,
    flex: 1,
    backgroundColor: Colors.transparent,
  },
  avatarImageView: {
    justifyContent: "flex-start",
    flex: 0.35,
    height: Dimensions.get("screen").width * 0.35 - 18,
    color: Colors.mainfontColor,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  avatarImage: {
    resizeMode: "contain",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    width: "100%",
    height: "100%",
    justifyContent: "flex-start",
  },
  informationView: {
    paddingHorizontal: 10,
    flexDirection: "column",
    flex: 0.64,
    height: Dimensions.get("screen").width * 0.35 - 18,
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
