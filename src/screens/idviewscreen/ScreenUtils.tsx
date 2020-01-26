// Define PropTypes
import { Image, TouchableOpacity, View, Text } from "react-native";
import { Container, Content } from "native-base";
import * as React from "react";
import IDCard from "../../components/IdCard";
import IDViewScreen from "./IDViewScreen";
import { styles } from "./Styles";
import HeaderComponent from "../../components/headerComponent";
import images from "../../assets/images";

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
        <IDCard {...compRef.state.idcardInfo} />
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity style={[styles.btnAction, styles.btnForward]} onPress={compRef.state.share}>
          <Text style={[styles.btnText, styles.forwardText]}>Forward</Text>
          <Image 
            style={styles.uplaodPhotoBtnStyle}
            source={images.forwardBtn}
          />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btnAction, styles.btnSave]} onPress={compRef.state.download}>
          <Text style={[styles.btnText, styles.saveText]}>Save</Text>
          <Image
            style={styles.uplaodPhotoBtnStyle}
            source={images.downloadPhotoBtn}
          />
        </TouchableOpacity>
      </View>
    </Content>
  </Container>
);
