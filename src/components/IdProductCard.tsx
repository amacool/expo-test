// @ts-ignore
import moment from "moment";
import { Body, Card, CardItem, Text, View } from "native-base";
import React from "react";
import { Image, StyleSheet } from "react-native";
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
    const name = this.state.renderFullName(this.props.name);
    return (
      <Card style={[styles.cardContainer, styles.noPadding]}>
        <CardItem header bordered style={styles.cardHeader}>
          <Text style={styles.headerState} uppercase>
            {this.props.state || "Free Kids Id"}
          </Text>
          <Text style={styles.headerIssueDate} uppercase>
            Issue Date: {moment(this.props.issueDate || new Date()).format("MM-DD-YYYY")}
          </Text>
        </CardItem>
        <CardItem style={styles.noPadding}>
          <Body style={styles.cardBody}>
            <View style={styles.avatarImageView}>
              {this.props.photo && (
                <Image style={styles.avatarImage} source={{ uri: this.props.photo }} />
              )}
              {!this.props.photo && <Image style={styles.avatarImage} source={images.blankBaby} />}
            </View>
            <View style={styles.informationView}>
              <View style={styles.inforDetailNameContainer}>
                <Text
                  style={[
                    styles.inforName,
                    name.length < 13 && { fontSize: 20 },
                    name.length > 13 && name.length < 17 && { fontSize: 17 },
                    name.length > 17 && name.length < 19 && { fontSize: 15 },
                    name.length > 19 && name.length < 22 && { fontSize: 13 },
                    name.length > 22 && { fontSize: 11 },
                  ]}
                >
                  {name}
                </Text>
              </View>
              {!!this.props.birthday && (
                <View style={styles.inforDetailContainer}>
                  <Image style={styles.inforIcon} source={images.birthdayIcon} />
                  <Text style={styles.inforTitle}>Birthday:</Text>
                  <Text style={styles.inforDetail}>
                    {moment(this.props.birthday || new Date()).format("MM-DD-YYYY")}
                  </Text>
                </View>
              )}
              {!!this.props.contact1 && (
                <View style={styles.inforDetailContainer}>
                  <Image style={styles.inforIcon} source={images.phoneIcon} />
                  <Text style={styles.inforTitle}>{this.props.contact1.name || "Mom"}:</Text>
                  <Text style={styles.inforDetail}>
                    {this.props.contact1.phone || "555 555 5555"}
                  </Text>
                </View>
              )}
              {!!this.props.contact2 && (
                <View style={styles.inforDetailContainer}>
                  <Image style={styles.inforIcon} source={images.phoneIcon} />
                  <Text style={styles.inforTitle}>{this.props.contact2.name || "Dad"}:</Text>
                  <Text style={styles.inforDetail}>
                    {this.props.contact2.phone || "555 555 5555"}
                  </Text>
                </View>
              )}
              {!!this.props.medical && (
                <View style={styles.inforDetailContainer}>
                  <Image style={styles.inforIcon} source={images.medicalIcon} />
                  <Text style={styles.inforTitle}>Medical:</Text>
                  <Text style={styles.inforDetail}>{this.props.medical || "Medical"}</Text>
                </View>
              )}
              {!!this.props.note && (
                <View style={styles.inforDetailNoteContainer}>
                  <Image style={styles.inforIcon} source={images.noteIcon} />
                  <Text style={styles.inforTitle}>Note:</Text>
                  <Text style={styles.inforDetail}>{this.props.note || "Note"}</Text>
                </View>
              )}
            </View>
          </Body>
        </CardItem>
        <CardItem style={styles.noPadding}>
          <View style={styles.footerContainer}>
            {!!this.state.isFontLoaded && name && name !== "" && (
              <Text style={{ color: Colors.signColor, fontSize: 20, fontFamily: "grvibo-regular" }}>
                {name}
              </Text>
            )}
            <Image style={styles.logoImage} source={images.logiTemplate} />
          </View>
        </CardItem>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 8,
    width: "95%",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    padding: 0,
  },
  cardHeader: {
    justifyContent: "center",
    display: "flex",
    flexDirection: "column",
    padding: 0,
    height: 55,
    backgroundColor: Colors.tintColor,
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
    height: 60,
    display: "flex",
    flexDirection: "column",
    padding: 0,
    flex: 1,
    backgroundColor: Colors.white,
  },
  avatarImageView: {
    justifyContent: "flex-start",
    flex: 0.44,
    height: 150,
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
    justifyContent: "flex-end",
  },
  inforDetailNameContainer: {
    flexDirection: "row",
    flex: 1,
  },
  inforDetailContainer: {
    flexDirection: "row",
    flex: 1,
    height: 12,
    marginTop: -2,
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
    fontSize: 13,
    marginLeft: 5,
    lineHeight: 13,
    fontWeight: "bold",
    color: Colors.mainfontColor,
  },
  inforDetail: {
    fontSize: 13,
    marginLeft: 5,
    lineHeight: 13,
    fontWeight: "bold",
    color: Colors.tintColor,
  },
  logoImage: {
    position: "absolute",
    right: 0,
    bottom: -10,
    width: 70,
    height: 69,
    resizeMode: "contain",
  },
});
