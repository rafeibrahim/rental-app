import { useContext, useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';

import RentalPlacesList from '../components/Places/RentalPlacesList';
import { RentalPlacesContext } from '../store/rental-places-context';
import { fetchRentalPlaces } from '../util/http';

const AllRentalPlacesScreen = () => {
  //const [loadedRentalPlaces, setLoadedRentalPlaces] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState();

  const rentalPlaceCtx = useContext(RentalPlacesContext);
  const isFocused = useIsFocused();

  useEffect(() => {
    const getRentalPlaces = async () => {
      try {
        const rentalPlaces = await fetchRentalPlaces();
        rentalPlaceCtx.setRentalPlaces(rentalPlaces);
      } catch (error) {
        console.log('error', error);
        setError('Could not fetch rental places!');
      }
    };
    if (isFocused) {
      getRentalPlaces();
    }
  }, [isFocused]);

  return <RentalPlacesList rentalPlaces={rentalPlaceCtx.rentalPlaces} />;
};

export default AllRentalPlacesScreen;
