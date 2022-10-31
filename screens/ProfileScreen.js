import { useContext, useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';

import RentalPlacesList from '../components/Places/RentalPlacesList';
import { AuthContext } from '../store/auth-context';
import { RentalPlacesContext } from '../store/rental-places-context';
import {
  fetchRentalPlaces,
  fetchUserById,
  deletePlaceById,
} from '../util/http';

const ProfileScreen = () => {
  //const [loadedRentalPlaces, setLoadedRentalPlaces] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState();
  const [user, setUser] = useState();

  //const rentalPlaceCtx = useContext(RentalPlacesContext);
  const authCtx = useContext(AuthContext);
  const isFocused = useIsFocused();

  const placeDeleteHandler = async (placeId) => {
    console.log('placeDeleteHandler', placeId);
    try {
      const responseData = await deletePlaceById(placeId);
      const userId = authCtx.user_id;
      const fetchedUser = await fetchUserById(userId);
      setUser(fetchedUser);
    } catch {
      console.log('error form deletePlaceHandler', error);
      setError('Could not delete place. Please try again later!');
    }
  };

  useEffect(() => {
    const getUser = async () => {
      //getting user with his list of rental places
      try {
        const userId = authCtx.user_id;
        const fetchedUser = await fetchUserById(userId);
        //console.log('rentalPlaces array from AllRentalPlaceScreeen', rentalPlaces);
        //rentalPlaceCtx.setRentalPlaces(rentalPlaces);
        setUser(fetchedUser);
      } catch (error) {
        console.log('error from ProfileScreen', error);
        setError('Could not fetch rental places for you!');
      }
    };
    if (isFocused) {
      getUser();
    }
  }, [isFocused]);

  return (
    <RentalPlacesList
      rentalPlaces={user ? user.places : []}
      userMode={true}
      placeDeleteHandler={placeDeleteHandler}
    />
  );
};

export default ProfileScreen;
