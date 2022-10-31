import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AddRentalPlaceForm from '../components/Places/AddRentalPlaceForm';
import ErrorOverlay from '../components/UI/ErrorOverlay';
import IconButton from '../components/UI/IconButton';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import { Colors } from '../constants/colors';
import { AuthContext } from '../store/auth-context';
import { RentalPlacesContext } from '../store/rental-places-context';
import { addNewRentalPlace } from '../util/http';

const AddRentalPlaceScreen = ({ route, navigation }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState();

  const authCtx = useContext(AuthContext);
  const rentalPlacesCtx = useContext(RentalPlacesContext);

  const createPlaceHandler = async (placeData) => {
    setIsSubmitting(true);
    //token needs to be fetched from context for uploading data.
    try {
      const token = authCtx.token;
      console.log('token fetched from context', token);
      const reponse = await addNewRentalPlace(placeData, token);
      // must add returned object by server to context

      //must return to all AllRentalPlacesScreen
      setIsSubmitting(false);
      navigation.navigate('Home');
    } catch (error) {
      setError('Could not save data - please try again later!');
      console.log('error from createPlaceHandler', error);
      setIsSubmitting(false);
    }
  };

  const errorBackButtonHandler = () => {
    setError(null);
  }

  if (error && !isSubmitting) {
    return <ErrorOverlay message={error} onBackButtonPress={errorBackButtonHandler} />;
  }

  if (isSubmitting) {
    return <LoadingOverlay />;
  }

  return (
     <View style={styles.container}>
        <AddRentalPlaceForm onSubmit={createPlaceHandler} />
     </View>
  )
};

export default AddRentalPlaceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    backgroundColor: Colors.primary800,
  }
});
