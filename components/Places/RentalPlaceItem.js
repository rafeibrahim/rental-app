import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { Colors } from '../../constants/colors';
import IconButton from '../UI/IconButton';

const RentalPlaceItem = ({ rentalPlace, onSelect, userMode, placeDeleteHandler }) => {
  console.log('rentalPlace from rentalPlaceItem', rentalPlace);
  const { title, streetAddress, postCode, city, rent, } = rentalPlace;

  return (
    <Pressable
      style={({ pressed }) => [styles.item, pressed && styles.pressed]}
      onPress={onSelect.bind(this, rentalPlace)}
    >
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: rentalPlace.images[0].imageUrl }} />
      </View>
      <View style={styles.info}>
        <Text style={styles.address}>{rent} PKR / night</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.address}>{streetAddress}, {postCode}, {city}.</Text>
      </View>
      <View style={styles.buttonContainer}>
      {userMode && <IconButton icon='trash' size={24} color='red' onPress={placeDeleteHandler.bind(this, rentalPlace.id)}/>}
      </View>
    </Pressable>
  );
};

export default RentalPlaceItem;

const styles = StyleSheet.create({
  item: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    borderRadius: 6,
    marginVertical: 12,
    backgroundColor: Colors.primary100,
    elevation: 2,
    shadowColor: 'black',
    shadowOpacity: 0.15,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 2,
  },
  pressed: {
    opacity: 0.9,
  },
  imageContainer: {
    width: '100%',
    height: 200,
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
  info: {
    justifyContent: 'flex-start',
    paddingHorizontal: 16
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    color: Colors.primary800,
    marginVertical: 8,
  },
  address: {
    fontSize: 12,
    color: Colors.primary800,
  },
  buttonContainer: {
    width: '100%',
  }
});
