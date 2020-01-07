// Define PropTypes
import { LinearGradient } from "expo";
import * as React from "react";
import { Dimensions, Platform, ScrollView, Text, TouchableOpacity, View } from "react-native";
import IDCard from "../../components/IdCard";
import { widthPercentageToDP as wp } from "../../helpers/Responsive";
import HomeScreen from "./HomeScreen";
import { styles } from "./Styles";

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
    <LinearGradient
      colors={["#47F7F7", "#08A5A5"]}
      style={[
        { alignContent: "center", justifyContent: "center", alignItems: "center", width: "100%" },
        true == isIphoneXorAbove() ? { height: wp("40") } : { height: wp("34") },
      ]}
    >
      <Text
        style={{
          fontSize: wp("8"),
          marginTop: wp("1"),
          alignSelf: "center",
          color: "#fff",
          fontFamily: "Roboto",
          fontWeight: "600",
        }}
      >
        FREE KIDS ID
      </Text>
    </LinearGradient>
    {!!compRef.state.isFontLoaded && (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        {/* <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Wallets Kids ID</Text>
      </View> */}
        <View style={styles.bodyContainer}>
          <Text
            style={[
              styles.headerBodayTitle,
              { color: "#000", fontWeight: "400", fontFamily: "Poppins-Regular" },
            ]}
          >
            New Way To
          </Text>
          <Text
            style={[
              styles.headerBodayTitle,
              { color: "#000", fontWeight: "400", fontFamily: "Poppins-Regular" },
            ]}
          >
            Keep Your Child Safe
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
              styles.bottomTitle,
              { width: wp("50"), fontFamily: "Poppins-Regular", color: "#000", fontWeight: "400" },
            ]}
          >
            Don't Risk It. Keep Your Child Safe.
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={compRef._handleHelpPress} style={styles.claimBotton}>
            <Text style={styles.claimText}>CREATE YOUR KIDS ID</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    )}
  </View>
);
