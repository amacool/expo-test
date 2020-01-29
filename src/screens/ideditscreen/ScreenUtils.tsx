// Define PropTypes
import { Image, TouchableOpacity, View, Text } from "react-native";
import {
  Container,
  Content,
  Form,
  Icon,
  DatePicker,
  Picker,
  Item,
  Input,
} from "native-base";
import * as React from "react";
import { widthPercentageToDP as wp} from "../../helpers/Responsive";
import IDCard from "../../components/IdCard";
import IDEditScreen from "./IDEditScreen";
import { styles } from "./Styles";
import HeaderComponent from "../../components/headerComponent";
import Colors from "../../constants/Colors";
import CardInputComponent from "../../components/CardInputComponent";
import CardPickerComponent from "../../components/CardPickerComponent";
import images from "../../assets/images";

export interface Props {}

// Define States
export interface State {
  idcardInfo: IDCardInterface;
  idcardRender: IDCardInterface;
  idcardInfoStatus: IDCardStatusInterface;
  idcardInfoValidation: IDCardStatusInterface;
  cardIndex: number;
  states: any;
  isValid: boolean,
  uploadPhoto: () => void;
  changeInfo: (key: string, value: string) => void;
  changeContactInfo: (key: string, value: string) => void;
  createKidsId: () => void;
}

export const render = (compRef: IDEditScreen) => (
  <Container style={styles.container}>
    <HeaderComponent title="Edit ID" message back checked={compRef.state.isValid}/>
    <Content disableKBDismissScroll={true}>
      <View style={styles.welcomeContainer}>
        <IDCard ref={(ref) => (compRef.imageRef = ref)} {...compRef.state.idcardRender} />
      </View>
      <View style={[styles.buttonContainer, { marginTop: 30 }]}>
        <TouchableOpacity
          style={styles.btnUpload}
          onPress={compRef.state.uploadPhoto}
        >
          <Text style={styles.btnUploadText}>Upload Photo</Text>
          <Image source={images.uploadPhotoBtn} style={{ width: 30, height: 30 }} />
        </TouchableOpacity>
      </View>
      <View style={[styles.buttonContainer, { marginTop: 10 }]}>
        <TouchableOpacity onPress={compRef._handleHelpPress}>
          <Text style={styles.problemText}>Problem Uploading?</Text>
        </TouchableOpacity>
      </View>
      <Form style={{ paddingHorizontal: wp(4) }}>
        <CardInputComponent label="Name">
          <Input
            onChangeText={(text) => compRef.state.changeInfo('name', text)}
            maxLength={25}
            placeholder="Enter Name"
            placeholderTextColor={Colors.placeholder}
            value={compRef.state.idcardInfo.name}
            style={[
              styles.formText,
              compRef.state.idcardInfoValidation.name &&
              !compRef.state.idcardInfo.name && styles.inValidForm,
            ]}
          />
        </CardInputComponent>

        <CardPickerComponent label="Date of Birth">
          <DatePicker
            defaultDate={new Date(compRef.state.idcardInfo.birthday)}
            minimumDate={new Date(2008, 1, 1)}
            maximumDate={new Date(2028, 12, 31)}
            locale={"en"}
            timeZoneOffsetInMinutes={undefined}
            modalTransparent={false}
            animationType={"fade"}
            androidMode={"default"}
            textStyle={{fontFamily: 'Metropolis-Medium', color: Colors.black,}}
            onDateChange={(date) => compRef.state.changeInfo('birthday', date)}
          />
        </CardPickerComponent>

        <CardInputComponent label="Breed">
          <Input
            placeholder="Enter Breed..."
            placeholderTextColor={Colors.placeholder}
            onChangeText={(text) => compRef.state.changeInfo('breed', text)}
            value={compRef.state.idcardInfo.breed}
            style={[
              styles.formText,
              compRef.state.idcardInfoValidation.breed &&
              !compRef.state.idcardInfo.breed && styles.inValidForm,
            ]}
          />
        </CardInputComponent>

        <CardPickerComponent label="Gender">
          <Picker
            mode="dropdown"
            placeholder="Select Gender"
            placeholderStyle={{ color: Colors.placeholder, fontFamily: 'Metropolis-Thin' }}
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
            textStyle={{fontFamily: 'Metropolis-Thin'}}
            selectedValue={
              compRef.state.idcardInfo.gender !== ""
                ? compRef.state.idcardInfo.gender
                : "Select Gender"
            }
            onValueChange={(itemValue) =>
              compRef.state.changeInfo('gender', itemValue)
            }
          >
            <Item
              label="Male"
              value="male"
              style={{ width: 100, backgroundColor: Colors.white }}
            />
            <Item
              label="Female"
              value="female"
              style={{ width: 100, backgroundColor: Colors.white }}
            />
          </Picker>
        </CardPickerComponent>

        <CardInputComponent label="Fur Color">
          <Input
            placeholder="Enter Fur Color..."
            placeholderTextColor={Colors.placeholder}
            onChangeText={(text) => compRef.state.changeInfo('color', text)}
            value={compRef.state.idcardInfo.color}
            style={[
              styles.formText,
              compRef.state.idcardInfoValidation.color &&
              !compRef.state.idcardInfo.color &&
              styles.inValidForm,
            ]}
          />
        </CardInputComponent>

        <CardInputComponent label="Contact">
          <Text style={{ color: Colors.mainColor, alignSelf: 'flex-end', marginTop: -20 }}>+ Add another</Text>
          <Input
            placeholder="555 555 5555"
            placeholderTextColor={Colors.placeholder}
            onChangeText={(text) => compRef.state.changeContactInfo('contact', text)}
            keyboardType="phone-pad"
            returnKeyType="done"
            maxLength={12}
            value={
              compRef.state.idcardInfo.contact
            }
            style={[
              styles.formText,
              compRef.state.idcardInfoValidation.contact &&
              !compRef.state.idcardInfo.contact &&
              styles.inValidForm,
            ]}
          />
        </CardInputComponent>

        <CardInputComponent label="Address">
          <Input
            placeholder="Enter Address..."
            placeholderTextColor={Colors.placeholder}
            onChangeText={(text) => compRef.state.changeInfo('address', text)}
            value={compRef.state.idcardInfo.address}
            style={[
              styles.formText,
              compRef.state.idcardInfoValidation.address &&
              !compRef.state.idcardInfo.address &&
              styles.inValidForm,
            ]}
          />
        </CardInputComponent>

        <CardInputComponent label="City">
          <Input
            placeholder="Enter City..."
            placeholderTextColor={Colors.placeholder}
            onChangeText={(text) => compRef.state.changeInfo('city', text)}
            value={compRef.state.idcardInfo.city}
            style={[
              styles.formText,
              compRef.state.idcardInfoValidation.city &&
              !compRef.state.idcardInfo.city &&
              styles.inValidForm,
            ]}
          />
        </CardInputComponent>

        <CardPickerComponent label="State/Province/Region">
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
              compRef.state.changeInfo('state', itemValue)
            }
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
        </CardPickerComponent>

        <CardInputComponent label="Zip Code(Postal Code)">
          <Input
            placeholder="Enter ZipCode..."
            placeholderTextColor={Colors.placeholder}
            onChangeText={(text) => compRef.state.changeInfo('zipcode', text)}
            value={compRef.state.idcardInfo.zipcode}
            style={[
              styles.formText,
              compRef.state.idcardInfoValidation.zipcode &&
              !compRef.state.idcardInfo.zipcode &&
              styles.inValidForm,
            ]}
          />
        </CardInputComponent>
        
        <CardInputComponent label="Notes">
          <Input
            onChangeText={(text) => compRef.state.changeInfo('note', text)}
            value={compRef.state.idcardInfo.note}
            placeholder="Enter Note..."
            placeholderTextColor={Colors.placeholder}
            style={[
              styles.formText,
              compRef.state.idcardInfoValidation.note &&
              !compRef.state.idcardInfo.note &&
              styles.inValidForm,
            ]}
          />
        </CardInputComponent>
      </Form>
      <View style={[styles.buttonContainer, { marginTop: 30, marginBottom: 30 }]}>
        <TouchableOpacity
          style={styles.btnUpload}
          onPress={compRef.state.uploadPhoto}
        >
          <Text style={[styles.btnUploadText, { textAlign: 'center' }]}>Upload Photo</Text>
        </TouchableOpacity>
      </View>
    </Content>
  </Container>
);
