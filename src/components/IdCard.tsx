import moment from "moment";
import { Container, Card, Text, View } from "native-base";
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
        <Card style={styles.container}>
          <View style={{ width: '100%', position: 'relative' }}>
            <Image source={images.cardTopSlot} style={styles.cardTop} />
            <View style={styles.headerState}>
              <Image source={images.footPrint} style={styles.footPrint} />
              <Text numberOfLines={1} style={styles.headerText}>
                {this.props.state || "PET IDENTIFICATION"}
              </Text>
            </View>
          </View>
          <Card style={[styles.cardContainer, styles.noPadding]}>
            <View style={styles.infoWrapper}>
              <View style={styles.avatarImageView}>
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
              <View style={styles.informationViewWrapper}>
                <Text
                  uppercase
                  style={[
                    styles.inforName,
                    {
                      fontSize: PlatformConstants.interfaceIdiom == 'pad' ? wp("4.6") : wp("4.1"),
                      fontFamily: "sf-regular",
                      fontWeight: 'bold',
                      marginBottom: 3,
                      width: '100%'
                    }
                  ]}
                >
                  {name}
                </Text>
                <View style={{ marginBottom: 5, width: '100%', flexDirection: 'row' }}>
                  <View style={{ backgroundColor: Colors.mainColor, height: 3, width: wp(7) }}></View>
                  <View style={{ width: wp(21), height: 1, backgroundColor: Colors.black, marginTop: 1 }}></View>
                </View>

                <View style={styles.informationView}>
                  <View style={styles.informationViewLabelWrapper}>
                    {!!this.props.contact1 && (
                      <View style={[styles.inforDetailContainer, { height: PlatformConstants.interfaceIdiom == 'pad' ? 50 : 30 }]}>
                        <Text style={styles.inforTitle} uppercase>{this.props.contact1.name || "NAME"}</Text>
                      </View>
                    )}
                    {!!this.props.birthday && (
                      <View style={[styles.inforDetailContainer, { marginTop: PlatformConstants.interfaceIdiom == 'pad' ? 10 : 5, height: PlatformConstants.interfaceIdiom == 'pad' ? 40 : 20 }]}>
                        <Text style={styles.inforTitle} uppercase>Birthday</Text>
                      </View>
                    )}
                    <View style={[styles.inforDetailContainer, { marginTop: PlatformConstants.interfaceIdiom == 'pad' ? 10 : 5, height: PlatformConstants.interfaceIdiom == 'pad' ?  40 : 20 }]}>
                      <Text style={styles.inforTitle} uppercase>Color</Text>
                    </View>
                    <View style={[styles.inforDetailContainer, { marginTop: PlatformConstants.interfaceIdiom == 'pad' ? 10 : 5, height: PlatformConstants.interfaceIdiom == 'pad' ?  40 : 20 }]}>
                      <Text style={styles.inforTitle} uppercase>Breed</Text>
                    </View>
                    <View style={[styles.inforDetailNoteContainer, { marginTop: PlatformConstants.interfaceIdiom == 'pad' ? 10 : 5, height: PlatformConstants.interfaceIdiom == 'pad' ?  40 : 20 }]}>
                      <Text style={styles.inforTitle} uppercase>Address</Text>
                    </View>
                  </View>
                  <View>
                    {!!this.props.contact1 && (
                      <View style={[styles.inforDetailContainer, { height: PlatformConstants.interfaceIdiom == 'pad' ? 50 : 30 }]}>
                        <Text style={styles.inforDetail} onPress={this._handlePress}>
                          {this.props.contact1.phone || "555 555 5555"}
                        </Text>
                      </View>
                    )}
                    {!!this.props.birthday && (
                      <View style={[styles.inforDetailContainer, { marginTop: PlatformConstants.interfaceIdiom == 'pad' ? 10 : 5, height: PlatformConstants.interfaceIdiom == 'pad' ?  40 : 20 }]}>
                        <Text style={styles.inforDetail}>
                          {moment(this.props.birthday || new Date()).format("MM-DD-YYYY")}
                        </Text>
                      </View>
                    )}
                    <View style={[styles.inforDetailContainer, { marginTop: PlatformConstants.interfaceIdiom == 'pad' ? 10 : 5, height: PlatformConstants.interfaceIdiom == 'pad' ?  40 : 20 }]}>
                      <Text style={styles.inforDetail}>{this.props.color || "Black"}</Text>
                    </View>
                    <View style={[styles.inforDetailContainer, { marginTop: PlatformConstants.interfaceIdiom == 'pad' ? 10 : 5, height: PlatformConstants.interfaceIdiom == 'pad' ?  40 : 20 }]}>
                      <Text style={styles.inforDetail}>{this.props.medical || "Breed"}</Text>
                    </View>
                    {!!this.props.contact1 && (
                      <View style={[styles.inforDetailNoteContainer, { marginTop: PlatformConstants.interfaceIdiom == 'pad' ? 10 : 5, height: PlatformConstants.interfaceIdiom == 'pad' ?  40 : 20 }]}>
                        <Text style={[styles.inforDetail, { marginTop: 15 }]}>{this.props.contact1.address || "somewhere"}</Text>
                      </View>
                    )}
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.supportWrapper}>
              <Image style={styles.starImage} source={images.star} />
              <Text numberOfLines={1} style={{ fontSize: wp("3"), fontFamily: "sf-regular", fontWeight: 'bold' }}>
                SUPPORT DOG
              </Text>
            </View>
          </Card>
        </Card>
      )
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 0,
    shadowOpacity: 0,
    margin: 0, 
    padding: 0, 
    borderColor: 'transparent',
    borderWidth: 0,
    backgroundColor: 'transparent'
  },
  cardContainer: {
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    padding: 0,
    borderWidth: 1,
    borderColor: '#FD7468',
    borderStyle: 'solid',
    shadowOffset: { width: 0, height: 0 },
    shadowColor: '#F6F7FB',
    shadowOpacity: 0,
    elevation: 0,
    marginLeft: 0,
    marginRight: 0,
    marginTop: 0,
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
    position: 'absolute',
    width: '100%',
    marginTop: wp("11.3"),
    marginLeft: wp(-3.5),
    flexDirection: 'row',
    justifyContent: 'center'
  },
  headerText: {
    lineHeight: wp("5.1"),
    fontSize: wp("5.2"),
    fontFamily: 'sf-regular',
    fontWeight: 'bold',
    letterSpacing: 2,
    color: 'white',
    textAlign: 'center',
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
    flex: 0.5,
    color: Colors.mainfontColor,
  },
  avatarImage: {
    resizeMode: "contain",
    width: "100%",
    height: "100%",
    alignSelf: 'flex-start'
  },
  informationViewWrapper: {
    display: 'flex',
    flexDirection: "column",
    flex: 1,
    marginLeft: 10
  },
  informationView: {
    display: 'flex',
    flexDirection: "row",
  },
  informationViewLabelWrapper: {
    marginRight: 16
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
    fontFamily: "sf-regular",
    fontSize: 20,
    alignItems: "flex-start",
  },
  inforIcon: {
    width: PlatformConstants.interfaceIdiom == 'pad' ? 26 : 13,
    height: PlatformConstants.interfaceIdiom == 'pad' ? 26 : 13,
  },
  inforTitle: {
    fontSize: wp("2.5"),
    fontFamily: "sf-regular",
    color: "#000",
  },
  inforDetail: {
    fontSize: wp("3"),
    marginLeft: 5,
    fontFamily: "sf-regular",
    fontWeight: "bold",
    color: "#000",
    letterSpacing: 0.5
  },
  logoImage: {
    position: "absolute",
    right: 0,
    width: PlatformConstants.interfaceIdiom == 'pad' ? 100 : 70,
    height: PlatformConstants.interfaceIdiom == 'pad' ? 79 : 49,
    resizeMode: "contain",
  },
  cardTop: {
    width: "100%",
    resizeMode: 'stretch',
    height: wp('19')
  },
  footPrint: {
    width: wp(7),
    height: wp(7),
    resizeMode: 'contain',
    marginTop: wp(-1.3),
    marginRight: wp(3)
  },
  infoWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderWidth: 0,
    padding: 16
  },
  supportWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: -5,
    marginLeft: 16,
    marginBottom: 20
  },
  starImage: {
    marginRight: 10,
    width: wp("5"),
    height: wp("5"),
  }
});
