// Define PropTypes
import * as React from "react";
import { Dimensions, Platform, ScrollView, Text, TouchableOpacity, View, Image } from "react-native";
import IDCard from "../../components/IdCard";
import HomeScreen from "./HomeScreen";
import { styles } from "./Styles";
import HeaderComponent from "../../components/headerComponent";

export interface Props { }

function isIphoneXorAbove() {
  const dimen = Dimensions.get("window");
  return (
    Platform.OS === "ios" &&
    (dimen.height === 812 || dimen.width === 812 || (dimen.height === 896 || dimen.width === 896))
  );
}

// Define States
export interface State {
  isFontLoaded: boolean;
  idcardInfo: IDCardInterface;
}

export const render = (compRef: HomeScreen) => (
  <View style={styles.container}>
    <HeaderComponent title="Home" message back={false} />
    {!!compRef.state.isFontLoaded && (
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.bodyContainer}>
          <Text
            style={
              styles.headerBodayTitle
            }
          >
            New Way To{"\n"}Keep Your Dog Safe
          </Text>
        </View>
        <View style={styles.welcomeContainer}>
          <IDCard {...compRef.state.idcardInfo} />
        </View>

        <View style={styles.bottomContainer}>
          <Text style={[styles.headerBodayTitle]}>
            Don't Risk It.{"\n"}Keep Your Dog Safe.
          </Text>
        </View>

        <View style={[styles.buttonContainer, { marginBottom: 20 }]}>
          <View style={styles.createDogIdBtnWrapper}>
            <TouchableOpacity
              style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}
              onPress={compRef._handleHelpPress}
            >
                <Text style={styles.createDogIdBtn}>
                  Create Your Dog's ID
                </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    )}
  </View>
);
