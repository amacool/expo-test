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
      <View style={{ flex: 1, justifyContent: "space-between", alignItems: "center" }}>
        <View></View>
        <View style={{ width: '100%', justifyContent: "center", alignItems: "center" }}>
          <View style={styles.inputWrapper}>
            <Body>
              <Input
                placeholder="Enter your Git code"
                placeholderTextColor="#7F8FA6"
                onChangeText={(text) => compRef.state.changeGitCode(text)}
                style={styles.formText}
                value={compRef.state.gitCode}
              />
            </Body>
            <Right>
              <TouchableOpacity onPress={compRef.state.enterGitCode}>
                <Image
                  source={images.arrowForward}
                  resizeMode="contain"
                  style={{
                    width: 40,
                    marginRight: 12,
                  }}
                />
              </TouchableOpacity>
            </Right>
          </View>
          <View style={styles.bottomWrapper}>
            <Text style={styles.description}>
              We work with kid friendly companies{"\n"}
              to deliver a Free Kids ID to you.{"\n"}
              If you don't have a gift code,{"\n"}
              please recommend a kid friendly company{"\n"}
              (dentist, day care, ice cream shop) you'd{"\n"}
              like us to work with to get you a Free Kids ID.
            </Text>
            <Text style={styles.btnContact}>
              Contact now
            </Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}
          >
            <Text style={styles.btnBottom}>
              Next
            </Text>
          </TouchableOpacity>
        </View>
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
