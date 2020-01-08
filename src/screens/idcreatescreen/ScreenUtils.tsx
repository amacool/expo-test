// Define PropTypes
import { ScrollView, TouchableOpacity, View, Keyboard, Animated } from "react-native";
import {
  Container,
  Header,
  Content,
  Form,
  ListItem,
  Text,
  Icon,
  DatePicker,
  Body,
  Right,
  Switch,
  Picker,
  Item,
  Label,
  Input,
} from "native-base";

import moment from "moment";
import { Col, Row, Grid } from "react-native-easy-grid";
import * as React from "react";
import IDCard from "../../components/IdCard";
import IDCreateScreen from "./IDCreateScreen";
import { styles } from "./Styles";
import HeaderComponent from "../../components/headerComponent";
import Colors from "../../constants/Colors";

export interface Props {}

// Define States
export interface State {
  isFontLoaded: boolean;
  idcardInfo: IDCardInterface;
  idcardRender: IDCardInterface;
  idcardInfoStatus: IDCardStatusInterface;
  idcardInfoValidation: IDCardStatusInterface;
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

export const render = (compRef: IDCreateScreen) => (
  // <ScrollView
  //   // keyboardShouldPersistTaps="always"
  //   ref={(scrollView) => {
  //     compRef.scrollView = scrollView;
  //   }}
  //   showsVerticalScrollIndicator={false}
  //   scrollEventThrottle={100}
  //   // onContentSizeChange={() => {
  //   //   compRef.scrollView.scrollToEnd({ animated: true });
  //   // }}
  //   // onMomentumScrollEnd={(event) => {
  //   //   const pos = event.nativeEvent.contentOffset.y;
  //   //   compRef.setState({
  //   //     scrollPos: pos,
  //   //   });
  //   // }}
  //   scrollEnabled={false}
  // >
  <Container>
    <HeaderComponent title="Create ID" message back/>
    <Content style={styles.container} disableKBDismissScroll={true}>
      <View style={styles.welcomeContainer}>
        <IDCard ref={(ref) => (compRef.imageRef = ref)} {...compRef.state.idcardRender} />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={compRef.state.uploadPhoto} style={styles.uploadBotton}>
          <Text style={styles.claimText}>UPLOAD PHOTO</Text>
        </TouchableOpacity>
      </View>
      {/*<View style={styles.buttonContainer}>*/}
      {/*<TouchableOpacity onPress={compRef._handleHelpPress} style={styles.problemBotton}>*/}
      {/*<Text style={[styles.problemText]}>PROBLEM UPLOADING?</Text>*/}
      {/*</TouchableOpacity>*/}
      {/*</View>*/}
      <Form>
        <ListItem noBorder>
          <Body>
            <Item stackedLabel>
              <Label>State:</Label>
              <View
                style={{
                  borderBottomWidth: 1,
                  marginTop: 8,
                  flex: 1,
                  width: "100%",
                  backgroundColor: !!compRef.state.idcardInfoStatus.state
                    ? Colors.transparent
                    : Colors.transparent,
                  borderBottomColor:
                    compRef.state.idcardInfoValidation.state && !compRef.state.idcardInfo.state
                      ? Colors.buttonRed
                      : Colors.tabIconDefault,
                  flexDirection: "row",
                }}
              >
                <View
                  style={{
                    flex: 1,
                    borderRadius: 10,
                    overflow: "hidden",
                    justifyContent: "center",
                  }}
                >
                  {compRef.state.idcardInfoStatus.state && (
                    <Picker
                      mode="dropdown"
                      placeholder="Select State"
                      placeholderStyle={{ color: Colors.placeholder }}
                      style={{
                        width: "100%",
                        height: 40,
                        borderBottomWidth: 0,
                        backgroundColor: Colors.itemActive,
                      }}
                      iosIcon={
                        <Icon
                          name="arrow-down"
                          style={{ fontSize: 25, position: "absolute", right: 0 }}
                        />
                      }
                      selectedValue={
                        compRef.state.idcardInfo.state !== ""
                          ? compRef.state.idcardInfo.state
                          : "Select State"
                      }
                      onValueChange={(itemValue, itemIndex) =>
                        compRef.state.changeStates(itemValue)
                      }
                      // disabled={compRef.state.idcardInfoStatus.state}
                    >
                      <Item
                        label="Select State"
                        value=""
                        style={{ width: 100, backgroundColor: Colors.white }}
                      />
                      {compRef.state.states &&
                        compRef.state.states.length &&
                        compRef.state.states.map((item, key) => {
                          return (
                            <Item
                              label={item.name}
                              value={item.name}
                              key={key}
                              style={{ width: 100, backgroundColor: Colors.white }}
                            />
                          );
                        })}
                    </Picker>
                  )}
                  {!compRef.state.idcardInfoStatus.state && (
                    <Input
                      value={compRef.state.idcardInfo.state}
                      disabled={true}
                      style={{
                        height: 40,
                        width: "100%",
                        backgroundColor: Colors.gray,
                        textAlign: "center",
                        color: Colors.inactiveTextColor,
                      }}
                    />
                  )}
                </View>
              </View>
            </Item>
          </Body>
          <Right style={[styles.formSwitch]}>
            <Switch
              onValueChange={() => {
                let props = { ...compRef.state.idcardInfoStatus };
                props.state = !props.state;
                compRef.setState({ idcardInfoStatus: props });
                compRef.setState({ idcardInfoValidation: props });
                let realprops = { ...compRef.state.idcardRender };
                if (!props.state) {
                  delete realprops.state;
                } else {
                  realprops.state = compRef.state.idcardInfo.state;
                }
                compRef.setState({ idcardRender: realprops });
              }}
              value={compRef.state.idcardInfoStatus.state}
            />
          </Right>
        </ListItem>
        <ListItem noBorder>
          <Body>
            <Item stackedLabel>
              <Label>Full Name: </Label>
              <View
                style={{
                  width: "100%",
                  height: 40,
                  borderRadius: 10,
                  backgroundColor: compRef.state.idcardInfoStatus.name
                    ? Colors.itemActive
                    : Colors.gray,
                  marginTop: 8,
                }}
              >
                <Input
                  onChangeText={(text) => compRef.state.changeName(text)}
                  maxLength={25}
                  placeholder="Full Name"
                  placeholderTextColor={Colors.placeholder}
                  value={compRef.state.idcardInfo.name}
                  style={[
                    compRef.state.idcardInfoStatus.name && styles.formText,
                    compRef.state.idcardInfoValidation.name &&
                      !compRef.state.idcardInfo.name &&
                      styles.inValidForm,
                    ,
                    !compRef.state.idcardInfoStatus.name && { color: Colors.inactiveTextColor },
                  ]}
                  disabled={!compRef.state.idcardInfoStatus.name}
                />
              </View>
            </Item>
          </Body>
          <Right style={[styles.formSwitch]}>
            <Switch
              onValueChange={() => {
                let props = { ...compRef.state.idcardInfoStatus };
                props.name = !props.name;
                compRef.setState({ idcardInfoStatus: props });
                let realprops = { ...compRef.state.idcardRender };
                if (!props.name) {
                  delete realprops.name;
                } else {
                  realprops.name = compRef.state.idcardInfo.name;
                }
                compRef.setState({ idcardRender: realprops });
              }}
              value={compRef.state.idcardInfoStatus.name}
            />
          </Right>
        </ListItem>

        <ListItem noBorder>
          <Body>
            <Item stackedLabel>
              <Label>BirthDay:</Label>
              <View
                style={{
                  borderBottomWidth: 1,
                  marginTop: 8,
                  flex: 1,
                  width: "100%",
                  backgroundColor: !!compRef.state.idcardInfoStatus.birthday
                    ? Colors.transparent
                    : Colors.transparent,
                  borderBottomColor:
                    compRef.state.idcardInfoValidation.birthday &&
                    !compRef.state.idcardInfo.birthday
                      ? Colors.buttonRed
                      : Colors.tabIconDefault,
                }}
              >
                <View
                  style={{
                    flex: 1,
                    borderRadius: 10,
                    backgroundColor: compRef.state.idcardInfoStatus.birthday
                      ? Colors.itemActive
                      : Colors.gray,
                  }}
                >
                  <DatePicker
                    defaultDate={new Date(compRef.state.idcardInfo.birthday)}
                    minimumDate={new Date(2008, 1, 1)}
                    maximumDate={new Date(2028, 12, 31)}
                    locale={"en"}
                    timeZoneOffsetInMinutes={undefined}
                    modalTransparent={false}
                    animationType={"fade"}
                    androidMode={"default"}
                    onDateChange={(date) => compRef.state.changeBirth(date)}
                    disabled={!compRef.state.idcardInfoStatus.birthday}
                  />
                </View>
              </View>
            </Item>
          </Body>
          <Right style={[styles.formSwitch]}>
            <Switch
              onValueChange={() => {
                let props = { ...compRef.state.idcardInfoStatus };
                props.birthday = !props.birthday;
                compRef.setState({ idcardInfoStatus: props });
                compRef.setState({ idcardInfoValidation: props });
                let realprops = { ...compRef.state.idcardRender };
                if (!props.birthday) {
                  delete realprops.birthday;
                } else {
                  realprops.birthday = compRef.state.idcardInfo.birthday;
                }
                compRef.setState({ idcardRender: realprops });
              }}
              value={compRef.state.idcardInfoStatus.birthday}
            />
          </Right>
        </ListItem>

        <ListItem noBorder>
          <Body>
            <Item stackedLabel>
              <Label>Gender: </Label>
              <View
                style={{
                  borderBottomWidth: 1,
                  flex: 1,
                  marginTop: 8,
                  width: "100%",
                  backgroundColor: !!compRef.state.idcardInfoStatus.gender
                    ? Colors.transparent
                    : Colors.transparent,
                  borderBottomColor:
                    compRef.state.idcardInfoValidation.gender && !compRef.state.idcardInfo.gender
                      ? Colors.buttonRed
                      : Colors.tabIconDefault,
                  flexDirection: "row",
                }}
              >
                <View
                  style={{
                    flex: 1,
                    borderRadius: 10,
                    overflow: "hidden",
                    justifyContent: "center",
                  }}
                >
                  {!!compRef.state.idcardInfoStatus.gender && (
                    <Picker
                      mode="dropdown"
                      placeholder="Select Gender"
                      placeholderStyle={{ color: Colors.placeholder }}
                      style={[
                        styles.formText,
                        { height: 40, borderBottomWidth: 0, backgroundColor: Colors.itemActive },
                      ]}
                      iosIcon={
                        <Icon
                          name="arrow-down"
                          style={{ fontSize: 25, position: "absolute", right: 0 }}
                        />
                      }
                      selectedValue={
                        compRef.state.idcardInfo.gender !== ""
                          ? compRef.state.idcardInfo.gender
                          : "Select Gender"
                      }
                      onValueChange={(itemValue, itemIndex) =>
                        compRef.state.changeGender(itemValue)
                      }
                    >
                      <Item
                        label="Select Gender"
                        value=""
                        style={{ width: 100, backgroundColor: Colors.white }}
                      />
                      <Item
                        label="Male"
                        value="male"
                        style={{ width: 100, backgroundColor: Colors.white }}
                      />
                      <Item
                        label="Femail"
                        value="female"
                        style={{ width: 100, backgroundColor: Colors.white }}
                      />
                    </Picker>
                  )}
                  {!compRef.state.idcardInfoStatus.gender && (
                    <Input
                      value={compRef.state.idcardInfo.gender}
                      disabled={true}
                      style={{
                        height: 40,
                        width: "100%",
                        backgroundColor: Colors.gray,
                        textAlign: "center",
                        color: Colors.inactiveTextColor,
                      }}
                    />
                  )}
                </View>
              </View>
            </Item>
          </Body>
          <Right style={[styles.formSwitch]}>
            <Switch
              onValueChange={() => {
                let props = { ...compRef.state.idcardInfoStatus };
                props.gender = !props.gender;
                compRef.setState({ idcardInfoStatus: props });
                compRef.setState({ idcardInfoValidation: props });
                let realprops = { ...compRef.state.idcardRender };
                if (!props.gender) {
                  delete realprops.gender;
                } else {
                  realprops.gender = compRef.state.idcardInfo.gender;
                }
                compRef.setState({ idcardRender: realprops });
              }}
              value={compRef.state.idcardInfoStatus.gender}
            />
          </Right>
        </ListItem>
        <ListItem noBorder>
          <Body>
            <Grid>
              <Col style={{ marginRight: 3 }}>
                <Item stackedLabel>
                  <Label>Contact Name: </Label>
                  <View
                    style={{
                      width: "100%",
                      height: 40,
                      borderRadius: 10,
                      backgroundColor: compRef.state.idcardInfoStatus.contact1
                        ? Colors.itemActive
                        : Colors.gray,
                      marginTop: 8,
                    }}
                  >
                    <Input
                      onChangeText={(text) => compRef.state.changeContact1Name(text)}
                      placeholder="Mom"
                      placeholderTextColor={Colors.placeholder}
                      value={
                        compRef.state.idcardInfo.contact1
                          ? compRef.state.idcardInfo.contact1.name
                          : ""
                      }
                      style={[
                        compRef.state.idcardInfoStatus.contact1 && styles.formText,
                        compRef.state.idcardInfoValidation.contact1 &&
                          !compRef.state.idcardInfo.contact1.name &&
                          styles.inValidForm,
                        !compRef.state.idcardInfoStatus.contact1 && {
                          color: Colors.inactiveTextColor,
                        },
                      ]}
                      disabled={!compRef.state.idcardInfoStatus.contact1}
                    />
                  </View>
                </Item>
              </Col>
              <Col style={{ marginLeft: 3 }}>
                <Item stackedLabel>
                  <Label>Phone Number: </Label>
                  <View
                    style={{
                      width: "100%",
                      height: 40,
                      borderRadius: 10,
                      backgroundColor: compRef.state.idcardInfoStatus.contact1
                        ? Colors.itemActive
                        : Colors.gray,
                      marginTop: 8,
                    }}
                  >
                    <Input
                      placeholder="555 555 5555"
                      placeholderTextColor={Colors.placeholder}
                      onChangeText={(text) => compRef.state.changeContact1Phone(text)}
                      keyboardType="phone-pad"
                      returnKeyType="done"
                      maxLength={12}
                      value={
                        compRef.state.idcardInfo.contact1
                          ? compRef.state.idcardInfo.contact1.phone
                          : ""
                      }
                      style={[
                        compRef.state.idcardInfoStatus.contact1 &&
                          styles.formText &&
                          styles.formText,
                        compRef.state.idcardInfoValidation.contact1 &&
                          !compRef.state.idcardInfo.contact1.phone &&
                          styles.inValidForm,
                        !compRef.state.idcardInfoStatus.contact1 && {
                          color: Colors.inactiveTextColor,
                        },
                      ]}
                      disabled={!compRef.state.idcardInfoStatus.contact1}
                    />
                  </View>
                </Item>
              </Col>
            </Grid>
          </Body>
          <Right style={[styles.formSwitch]}>
            <Switch
              onValueChange={() => {
                let props = { ...compRef.state.idcardInfoStatus };
                props.contact1 = !props.contact1;
                compRef.setState({ idcardInfoStatus: props });
                compRef.setState({ idcardInfoValidation: props });
                let realprops = { ...compRef.state.idcardRender };
                if (!props.contact1) {
                  delete realprops.contact1;
                } else {
                  realprops.contact1 = compRef.state.idcardInfo.contact1;
                }
                compRef.setState({ idcardRender: realprops });
              }}
              value={compRef.state.idcardInfoStatus.contact1}
            />
          </Right>
        </ListItem>
        <ListItem noBorder>
          <Body>
            <Grid>
              <Col style={{ marginRight: 3 }}>
                <Item stackedLabel>
                  <Label>Contact Name: </Label>
                  <View
                    style={{
                      width: "100%",
                      height: 40,
                      borderRadius: 10,
                      backgroundColor: compRef.state.idcardInfoStatus.contact2
                        ? Colors.itemActive
                        : Colors.gray,
                      marginTop: 8,
                    }}
                  >
                    <Input
                      onChangeText={(text) => compRef.state.changeContact2Name(text)}
                      placeholder="Dad"
                      placeholderTextColor={Colors.placeholder}
                      value={
                        compRef.state.idcardInfo.contact2
                          ? compRef.state.idcardInfo.contact2.name
                          : ""
                      }
                      style={[
                        compRef.state.idcardInfoStatus.contact2 && styles.formText,
                        compRef.state.idcardInfoValidation.contact2 &&
                          !compRef.state.idcardInfo.contact2.name &&
                          styles.inValidForm,
                        !compRef.state.idcardInfoStatus.contact2 && {
                          color: Colors.inactiveTextColor,
                        },
                      ]}
                      disabled={!compRef.state.idcardInfoStatus.contact2}
                    />
                  </View>
                </Item>
              </Col>
              <Col style={{ marginLeft: 3 }}>
                <Item stackedLabel>
                  <Label>Phone Number: </Label>
                  <View
                    style={{
                      width: "100%",
                      height: 40,
                      borderRadius: 10,
                      backgroundColor: compRef.state.idcardInfoStatus.contact2
                        ? Colors.itemActive
                        : Colors.gray,
                      marginTop: 8,
                    }}
                  >
                    <Input
                      onChangeText={(text) => compRef.state.changeContact2Phone(text)}
                      keyboardType="phone-pad"
                      placeholder="555 555 4444"
                      placeholderTextColor={Colors.placeholder}
                      returnKeyType="done"
                      maxLength={12}
                      value={
                        compRef.state.idcardInfo.contact2
                          ? compRef.state.idcardInfo.contact2.phone
                          : ""
                      }
                      style={[
                        compRef.state.idcardInfoStatus.contact2 && styles.formText,
                        compRef.state.idcardInfoValidation.contact2 &&
                          !compRef.state.idcardInfo.contact2.phone &&
                          styles.inValidForm,
                        !compRef.state.idcardInfoStatus.contact2 && {
                          color: Colors.inactiveTextColor,
                        },
                      ]}
                      disabled={!compRef.state.idcardInfoStatus.contact2}
                    />
                  </View>
                </Item>
              </Col>
            </Grid>
          </Body>
          <Right style={[styles.formSwitch]}>
            <Switch
              onValueChange={() => {
                let props = { ...compRef.state.idcardInfoStatus };
                props.contact2 = !props.contact2;
                compRef.setState({ idcardInfoStatus: props });
                compRef.setState({ idcardInfoValidation: props });
                let realprops = { ...compRef.state.idcardRender };
                if (!props.contact2) {
                  delete realprops.contact2;
                } else {
                  realprops.contact2 = compRef.state.idcardInfo.contact2;
                }
                compRef.setState({ idcardRender: realprops });
              }}
              value={compRef.state.idcardInfoStatus.contact2}
            />
          </Right>
        </ListItem>
        <ListItem noBorder>
          <Body>
            <Item stackedLabel>
              <Label>Medical: </Label>
              <View
                style={{
                  width: "100%",
                  height: 40,
                  borderRadius: 10,
                  backgroundColor: compRef.state.idcardInfoStatus.medical
                    ? Colors.itemActive
                    : Colors.gray,
                  marginTop: 8,
                }}
              >
                <Input
                  placeholder="Medical"
                  placeholderTextColor={Colors.placeholder}
                  onChangeText={(text) => compRef.state.changeMedical(text)}
                  value={compRef.state.idcardInfo.medical}
                  style={[
                    compRef.state.idcardInfoStatus.medical && styles.formText,
                    compRef.state.idcardInfoValidation.medical &&
                      !compRef.state.idcardInfo.medical &&
                      styles.inValidForm,
                    !compRef.state.idcardInfoStatus.medical && { color: Colors.inactiveTextColor },
                  ]}
                  disabled={!compRef.state.idcardInfoStatus.medical}
                />
              </View>
            </Item>
          </Body>
          <Right style={[styles.formSwitch]}>
            <Switch
              onValueChange={() => {
                let props = { ...compRef.state.idcardInfoStatus };
                props.medical = !props.medical;
                compRef.setState({ idcardInfoStatus: props });
                compRef.setState({ idcardInfoValidation: props });
                let realprops = { ...compRef.state.idcardRender };
                if (!props.medical) {
                  delete realprops.medical;
                } else {
                  realprops.medical = compRef.state.idcardInfo.medical;
                }
                compRef.setState({ idcardRender: realprops });
              }}
              value={compRef.state.idcardInfoStatus.medical}
            />
          </Right>
        </ListItem>
        <ListItem noBorder>
          <Body>
            <Item stackedLabel>
              <Label>Note: </Label>
              <View
                style={{
                  width: "100%",
                  height: 40,
                  borderRadius: 10,
                  backgroundColor: compRef.state.idcardInfoStatus.note
                    ? Colors.itemActive
                    : Colors.gray,
                  marginTop: 8,
                }}
              >
                <Input
                  onChangeText={(text) => compRef.state.changeNote(text)}
                  value={compRef.state.idcardInfo.note}
                  placeholder="Note"
                  placeholderTextColor={Colors.placeholder}
                  style={[
                    compRef.state.idcardInfoStatus.note && styles.formText,
                    compRef.state.idcardInfoValidation.note &&
                      !compRef.state.idcardInfo.note &&
                      styles.inValidForm,
                    !compRef.state.idcardInfoStatus.note && { color: Colors.inactiveTextColor },
                  ]}
                  disabled={!compRef.state.idcardInfoStatus.note}
                />
              </View>
            </Item>
          </Body>
          <Right style={[styles.formSwitch]}>
            <Switch
              onValueChange={() => {
                let props = { ...compRef.state.idcardInfoStatus };
                props.note = !props.note;
                compRef.setState({ idcardInfoStatus: props });
                compRef.setState({ idcardInfoValidation: props });
                let realprops = { ...compRef.state.idcardRender };
                if (!props.note) {
                  delete realprops.note;
                } else {
                  realprops.note = compRef.state.idcardInfo.note;
                }
                compRef.setState({ idcardRender: realprops });
              }}
              value={compRef.state.idcardInfoStatus.note}
            />
          </Right>
        </ListItem>
        <View style={[styles.buttonContainer, { marginBottom: 30 }]}>
          <TouchableOpacity onPress={compRef.state.createKidsId} style={styles.createBotton}>
            <Text style={styles.claimText}>CREATE MY FREE KIDS ID NOW</Text>
          </TouchableOpacity>
        </View>
      </Form>
    </Content>
  </Container>
);
