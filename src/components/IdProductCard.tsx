import moment from "moment";
import {Image, NativeModules, StyleSheet, TouchableOpacity} from "react-native";
import { Card, CardItem, View, Text, Title } from "native-base";
import React from "react";
const { PlatformConstants } = NativeModules;
import { widthPercentageToDP as wp } from "../helpers/Responsive";
import images from "../assets/images";
import Colors from "../constants/Colors";

export default class IdProductCard extends React.Component<IDCardInterface> {
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

  public render() {
    const name = this.state.renderFullName(this.props.name.toString());
    return (
      <TouchableOpacity style={{width: "100%"}}>
        <Card style={[styles.cardContainer, styles.noPadding, {flex: 1, marginTop: 21}]}>
          <CardItem header style={styles.cardHeader}>
            {/* <Image source={images.cardTopSlot}  style={{position: 'absolute', top: -20, zIndex: 10,}}/> */}
            <Title style={[styles.headerState,  {fontFamily: "Metropolis-Bold",}]} uppercase>
              Pet Identification
            </Title>
          </CardItem>
          <View style={{ flex: 1, flexDirection: 'row', borderWidth: 0 }}>
            <View style={styles.avatarImageView}>
              <View style={{ flex: .9 }}>
                {this.props.photo && (
                  <Image style={styles.avatarImage} source={{ uri: this.props.photo }} />
                )}
                {!this.props.photo && (
                  <Image
                    style={styles.avatarImage}
                    source={images.babyId}
                  />
                )}
              </View>
            </View>
            <View style={styles.informationView}>
              <View>
                <Text
                  uppercase
                  numberOfLines={1} adjustsFontSizeToFit
                  style={[
                    styles.inforName,
                    {
                      paddingHorizontal: 0,
                      paddingBottom: 5,
                      fontSize: PlatformConstants.interfaceIdiom == 'pad' ? wp("5.5") : wp("5.1"),
                      fontFamily: "Metropolis-Bold",
                    }
                  ]}
                >
                  {name}
                </Text>
              </View>

              {!!this.props.contact && (
                <View style={[styles.inforDetailContainer, { height: PlatformConstants.interfaceIdiom == 'pad' ? 50 : 30 }]}>
                  <Text style={styles.inforTitle}>PHONE</Text>
                  <Text style={styles.inforDetail}>
                    {this.props.contact || "555 555 5555"}
                  </Text>
                </View>
              )}
              {!!this.props.contactoth && (
                <View style={[styles.inforDetailContainer, { marginTop: PlatformConstants.interfaceIdiom == 'pad' ? 10 : 5, height: PlatformConstants.interfaceIdiom == 'pad' ? 50 : 30 }]}>
                  <Text style={styles.inforTitle}>PH2:</Text>
                  <Text style={styles.inforDetail}>
                    {this.props.contactoth || "555 555 5555"}
                  </Text>
                </View>
              )}
              {!!this.props.birthday && (
                <View style={[styles.inforDetailContainer, { marginTop: PlatformConstants.interfaceIdiom == 'pad' ? 10 : 5, height: PlatformConstants.interfaceIdiom == 'pad' ? 50 : 30 }]}>
                  <Text style={styles.inforTitle}>Birthday:</Text>
                  <Text style={styles.inforDetail}>
                    {moment(this.props.birthday || new Date()).format("MM-DD-YYYY")}
                  </Text>
                </View>
              )}
              <View style={[styles.inforDetailContainer, { marginTop: PlatformConstants.interfaceIdiom == 'pad' ? 10 : 5, height: PlatformConstants.interfaceIdiom == 'pad' ? 50 : 30 }]}>
                <Text style={styles.inforTitle} uppercase>Breed:</Text>
                <Text style={styles.inforDetail}>{this.props.breed || "Breed"}</Text>
              </View>
              <View style={[styles.inforDetailNoteContainer, { marginTop: PlatformConstants.interfaceIdiom == 'pad' ? 10 : 5, height: PlatformConstants.interfaceIdiom == 'pad' ? 50 : 30 }]}>
                <Text style={styles.inforTitle} uppercase>Note:</Text>
                <Text style={styles.inforDetail}>{this.props.note || "Note"}</Text>
              </View>
            </View>
          </View>

        </Card>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  cardContainer: {
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    padding: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
    borderWidth: 0,
  },
  cardHeader: {
    borderWidth: 0,
    justifyContent: "center",
    display: "flex",
    flexDirection: "column",
    padding: 0,
    backgroundColor: Colors.white,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
  },
  noPadding: {
    borderWidth: 0,
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
    color: "#000",
    fontSize: wp("2.9"),
    lineHeight: wp("2.9"),
    margin: 0,
  },

  cardBody: {
    borderWidth: 0,
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
    resizeMode: "contain",
    paddingLeft: 10,
    width: "100%",
    height: "100%",
    justifyContent: "flex-start",
  },
  informationView: {
    flexDirection: "column",
    flex: 0.54,
    justifyContent: "flex-start",
    padding: 10,
    paddingBottom: 20,
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
    alignItems: "center",
    alignContent: "center",
    flex: 1,
  },
  inforName: {
    fontFamily: "Metropolis-Bold",
    fontSize: 20,
    alignItems: "flex-start",
  },
  inforIcon: {
    width: PlatformConstants.interfaceIdiom == 'pad' ? 26 : 13,
    height: PlatformConstants.interfaceIdiom == 'pad' ? 26 : 13,
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
  logoImage: {
    position: "absolute",
    right: 0,
    width: PlatformConstants.interfaceIdiom == 'pad' ? 100 : 70,
    height: PlatformConstants.interfaceIdiom == 'pad' ? 79 : 49,
    resizeMode: "contain",
  },
});

