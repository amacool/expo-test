import {
  FlatList,
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import {Card, CardItem, Body, Content, ListItem, Right, Input} from "native-base";
import * as React from "react";
import CartScreen from "./CartScreen";
import { styles } from "./Styles";
import HeaderComponent from "../../components/headerComponent";
import images from "../../assets/images";
import CartCard from "../../components/CartCard";
import Colors from "../../constants/Colors";

export interface Props {}

// Define States
export interface State {
  isVerifedGit: boolean;
  isValid: boolean;
  isLoading: boolean,
  data: any;
  gitCode: string;
  addCart: (key: string) => void;
  deleteCart: (key: string) => void;
  checkOut: () => void;
  changeGitCode: (code: string) => void;
  enterGitCode: () => void;
}

export const render = (compRef: CartScreen) => (
  <View style={styles.container}>
    <HeaderComponent title="Cart" message back checked={compRef.state.isValid}/>
    {compRef.state && compRef.state.isLoading &&
      <ActivityIndicator
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        size="large"
        color={Colors.tintColor} />
    }
    {compRef.state && !compRef.state.isLoading && !compRef.state.isVerifedGit &&
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Card style={{width: '95%'}}>
          <CardItem>
            <Body>
            <ListItem icon style={{width: '100%', borderWidth: 0}} noBorder>
              <Body>
              <Input
                placeholder="Enter your Git code"
                onChangeText={(text) => compRef.state.changeGitCode(text)}
                style={styles.formText}
                value={compRef.state.gitCode} />
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
                        item={item}
                        index={index}
                        addCart={compRef.state.addCart}
                        deleteCart={compRef.state.deleteCart}
                      />
                    );
                  }}
                  data={compRef.state.data}
                  keyExtractor={(item, index) => index.toString()}
                />
              )}
              <TouchableOpacity
                style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}
                onPress={compRef.state.checkOut}
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
