import { createContext, useReducer } from 'react';

const DUMMY_RENTAL_PLACES = [
  {
    id: 'r1',
    imageUri: 'https://picsum.photos/200/100',
    title: 'Test Rental Place1',
    address: 'Test Street, 49 B 00580, Test City',
  },
  {
    id: 'r2',
    imageUri: 'https://picsum.photos/200/100',
    title: 'Test Rental Place2',
    address: 'Test Street, 49 B 00580, Test City',
  },
  {
    id: 'r3',
    imageUri: 'https://picsum.photos/200/100',
    title: 'Test Rental Place3',
    address: 'Test Street, 49 B 00580, Test City',
  },
  {
    id: 'r4',
    imageUri: 'https://picsum.photos/200/100',
    title: 'Test Rental Place4',
    address: 'Test Street, 49 B 00580, Test City',
  },
];

export const RentalPlacesContext = createContext({
  rentalPlaces: [],
  addRentalPlace: ({ title, address, postCode, city, price }) => {},
  setRentalPlaces: (rentalPlaces) => {},
});

const rentalPlacesReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.payload;
    case 'ADD':
      return [action.payload, ...state];
    default:
      return state;
  }
};

const RentalPlacesContextProvider = ({ children }) => {
  const [rentalPlacesState, dispatch] = useReducer(
    rentalPlacesReducer,
    []
  );

  const addRentalPlace = (rentalPlaceData) => {
    dispatch({ type: 'ADD', payload: rentalPlaceData });
  };

  const setRentalPlaces = (rentalPlaces) => {
    dispatch({ type: 'SET', payload: rentalPlaces });
  };

  const value = {
    rentalPlaces: rentalPlacesState,
    setRentalPlaces: setRentalPlaces,
    addRentalPlace: addRentalPlace,
  };

  return (
    <RentalPlacesContext.Provider value={value}>
      {children}
    </RentalPlacesContext.Provider>
  );
};

export default RentalPlacesContextProvider;
