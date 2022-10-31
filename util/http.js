import axios from 'axios';
import { API_URL } from '../constants/urlConst';

const addNewRentalPlace = async (placeData, token) => {
  console.log('addNewRentalPlace from http utility folder', token)
  const headersObject = {
    'Content-Type': 'multipart/form-data',
    'Authorization': 'bearer ' + token,
  };
  const response = await axios.post(
    API_URL + 'places',
    placeData,
    {
      headers: headersObject
    }
  );
  console.log(response.data);
  return response.data;
};

const fetchRentalPlaces = async () => {
  const response = await axios.get(API_URL + 'places');
  //console.log('response data from http places get', response.data);
  return await response.data;
}

const fetchUserById = async (userId) => {
  const response = await axios.get(API_URL + 'users/' + userId);
  return await response.data;
}

const deletePlaceById = async (placeId) => {
  const response = await axios.delete(API_URL + 'places/' + placeId);
  return await response.data;
}

// const handleUploadPhoto = () => {
//     const body = createFormData(photo1, photo2, {
//       title: 'titleTestApp',
//       city: 'cityTestApp',
//       price: 'priceTestApp',
//     });
//     //console.log('body', body);
//     axios
//       .post(SERVER_URL + '/api/places', body, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           Authorization:
//             'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJvb3QiLCJpZCI6IjYzMjMyNzgxNzBkMDRhYWYzMjcxOWY0MiIsImlhdCI6MTY2MzI1OTU2MywiZXhwIjoxNjYzMjYzMTYzfQ._o7S6mB4ki-Pd2YK-QeYg9jlHPgYaf19ZYaoeVx_52Q',
//         },
//       })
//       .then((response) => {
//         console.log(response);
//       })
//       .catch((error) => {
//         console.log(error.response.data);
//       });
//   };

export { addNewRentalPlace, fetchRentalPlaces, fetchUserById, deletePlaceById };
