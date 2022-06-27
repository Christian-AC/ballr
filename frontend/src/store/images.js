import { csrfFetch } from './csrf';

export const GET_IMAGE = 'images/GET_IMAGE'
export const UPDATE_IMAGE = 'images/UPDATE_IMAGE'
export const DELETE_IMAGE = 'images/DELETE_IMAGE'
export const CREATE_IMAGE = 'images/CREATE_IMAGE'

const actionCreateImage = (image) => {
  return {
    type: CREATE_IMAGE,
    image
  }
}

const actionGetImage = (image) => {
  return {
    type: GET_IMAGE,
    image
  }
}

const actionUpdateImage = (image) => {
  return {
    type: UPDATE_IMAGE,
    image
  }
}

const actionDeleteImage = (imageId) => {
  return {
    type: DELETE_IMAGE,
    imageId
  }
}

// this tunk gets all images of a user
export const thunkGetAllImages = (userId) => async (dispatch) => {

  const response = await csrfFetch(`/api/images/user/${userId}`);

  if(response.ok) {
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
  } else {
    return await response.json();
  }
};

// export const login = (user) => async (dispatch) => {
//   const { credential, password } = user;
//   const response = await csrfFetch('/api/session', {
//     method: 'POST',
//     body: JSON.stringify({
//       credential,
//       password,
//     }),
//   });
//   const data = await response.json();
//   dispatch(setUser(data.user));
//   return response;
// };

// export const login = (user) => async (dispatch) => {
//   const { credential, password } = user;
//   const response = await csrfFetch('/api/session', {
//     method: 'POST',
//     body: JSON.stringify({
//       credential,
//       password,
//     }),
//   });
//   const data = await response.json();
//   dispatch(setUser(data.user));
//   return response;
// };

// export const login = (user) => async (dispatch) => {
//   const { credential, password } = user;
//   const response = await csrfFetch('/api/session', {
//     method: 'POST',
//     body: JSON.stringify({
//       credential,
//       password,
//     }),
//   });
//   const data = await response.json();
//   dispatch(setUser(data.user));
//   return response;
// };

const initialState = {};

const imageReducer = (state = initialState, action) => {
  switch(action.type) {
    default:
      return state;
  }
}

export default imageReducer;
