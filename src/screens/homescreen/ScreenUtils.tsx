// Define PropTypes
import { LinearGradient } from "expo";
import * as React from "react";
import { Dimensions, Platform, ScrollView, Text, TouchableOpacity, View, Image } from "react-native";
import IDCard from "../../components/IdCard";
import { widthPercentageToDP as wp } from "../../helpers/Responsive";
import HomeScreen from "./HomeScreen";
import { styles } from "./Styles";
import HeaderComponent from "../../components/headerComponent";
import GradientButton from "../../components/GradientButton";
import images from "../../assets/images";

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
    <HeaderComponent title="Home" message back={false}/>
    {!!compRef.state.isFontLoaded && (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.bodyContainer}>
          <Text
            style={[
              styles.headerBodayTitle,
              { color: "#000", fontWeight: "400", fontFamily: "Metropolis-Medium" },
            ]}
          >
            New Way To
          </Text>
          <Text
            style={[
              styles.headerBodayTitle,
              { color: "#000", fontWeight: "400", fontFamily: "Metropolis-Medium" },
            ]}
          >
            Keep Your Dog Safe
          </Text>
        </View>
        <View style={styles.welcomeContainer}>
          {/* <Image
          source={require('../../assets/images/baby_id.png')}
          resizeMode="contain"
          style={{height:wp('64'),width:wp('130')}}
          />
      */}
          <IDCard {...compRef.state.idcardInfo} isHome={true} />
        </View>
        <View style={styles.bottomContainer}>
          <Text
            style={[
              styles.headerBodayTitle,
              { fontFamily: "Metropolis-Medium", color: "#000", fontWeight: "400" },
            ]}
          >
            Don't Risk It. Keep Your Dog Safe.
          </Text>
        </View>

        <View style={[styles.buttonContainer, { marginBottom: 30 }]}>
          <TouchableOpacity
            style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}
            onPress={compRef._handleHelpPress}
          >
            <Image source={images.createDogIdBtn} style={{width: '85%', resizeMode: 'contain'}}/>
          </TouchableOpacity>
        </View>
      </ScrollView>
    )}
  </View>
);
