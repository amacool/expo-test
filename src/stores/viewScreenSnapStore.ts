import { NavigationActions, StackActions } from "react-navigation";
import { Alert, CameraRoll } from "react-native";
import { captureRef as takeSnapshotAsync } from 'react-native-view-shot'
// import * as CameraRoll from "@react-native-community/cameraroll";
import * as Sharing from 'expo-sharing';

class ViewScreenSnapStore {
  download = async (imageRef) => {
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
          onPress: async () => {
            try {
              let result  = await takeSnapshotAsync(imageRef, {
                result: "tmpfile",
                width: 1013,
                height: 644,
                quality: 1,
                format: "png",
              });
              await CameraRoll.saveToCameraRoll(result, "photo");
              alert("Done");
            } catch (e) {
              alert(e);
              console.log('error:', e);
            }
          },
        },
      ],
      { cancelable: false },
    );
  };
  share = async (imageRef) => {
    // console.log("++++++++: ", imageRef.props.photo);
    Alert.alert(
      "Save as an Image",
      "Are you sure to share an image?",
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
          onPress: async () => {
            try {
              let result  = await takeSnapshotAsync(imageRef, {
                result: "tmpfile",
                width: 1013,
                height: 644,
                quality: 1,
                format: "png",
              });
              Sharing.shareAsync(result);
            } catch (e) {
              alert(e);
              console.log('error:', e);
            }
          },
        },
      ],
      { cancelable: false },
    );
  };
}

export default new ViewScreenSnapStore();
