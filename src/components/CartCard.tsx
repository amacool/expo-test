import React from "react";
import {StyleSheet, Image, Dimensions, TouchableOpacity, NativeModules} from "react-native";
import {View, Card, Text, Body} from "native-base";
import Colors from "../constants/Colors";
import images from "../assets/images";
import moment from "moment";
import { Col, Grid } from "react-native-easy-grid";
const { PlatformConstants } = NativeModules;
import { widthPercentageToDP as wp } from "../helpers/Responsive";

interface Props {
  item: any,
  index?: number;
  addCart?: (key) => void;
  deleteCart?: (key) => void;
}

export default class CartCard extends React.Component<Props> {
  render() {
    return (
      <Card
        style={styles.cardContainer}
        key={this.props.index}
        noShadow
      >
        <Body style={styles.cardBody}>
          <View style={styles.avatarImageView}>
            {!!this.props.item.photo && (
              <Image style={styles.avatarImage} source={{ uri: this.props.item.photo }} />
            )}
            {!this.props.item.photo && (
              <Image style={styles.avatarImage} source={images.blankBaby} />
            )}
          </View>
          <View style={styles.informationView}>
            <View style={styles.inforDetailContainer}>
              <View style={styles.inforDetaiItem}>
                <Text style={styles.inforName}>{this.props.item.name}</Text>
              </View>
              <View style={styles.inforDetaiItem}>
                <Text style={styles.inforTitle}>ID Color:</Text>
                <Text style={styles.inforDetail}>
                  {this.props.item.color}
                </Text>
              </View>
              <View style={styles.inforDetaiItem}>
                <Text style={styles.inforTitle}>Size:</Text>
                <Text style={styles.inforDetail}>
                  {this.props.item.size}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.inforDetailNoteContainer}>
            <View style={{ height: '100%', width: '100%', justifyContent: "space-between", flexDirection: "column" }}>
              <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                <View/>
                <Image style={styles.btnClose} source={images.closeIcon} />
              </View>
              <View style={{ justifyContent: "space-between", alignItems: "center", flexDirection: "row", width: '100%', }}>
                <TouchableOpacity onPress={() => this.props.deleteCart(this.props.index)}>
                  <Text style={styles.btnCounter}>-</Text>
                </TouchableOpacity>
                <Text style={{ textAlign: 'center'}}>
                  {this.props.item.count}
                </Text>
                <TouchableOpacity onPress={() => this.props.addCart(this.props.index)}>
                  <Text style={styles.btnCounter}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Body>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 10,
    width: "95%",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    paddingHorizontal: 15,
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 5,
    elevation: 0,
    borderWidth: 0,
    borderColor: 'transparent',
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
    flex: 0.25,
    height: Dimensions.get("screen").width * 0.35 - 18,
    color: Colors.mainfontColor,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  avatarImage: {
    resizeMode: "cover",
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  informationView: {
    paddingHorizontal: 10,
    flexDirection: "column",
    flex: 0.5,
    height: Dimensions.get("screen").width * 0.35 - 18,
    justifyContent: "space-evenly",
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
    flex: 0.3,
    paddingVertical: 10
  },
  inforIcon: {
    width: 13,
    height: 13,
  },
  inforTitle: {
    fontSize: wp("3.5"),
    fontFamily: "sf-regular",
    marginLeft: PlatformConstants.interfaceIdiom == 'pad' ? 15 : 5,
    color: "#7F8FA6",
  },
  inforDetail: {
    fontSize: wp("4"),
    marginLeft: 5,
    fontFamily: "sf-regular",
    fontWeight: "bold",
    color: "#000",
  },
  inforName: {
    fontSize: wp("6"),
    marginLeft: 5,
    fontFamily: "sf-regular",
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
  btnCounter: {
    width: wp("6.5"),
    height: wp("6.5"),
    borderRadius: 8,
    backgroundColor: 'rgba(127, 143, 166, 0.1)',
    color: Colors.mainfontColor,
    textAlign: 'center',
    fontSize: wp("4.5"),
  },
  btnClose: {
    width: wp("4.5"),
    height: wp("4.5"),
  }
});
