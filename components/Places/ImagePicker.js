import {
  Alert,
  Image,
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
  ScrollView,
} from 'react-native';
import {
  launchCameraAsync,
  launchImageLibraryAsync,
  useCameraPermissions,
  PermissionStatus,
  MediaTypeOptions,
} from 'expo-image-picker';
import { useState } from 'react';

import { Colors } from '../../constants/colors';
import OutlinedButton from '../UI/OutlinedButton';

function ImagePicker({ onTakeImage, imagesArray }) {
  //const [pickedImage, setPickedImage] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  //const [imagesArray, setImageArrays] = useState([]);

  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions();

  async function verifyPermissions() {
    if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        'Insufficient Permissions!',
        'You need to grant camera permissions to use this app.'
      );
      return false;
    }

    return true;
  }

  async function takeImageHandler() {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    //setPickedImage(image.uri);
    //setImageArrays([image, ...imagesArray]);
    setModalVisible(false);

    onTakeImage(image);
  }

  const pickImageHandler = async (photoNumber) => {
    // No permissions request is necessary for launching the image library
    let result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.2,
    });

    //console.log('result of picker', result);

    if (!result.cancelled) {
      //setPickedImage(result.uri);
      //setImageArrays([result, ...imagesArray]);
      onTakeImage(result);
    }
    setModalVisible(false);
  };

  const showModalHandler = () => {
    setModalVisible(true);
  };

  const closeModalHandler = () => {
    setModalVisible(false);
  };

  const imagesPreviewComponent = () => {
    const imagePreviews = imagesArray.map((image) => {
      return (
        <View style={styles.imagePreview} key={image.uri}>
          <Image style={styles.image} source={{ uri: image.uri }} />
        </View>
      );
    });
    return imagePreviews;
  };

  //  let imagePreview = <Text>Press to Add Image</Text>;

  //   if (pickedImage) {
  //     imagePreview = <Image style={styles.image} source={{ uri: pickedImage }} />;
  //   }

  //  if (!imagesArray.lenght === 0){
  //     const imagePreviews = imagesArray.map((image) => {
  //         <Image style={styles.image} source={{ uri: image.uri}} />
  //     })
  //  }

  return (
    <ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.modalButtonContainer}>
              <OutlinedButton icon="camera" onPress={takeImageHandler}>
                Camera
              </OutlinedButton>
            </View>
            <View style={styles.modalButtonContainer}>
              <OutlinedButton icon="images" onPress={pickImageHandler}>
                Library
              </OutlinedButton>
            </View>
            <View style={styles.modalButtonContainer}>
              <OutlinedButton icon="close" onPress={closeModalHandler}>
                Cancel
              </OutlinedButton>
            </View>
          </View>
        </View>
      </Modal>
      <ScrollView>
        {imagesArray.length < 5 && (
          <OutlinedButton icon="camera" onPress={showModalHandler}>
            Add Image
          </OutlinedButton>
        )}
        {/* {imagesArray.length < 5 && (
          <Pressable onPress={showModalHandler}>
            <View style={styles.imagePreview}>
              <Text>Press to Add Image</Text>
            </View>
          </Pressable>
        )} */}
        {imagesArray.length !== 0 && imagesPreviewComponent()}
      </ScrollView>
    </ScrollView>
  );
}

export default ImagePicker;

const styles = StyleSheet.create({
  imagePreview: {
    width: '100%',
    height: 150,
    marginBottom: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'stretch',
    marginTop: 22,
  },
  modalView: {
    flexDirection: 'row',
    margin: 0,
    backgroundColor: Colors.primary700,
    borderRadius: 20,
    padding: 32,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalButtonContainer: {
    flex: 1,
  },
});
