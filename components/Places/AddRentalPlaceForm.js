import React, { useState, useCallback } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
} from 'react-native';

import { Colors } from '../../constants/colors';
import { Place } from '../../models/place';
import Button from '../UI/Button';
import ImagePicker from './ImagePicker';
import Input from './RentalDataInput';
import LocationPicker from './LocationPicker';
import IconButton from '../UI/IconButton';
import OutlinedButton from '../UI/OutlinedButton';

const defaultInputValues = {
  title: {
    value: '',
    isValid: true,
  },
  streetAddress: {
    value: '',
    isValid: true,
  },
  postCode: {
    value: '',
    isValid: true,
  },
  city: {
    value: '',
    isValid: true,
  },
  rent: {
    value: '',
    isValid: true,
  },
  description: {
    value: '',
    isValid: true,
  },
};

const PlaceCreateForm = ({ onSubmit }) => {
  const [inputs, setInputs] = useState(defaultInputValues);

  //const [enteredTitle, setEnteredTitle] = useState('');
  //const [enteredAddress, setEnteredAddress] = useState('');
  //const [selectedImage, setSelectedImage] = useState();
  const [selectedImagesArray, setSelectedImagesArray] = useState([]);
  //const [pickedLocation, setPickedLocation] = useState();

  const inputChangeHandler = (inputIdentifier, enteredValue) => {
    setInputs((currentInputs) => {
      return {
        ...currentInputs,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  };

  // const changeTitleHandler = (enteredText) => {
  //   setEnteredTitle(enteredText);
  // };

  // const changeAddressHandler = (enteredText) => {
  //   setEnteredAddress(enteredText);
  // };

  const takeImageHandler = (imageObject) => {
    setSelectedImagesArray([...selectedImagesArray, imageObject]);
  };

  // const pickLocationHandler = useCallback((location) => {
  //   setPickedLocation(location);
  // }, []);

  const createFormData = () => {
    const data = new FormData();

    selectedImagesArray.forEach((image, index) => {
      data.append('rentalPlaceImage', {
        name: 'image' + index,
        type: image.type,
        uri: image.uri.replace('file://', ''),
      });
    });
    
    data.append('title', inputs.title.value);
    data.append('streetAddress', inputs.streetAddress.value);
    data.append('postCode', inputs.postCode.value);
    data.append('city', inputs.city.value);
    data.append('rent', inputs.rent.value);
    data.append('description', inputs.description.value);
    // dummy lat and lng values for server.
    data.append('latitude', '35.8819');
    data.append('longitude', '76.4643');

    return data;
  };

  const savePlaceHandler = () => {
    //const placeData = new Place(enteredTitle, selectedImage, pickedLocation);
    console.log('executing savePlaceHandler');

    //validation check (currently only checking for empty inputs)
    const titleIsValid = inputs.description.value.trim().length > 0;
    const streetAddressIsValid = inputs.streetAddress.value.trim().length > 0;
    const postCodeIsValid = inputs.postCode.value.trim().length > 0;
    const cityIsValid = inputs.city.value.trim().length > 0;
    const rentIsValid = inputs.rent.value.trim().length > 0;
    const descriptionIsValid = inputs.description.value.trim().length > 0;

    if (
      !titleIsValid ||
      !streetAddressIsValid ||
      !postCodeIsValid ||
      !cityIsValid ||
      !rentIsValid ||
      !descriptionIsValid
    ) {
      // Alert.alert('Invalid input', 'Please check your input values');
      setInputs((curInputs) => {
        return {
          title: {
            value: curInputs.title.value,
            isValid: titleIsValid,
          },
          streetAddress: {
            value: curInputs.streetAddress.value,
            isValid: streetAddressIsValid,
          },
          postCode: {
            value: curInputs.postCode.value,
            isValid: postCodeIsValid,
          },
          city: {
            value: curInputs.city.value,
            isValid: cityIsValid,
          },
          rent: {
            value: curInputs.rent.value,
            isValid: rentIsValid,
          },
          description: {
            value: curInputs.description.value,
            isValid: descriptionIsValid,
          },
        };
      });
      return;
    }

    if (selectedImagesArray.length === 0) {
      Alert.alert('Image Missing', 'Please pick at least one image');
      return;
    }

    const placeData = createFormData();
    console.log('placeData', placeData);
    onSubmit(placeData);
  };

  const resetHandler = () => {
    setInputs(defaultInputValues);
    setSelectedImagesArray([]);
  };

  return (
    <View style={styles.form}>
      {/* <Text style={styles.title}>Your Rental Place</Text> */}
      <ScrollView>
        <View>
          <Input
            style={styles.rowInput}
            label="Title"
            invalid={!inputs.title.isValid}
            textInputConfig={{
              autoCapitalize: 'none',
              autoCorrect: false, // default is true
              onChangeText: inputChangeHandler.bind(this, 'title'),
              value: inputs.title.value,
            }}
          />
          <Input
            style={styles.rowInput}
            label="Street Address"
            invalid={!inputs.streetAddress.isValid}
            textInputConfig={{
              autoCapitalize: 'none',
              autoCorrect: false, // default is true
              onChangeText: inputChangeHandler.bind(this, 'streetAddress'),
              value: inputs.streetAddress.value,
            }}
          />
          <View style={styles.inputsRow}>
            <Input
              style={styles.rowInput}
              label="Post Code"
              invalid={!inputs.postCode.isValid}
              textInputConfig={{
                autoCapitalize: 'none',
                autoCorrect: false, // default is true
                keyboardType: 'number-pad',
                onChangeText: inputChangeHandler.bind(this, 'postCode'),
                value: inputs.postCode.value,
              }}
            />
            <Input
              style={styles.rowInput}
              label="City"
              invalid={!inputs.city.isValid}
              textInputConfig={{
                onChangeText: inputChangeHandler.bind(this, 'city'),
                value: inputs.city.value,
              }}
            />
            <Input
              style={styles.rowInput}
              label="Rent / night"
              invalid={!inputs.rent.isValid}
              textInputConfig={{
                autoCapitalize: 'none',
                autoCorrect: false, // default is true
                keyboardType: 'number-pad',
                onChangeText: inputChangeHandler.bind(this, 'rent'),
                value: inputs.rent.value,
              }}
            />
          </View>
          <Input
            label="Description"
            invalid={!inputs.description.isValid}
            textInputConfig={{
              multiline: true,
              autoCapitalize: 'none',
              autoCorrect: false, // default is true
              onChangeText: inputChangeHandler.bind(this, 'description'),
              value: inputs.description.value,
            }}
          />
          {/* <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            onChangeText={changeTitleHandler}
            value={enteredTitle}
          />
          <Text style={styles.label}>Address</Text>
          <TextInput
            style={styles.input}
            onChangeText={changeAddressHandler}
            value={enteredAddress}
          /> */}
        </View>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Add Up to Five Images Below</Text>
        </View>
        <ImagePicker
          onTakeImage={takeImageHandler}
          imagesArray={selectedImagesArray}
        />
        {/* <LocationPicker onPickLocation={pickLocationHandler} /> */}
        <OutlinedButton onPress={savePlaceHandler} icon="save">
          Add Place
        </OutlinedButton>
        <OutlinedButton onPress={resetHandler} icon="build">
          Reset
        </OutlinedButton>
      </ScrollView>
    </View>
  );
};

export default PlaceCreateForm;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 12,
    textAlign: 'center',
  },
  inputsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowInput: {
    flex: 1,
  },
  labelContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 14,
    color: Colors.primary100,
    //color: 'white',
    marginBottom: 4,
    marginTop: 8,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100,
  },
});
