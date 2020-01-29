import { TouchableOpacity, View, Image, ActivityIndicator, ScrollView } from "react-native";
import {
  Container,
  Form,
  Icon,
  Picker,
  Item,
  Input,
  Title,
  Card,
  CardItem,
  Body,
  Text
} from "native-base";

import * as React from "react";
import CheckOutScreen from "./CheckOutScreen";
import { styles } from "./Styles";
import HeaderComponent from "../../components/headerComponent";
import Colors from "../../constants/Colors";
import CardInputComponent from "../../components/CardInputComponent";
import CardPickerComponent from "../../components/CardPickerComponent";
import images from "../../assets/images";
import { Grid } from "react-native-easy-grid";

export interface Props {}

// Define States
export interface State {
  checkoutData: any,
  checkOutInfo: CheckOutModel;
  checkOutInfoValidation: CheckOutStatusModel;
  states: any;
  countries: any,
  isValid: boolean,
  isLoading: boolean,
  allCountryData: any,
  checkOut: () => void;
  changeCountry: (value: any, index: number) => void;
  changeInfo: (key: string, value: string) => void;
}

export const render = (compRef: CheckOutScreen) => (
  <Container style={styles.container}>
    <HeaderComponent title="Checkout" message back checked={compRef.state.isValid}/>
    {compRef.state && compRef.state.isLoading &&
      <ActivityIndicator
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        size="large"
        color={Colors.tintColor} />
    }
    <View style={styles.totalContainer}>
      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>Cart total (IDs x5)</Text>
        <Text style={styles.totalValue}>$0</Text>
      </View>
      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>Tax</Text>
        <Text style={styles.totalValue}>$0</Text>
      </View>
      <View style={[styles.totalRow, { borderBottomColor: '#7F8FA6', borderBottomWidth: 1 }]}>
        <Text style={styles.totalLabel}>Delivery</Text>
        <Text style={styles.totalValue}>$0</Text>
      </View>
      <View style={[styles.totalRow, { marginTop: 15, paddingBottom: 0 }]}>
        <Text style={styles.totalLabel}>Subtotal</Text>
        <Text style={[styles.totalValue, { fontSize: 20 }]}>FREE</Text>
      </View>
    </View>
    {compRef.state && !compRef.state.isLoading &&
      <ScrollView>
        <View style={{ flexDirection: 'column', justifyContent: 'center', width: '100%' }}>
          <Title
            style={{
              fontFamily: "sf-regular",
              fontWeight: 'bold',
              color: Colors.mainfontColor,
              textAlign: 'left',
              padding: 5,
              marginLeft: 15,
              marginTop: 25
            }}
          >
            Shipping method
          </Title>
          <Form style={{padding: 10}}>
            <CardInputComponent label="Full Name">
              <Input
                onChangeText={(text) => compRef.state.changeInfo('name', text)}
                maxLength={25}
                placeholder="Enter Full Name"
                placeholderTextColor={Colors.placeholder}
                value={compRef.state.checkOutInfo.name}
                style={[
                  styles.formText,
                  // compRef.state.checkOutInfoValidation.name &&
                  // !compRef.state.checkOutInfo.name && styles.inValidForm,
                ]}
              />
            </CardInputComponent>

            <CardInputComponent label="Address">
              <Input
                onChangeText={(text) => compRef.state.changeInfo('address', text)}
                maxLength={25}
                placeholder="Enter Address"
                placeholderTextColor={Colors.placeholder}
                value={compRef.state.checkOutInfo.address}
                style={[
                  styles.formText,
                  compRef.state.checkOutInfoValidation.address &&
                  !compRef.state.checkOutInfo.address && styles.inValidForm,
                ]}
              />
            </CardInputComponent>

            <CardInputComponent label="City">
              <Input
                onChangeText={(text) => compRef.state.changeInfo('city', text)}
                maxLength={25}
                placeholder="Enter City"
                placeholderTextColor={Colors.placeholder}
                value={compRef.state.checkOutInfo.city}
                style={[
                  styles.formText,
                  compRef.state.checkOutInfoValidation.city &&
                  !compRef.state.checkOutInfo.city && styles.inValidForm,
                ]}
              />
            </CardInputComponent>

            <CardInputComponent label="State/Province/Region">
              <Input
                onChangeText={(text) => compRef.state.changeInfo('state', text)}
                maxLength={25}
                placeholder="Enter City"
                placeholderTextColor={Colors.placeholder}
                value={compRef.state.checkOutInfo.state}
                style={[
                  styles.formText,
                  compRef.state.checkOutInfoValidation.state &&
                  !compRef.state.checkOutInfo.state && styles.inValidForm,
                ]}
              />
            </CardInputComponent>


            <CardInputComponent label="Zip Code(Postal Code)">
              <Input
                onChangeText={(text) => compRef.state.changeInfo('zipcode', text)}
                maxLength={25}
                placeholder="Enter Zip Code"
                placeholderTextColor={Colors.placeholder}
                value={compRef.state.checkOutInfo.zipcode}
                style={[
                  styles.formText,
                  compRef.state.checkOutInfoValidation.zipcode &&
                  !compRef.state.checkOutInfo.zipcode && styles.inValidForm,
                ]}
              />
            </CardInputComponent>
          </Form>
          <Title
            style={{
              fontFamily: "sf-regular",
              color: Colors.mainfontColor,
              fontWeight: 'bold',
              textAlign: 'left',
              padding: 5,
              marginLeft: 15,
              marginTop: 25
            }}
          >
            Delivery method
          </Title>
          <Grid style={{padding: 10, justifyContent: 'space-between'}}>
            <Card style={styles.cardWrapper}>
              <CardItem style={styles.card}>
                <Body style={{
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  height: 50,
                  padding: 10
                }}>
                  <Image
                    source={images.fedexIcon}
                    resizeMode="contain"
                    style={{
                      width: "100%",
                    }}
                  />
                </Body>
              </CardItem>
              <Text style={styles.totalLabel}>2-3 days</Text>
            </Card>
            <Card style={styles.cardWrapper}>
              <CardItem style={styles.card}>
                <Body style={{
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  height: 50,
                }}>
                  <Image
                    source={images.uspsIcon}
                    resizeMode="contain"
                    style={{
                      width: "100%",
                    }}
                  />
                </Body>
              </CardItem>
              <Text style={styles.totalLabel}>2-3 days</Text>
            </Card>
            <Card style={styles.cardWrapper}>
              <CardItem style={styles.card}>
                <Body style={{
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  height: 50,
                }}>
                  <Image
                    source={images.dhlIcon}
                    resizeMode="contain"
                    style={{
                      width: "100%",
                    }}
                  />
                </Body>
              </CardItem>
              <Text style={styles.totalLabel}>2-3 days</Text>
            </Card>
          </Grid>
          <View style={{ flexDirection: 'row', marginBottom: 30, justifyContent: 'center', width: '100%' }}>
            <View style={[styles.buttonContainer, { width: '95%' }]}>
              <TouchableOpacity
                style={{

                }}
                onPress={compRef.state.checkOut}
              >
                <Text style={styles.btnBottom}>
                  Checkout
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    }
  </Container>
);
