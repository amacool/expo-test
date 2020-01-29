import {Card, Text, Title, View} from "native-base";
import React from "react";
import { Image, NativeModules, StyleSheet } from "react-native";
import images from "../assets/images";
import Colors from "../constants/Colors";
import { widthPercentageToDP as wp } from "../helpers/Responsive";
import moment from "moment";
const { PlatformConstants } = NativeModules;

export default class MissingCard extends React.Component<MessingCardInterface> {
  state = {
    isFontLoaded: false,
    renderFullName: (name: string) => this.renderFullName(name),
  };
  constructor(props) {
    super(props);
  }
  async componentDidMount() {
    this.setState({
      isFontLoaded: true,
    });
  }

  renderFullName(name) {
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

  public render() {
    return (
      <Card style={styles.cardContainer}>
        <View style={styles.cardHeader}>
          <View
            style={{ height: 65, width: "100%", justifyContent: "center", alignItems: "center" }}
          >
            <Title style={styles.headerState}>MISSING DOG</Title>
          </View>
        </View>

        <View style={styles.cardContent}>
          <View style={styles.stateContent}>
            <Image
              style={styles.avatarImage}
              source={this.props.photo ? { uri: this.props.photo } : images.babyId}
            />
          </View>
          <View style={styles.propertyContent}>
            <View style={styles.inforDetailContainer}>
              <Text style={styles.inforName}>{this.props.name}</Text>
            </View>
            <View style={styles.inforDetailContainer}>
              <Text style={styles.inforTitle}>Breed</Text>
              <Text style={styles.inforDetail}>
                {this.props.breed || "Golder Retrieve"}
              </Text>
            </View>
            <View style={styles.inforDetailContainer}>
              <Text style={styles.inforTitle}>Missing Since</Text>
              <Text style={styles.inforDetail}>
                {moment(this.props.missingDate || new Date()).format("MM-DD-YYYY")}
              </Text>
            </View>
          </View>
        </View>

        <View style={{ flexDirection: 'row', paddingHorizontal: 16 }}>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start'}}>
            <Text style={styles.headerNameLabel}>Notes</Text>
            <Text style={styles.headerName}>{this.props.note || "Blue eyes, Red collar & Black fur"}</Text>
          </View>
        </View>

        <View style={styles.cardFooter}>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginVertical: 15
            }}
          >
            <Text style={styles.pleaseCall}>Please Call</Text>
          </View>

          <View style={{
            width: "100%",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}>
            <Text style={styles.phoneNumber}>{this.props.contact || "+1 (425) 632-1264"}</Text>
            <Text style={styles.phoneNumber}>{this.props.contact || "+1 (425) 632-1264"}</Text>
          </View>
        </View>
        {this.props.isRewarded && (
          <View style={styles.rewardWrapper}>
            <Text style={styles.rewardText}>REWARD $$$</Text>
          </View>
        )}
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  cardContainer: {
    width: "100%",
    shadowOpacity: 0,
    elevation: 0,
    borderColor: Colors.mainColor
  },
  cardHeader: {
    backgroundColor: Colors.mainColor,
    position: "relative",
  },
  cardFooter: {
    paddingBottom: 10
  },
  cardContent: {
    flexDirection: "row",
    alignItems: 'flex-start',
    padding: 16
  },
  stateContent: {
    flex: .6,
    borderRadius: 0
  },
  propertyContent: {
    flex: 0.4,
    marginLeft: 16
  },
  noPadding: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  headerState: {
    lineHeight: wp("8"),
    fontSize: wp("6"),
    fontFamily: "sf-regular",
    fontWeight: 'bold',
    color: Colors.white,
    letterSpacing: 2.5
  },
  headerNameLabel: {
    color: 'rgba(127, 143, 166, 0.7)',
    marginRight: 15
  },
  headerName: {
    fontFamily: 'sf-regular',
    color: Colors.mainfontColor,
  },
  footerName: {
    fontSize: wp("4"),
    fontFamily: "Roboto",
    marginBottom: 8
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
  avatarImage: {
    resizeMode: "contain",
    width: "100%",
    flexDirection: 'row',
    height: 250
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
    height: PlatformConstants.interfaceIdiom == 'pad' ? 60 : 40,
    marginBottom: 25
  },
  inforDetailNoteContainer: {
    flexDirection: "row",
    height: 15,
    flex: 1,
    marginTop: 5,
  },
  inforIcon: {
    width: 13,
    height: 13,
  },
  inforName: {
    fontWeight: "bold",
    fontSize: wp("6"),
    fontFamily: 'sf-regular',
    letterSpacing: 2,
    color: Colors.mainColor
  },
  inforTitle: {
    fontSize: wp("3"),
    fontFamily: "sf-regular",
    color: 'rgba(127, 143, 166, 0.7)'
  },
  inforDetail: {
    fontSize: wp("4"),
    fontFamily: "sf-regular",
    color: '#19232D',
  },
  logoImage: {
    position: "absolute",
    right: 0,
    bottom: -10,
    width: 70,
    height: 49,
    resizeMode: "contain",
  },
  pleaseCall: {
    color: Colors.mainColor
  },
  phoneNumber: {
    fontSize: wp("4"),
    letterSpacing: 2,
    marginBottom: 5,
    color: Colors.mainfontColor,
    fontFamily: "sf-regular",
    fontWeight: "bold"
  },
  rewardWrapper: {
    backgroundColor: Colors.mainColor,
    padding: wp("3"),
  },
  rewardText: {
    color: 'white',
    fontSize: wp("4"),
    textAlign: 'center',
    fontFamily: "sf-regular",
    fontWeight: 'bold',
    letterSpacing: 5
  }
});
