// Define PropTypes
import { FlatList, View, Modal, Alert, TouchableHighlight, Text } from "react-native";
import { Button, Container, Content, Icon } from "native-base";
import * as React from "react";
import CreatedID from "../../components/CreatedIDs";
import CreatedScreen from ".";
import { styles } from "./Styles";
import HeaderComponent from "../../components/headerComponent";
import IdProductCard from "../../components/IdProductCard";

export interface Props {}

// Define States
export interface State {
  isFontLoaded: boolean;
  idcardInfo: IDCardInterface;
  idcardRender: IDCardInterface;
  idcardInfoStatus: IDCardStatusInterface;
  states: any;
  uploadPhoto: () => void;
  changeStates: (key: string) => void;
  changeName: (key: string) => void;
  changeBirth: (key: string) => void;
  changeGender: (key: string) => void;
  changeContact1Name: (key: string) => void;
  changeContact1Phone: (key: string) => void;
  changeContact2Name: (key: string) => void;
  changeContact2Phone: (key: string) => void;
  changeMedical: (key: string) => void;
  changeNote: (key: string) => void;
  createKidsId: () => void;
}

export const render = (compRef: CreatedScreen) => (
  <View style={styles.container}>
    <HeaderComponent title="Created IDs" message back={false} />
    {compRef.state.data && compRef.state.data.length !== 0 ? (
      <View style={{ flex: 1 }}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={compRef.state.modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View
            style={{
              width: "100%",
              height: "100%",
              flex: 1,
              justifyContent: "center",
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0, 0.9)",
            }}
          >
            <Content style={styles.modalContainer}>
              <View style={styles.welcomeContainer}>
                <IdProductCard
                  ref={(ref) => (compRef.imageRef = ref)}
                  {...compRef.state.idcardInfo}
                />
              </View>
              <View style={{ height: 100, borderColor: "white", position: "relative" }}>
                <Button
                  transparent
                  style={{ position: "absolute", right: 30, top: 10 }}
                  onPress={() => compRef.state.viewId()}
                >
                  <Icon name="close" color="#ffffff" style={{ color: "#ffffff" }} />
                </Button>
                <Button
                  transparent
                  style={{ position: "absolute", left: 30, top: 10 }}
                  onPress={() => compRef.state.downloadId()}
                >
                  <Icon name="download" color="#ffffff" style={{ color: "#ffffff" }} />
                </Button>
              </View>
            </Content>
          </View>
        </Modal>
        <Content style={styles.container}>
          {compRef.state && (
            <FlatList
              contentContainerStyle={{ paddingHorizontal: 0, paddingVertical: 5 }}
              renderItem={({ item, index }) => {
                return (
                  <CreatedID
                    {...item}
                    index={index}
                    length={compRef.state.data.length}
                    viewId={compRef.state.viewId}
                    editId={compRef.state.editId}
                    deleteId={compRef.state.deleteId}
                  />
                );
              }}
              data={compRef.state.data}
              keyExtractor={(item, index) => index.toString()}
            />
          )}
        </Content>
      </View>
    ) : (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={styles.noIDText}>No Created ID!</Text>
      </View>
    )}
  </View>
);
