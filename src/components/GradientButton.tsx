import React from "react";
import { LinearGradient } from "expo";
import { widthPercentageToDP as wp} from "../helpers/Responsive"
import {
  Text, TouchableOpacity, StyleSheet
} from "react-native";
import RF from "react-native-responsive-fontsize";

interface InterfaceProps {
  title: string;
  onPress: () => void;
  style: object,
}

export default class GradientButton extends React.Component<InterfaceProps> {
  public render() {
    return (
      <LinearGradient
        start={{x: 0, y: 0}} end={{x: 1, y: 1}}
        colors={['#F58524', '#F58524', '#F58524', '#F92B7F']}
        useAngle={true}
        angle={145}
        angleCenter={{x: 0.5, y: 0.5}}
        style={styles.claimBotton}
      >
        <TouchableOpacity onPress={this.props.onPress}>
          <Text style={styles.claimText}>{this.props.title}</Text>
        </TouchableOpacity>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  claimBotton: {
    paddingVertical: wp('3.5'),
    borderRadius: wp('8'),
    paddingHorizontal: wp('20'),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5},
    shadowOpacity: 0.9,
    shadowRadius: 5,
    elevation: 5,
  },
  claimText: {
    fontSize: RF(2.2),
    fontFamily: 'Metropolis-Bold',
    color: "#fff",
    fontWeight:'600'
  },
})
