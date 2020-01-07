import { action, observable } from "mobx";
import { NavigationActions, StackActions } from "react-navigation";
import { Alert, AsyncStorage, CameraRoll, PixelRatio } from "react-native";
import { takeSnapshotAsync } from "expo";

class ViewScreenSnapStore {
  screenShot = async (imageRef, pixelRatio = PixelRatio.get()) => {
    // console.log("++++++++: ", imageRef.props.photo);
    Alert.alert(
      "Save as an Image",
      "Are you sure to save an image in Photo Gallery?",
      [
        {
          text: "Cancel",
          onPress: () => {
            console.log("Cancel Pressed");
            return false;
          },
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            const targetPixelCount = 1013; // If you want full HD pictures
            const width = 1013;
            const pixels = targetPixelCount / pixelRatio;
            takeSnapshotAsync(imageRef, {
              result: "file",
              width: width,
              height: pixels * 2,
              quality: 1,
              format: "png",
            }).then(
              (result) => {
                console.log("----------: ", result);
                CameraRoll.saveToCameraRoll(result, "photo").then(
                  (saveResult) => {
                    console.log(saveResult);
                    return true;
                  },
                  (err) => {
                    console.log(err);
                    return false;
                  },
                );
              },
              (err) => {
                console.log("Error: **********", err);
                return false;
              },
            );
          },
        },
      ],
      { cancelable: false },
    );
  };
}

export default new ViewScreenSnapStore();
