import { useEffect, useState } from 'react';
import { ScrollView, Image, View, Text, StyleSheet } from 'react-native';
//import { SliderBox } from "react-native-image-slider-box"

import OutlinedButton from '../components/UI/OutlinedButton';
import { Colors } from '../constants/colors';
import SimpleCarousel from '../components/UI/SimpleCarousel';

const Separator = () => <View style={styles.separator}></View>;

function RentalPlaceDetailsScreen({ route, navigation }) {
  const [fetchedPlace, setFetchedPlace] = useState();
  const [images, setImages] = useState([]);

  // function showOnMapHandler() {
  //   navigation.navigate('Map', {
  //     initialLat: fetchedPlace.location.lat,
  //     initialLng: fetchedPlace.location.lng,
  //   });
  // }

  const selectedRentalPlace = route.params.rentalPlace;

  useEffect(() => {
    // async function loadPlaceData() {
    //   const place = await fetchPlaceDetails(selectedPlaceId);
    //   setFetchedPlace(place);
    //   navigation.setOptions({
    //     title: place.title,
    //   });
    // }
    console.log('selectedRentalPlace', selectedRentalPlace);
    setFetchedPlace(selectedRentalPlace);
    const imagesArray = selectedRentalPlace.images.map((image) => {
      return image.imageUrl;
    });
    setImages(imagesArray);
    navigation.setOptions({
      title: 'Rental Place',
    });
    //loadPlaceData();
  }, [selectedRentalPlace]);

  if (!fetchedPlace) {
    return (
      <View style={styles.fallback}>
        <Text>Loading place data...</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <SimpleCarousel images={fetchedPlace.images}/>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{fetchedPlace.title}</Text>
        <Separator />
        <Text style={[styles.text, { fontWeight: 'bold' }]}>
          {fetchedPlace.rent} PKR / night
        </Text>
        <Separator />
        <Text style={styles.text}>
          {fetchedPlace.streetAddress}, {fetchedPlace.postCode},{' '}
          {fetchedPlace.city}.
        </Text>
        <Separator />

        <Text style={styles.text}>{fetchedPlace.description}</Text>
        <Separator />
        <Text
          style={{ color: Colors.primary100, fontSize: 16, marginBottom: 8, fontWeight: 'bold' }}
        >
          Publisher Details:
        </Text>
        <Text style={styles.text}>{fetchedPlace.user.name}</Text>
        <Text style={styles.text}>+92 3224259845</Text>
        <Text style={styles.text}>{fetchedPlace.user.email}</Text>
      </View>
    </ScrollView>
  );
}

export default RentalPlaceDetailsScreen;

const styles = StyleSheet.create({
  fallback: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: '35%',
    minHeight: 300,
    width: '100%',
  },
  infoContainer: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary100,
  },
  text: {
    fontSize: 16,
    color: Colors.primary100,
  },
  detailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  attributeTab: {
    flex: 8,
    height: 20,
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  attributeText: {
    textAlign: 'center',
  },
  labelContainer: {
    flex: 2,
  },

  label: {
    fontSize: 14,
    //color: Colors.primary100,
    color: 'white',
    marginBottom: 4,
    marginTop: 8,
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary500,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  separator: {
    borderBottomColor: Colors.primary100,
    borderBottomWidth: 2,
    marginVertical: 12,
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    margin: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    //borderColor: Colors.primary200,
    borderColor: 'white',
  },
});
