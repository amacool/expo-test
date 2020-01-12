// Define PropTypes
import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import { Container, Content, Text } from "native-base";
import * as React from "react";
import IdProductCard from "../../components/IdProductCard";
import IDViewScreen from "./IDViewScreen";
import { styles } from "./Styles";
import HeaderComponent from "../../components/headerComponent";
import images from "../../assets/images";
import { Col, Grid } from "react-native-easy-grid";

export interface Props {}

// Define States
export interface State {
  isFontLoaded: boolean;
  idcardInfo: IDCardInterface;
  cardIndex: number;
  states: any;
  share: () => void;
  download: () => void;
}

export const render = (compRef: IDViewScreen) => (
  <Container style={styles.container}>
    <HeaderComponent title="View ID" message back/>
    <Content>
      <View style={styles.welcomeContainer}>
        <IdProductCard ref={(ref) => (compRef.imageRef = ref)} {...compRef.state.idcardInfo} />
      </View>
      <Grid>
        <Col>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={{width: '100%', justifyContent: 'center', alignItems: 'center'}} onPress={compRef.state.share}>
              <Image source={images.shareBtn} style={{width: '85%', resizeMode: 'contain'}}/>
            </TouchableOpacity>
          </View>
        </Col>
        <Col>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={{width: '100%', justifyContent: 'center', alignItems: 'center'}} onPress={compRef.state.download}>
              <Image source={images.downloadBtn} style={{width: '85%', resizeMode: 'contain'}}/>
            </TouchableOpacity>
          </View>
        </Col>
      </Grid>
    </Content>
  </Container>
);
