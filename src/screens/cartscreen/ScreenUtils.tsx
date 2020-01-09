// Define PropTypes
import {
  FlatList,
  View,
  Modal,
  Alert,
  Text,
  Image,
  TouchableOpacity
} from "react-native";
import {Button, Card, CardItem, Body, Content, Icon, ListItem, Right, Input} from "native-base";
import * as React from "react";
import CreatedID from "../../components/CreatedIDs";
import CartScreen from ".";
import { styles } from "./Styles";
import HeaderComponent from "../../components/headerComponent";
import IdProductCard from "../../components/IdProductCard";
import images from "../../assets/images";
import CartCard from "../../components/CartCard";

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

export const render = (compRef: CartScreen) => (
  <View style={styles.container}>
    <HeaderComponent title="Cart" message />
    {compRef.state && !compRef.state.isVerifedGit &&
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Card style={{width: '95%'}}>
          <CardItem>
            <Body>
            <ListItem icon style={{width: '100%', borderWidth: 0}} noBorder>
              <Body>
              <Input placeholder="Enter your Git code"/>
              </Body>
              <Right>
                <TouchableOpacity onPress={compRef.state.enterGitCode}>
                  <Image
                    source={images.arrowForward}
                    resizeMode="contain"
                    style={{
                      width: 50,
                      marginTop: 8
                    }}
                  />
                </TouchableOpacity>
              </Right>
            </ListItem>
            </Body>
          </CardItem>
        </Card>
      </View>
    }
    {compRef.state.data && compRef.state.isVerifedGit &&
      <>
        {compRef.state.data.length ?
          <View style={{ flex: 1 }}>
            <Content style={styles.container}>
              {compRef.state && compRef.state.isVerifedGit && (
                <FlatList
                  contentContainerStyle={{ paddingHorizontal: 0, paddingVertical: 5 }}
                  renderItem={({ item, index }) => {
                    return (
                      <CartCard
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
              <TouchableOpacity
                style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}
                onPress={compRef.state.editId}
              >
                <Image source={images.checkOutBtn} style={{width: '85%', resizeMode: 'contain'}}/>
              </TouchableOpacity>
            </Content>
          </View>
          :
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text style={styles.noIDText}>No Created ID!</Text>
          </View>
        }

      </>



    }

  </View>
);
