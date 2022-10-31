import { useNavigation } from '@react-navigation/native';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import { Colors } from '../../constants/colors';
import RentalPlaceItem from './RentalPlaceItem';

const RentalPlacesList = ({ rentalPlaces, userMode, placeDeleteHandler }) => {
  const navigation = useNavigation();

  function selectPlaceHandler(rentalPlace) {
    navigation.navigate('RentalPlaceDetails', {
      rentalPlace: rentalPlace
    });
  }

  if (!rentalPlaces || rentalPlaces.length === 0) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>
          No rental places to show at the moment
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.list}
      data={rentalPlaces}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <RentalPlaceItem rentalPlace={item} onSelect={selectPlaceHandler} userMode={userMode} placeDeleteHandler={placeDeleteHandler} /> 
      )}
    />
  );
}

export default RentalPlacesList;

const styles = StyleSheet.create({
  list: {
    margin: 8,
  },
  fallbackContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fallbackText: {
    fontSize: 16,
    color: Colors.primary200,
  },
});