// Define PropTypes
import { ScrollView, TouchableOpacity, View } from "react-native";
import { Container, Content, Text } from "native-base";
import * as React from "react";
import IdProductCard from "../../components/IdProductCard";
import IDViewScreen from "./IDViewScreen";
import { styles } from "./Styles";
import HeaderComponent from "../../components/headerComponent";

export interface Props {}

// Define States
export interface State {
  isFontLoaded: boolean;
  idcardInfo: IDCardInterface;
  cardIndex: number;
  states: any;
  editId: () => void;
}

export const render = (compRef: IDViewScreen) => (
  <Container>
    <HeaderComponent />
    <Content style={styles.container}>
      <View style={styles.welcomeContainer}>
        <IdProductCard ref={(ref) => (compRef.imageRef = ref)} {...compRef.state.idcardInfo} />
      </View>
      {/*<View style={styles.buttonContainer}>*/}
      {/*<TouchableOpacity style={styles.createBotton}>*/}
      {/*<Text style={styles.claimText}>ORDER FOR $1.00</Text>*/}
      {/*</TouchableOpacity>*/}
      {/*</View>*/}
      {/*<View style={styles.buttonContainer}>*/}
      {/*<TouchableOpacity style={styles.problemBotton} onPress={compRef.state.editId}>*/}
      {/*<Text style={[styles.problemText]}>EDIT</Text>*/}
      {/*</TouchableOpacity>*/}
      {/*</View>*/}
    </Content>
  </Container>
);
