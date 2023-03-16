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

const actionGetImages = (images) => {
  return {
    type: GET_IMAGE,
    images
  }
}

// const actionUpdateImage = (image) => {
//   return {
//     type: UPDATE_IMAGE,
//     image
//   }
// }

const actionDeleteImage = (imageId) => {
  return {
    type: DELETE_IMAGE,
    imageId
  }
}



export const thunkGetImage = (imageId) => async (dispatch) => {
  const response = await csrfFetch(`/api/images/${imageId.id}`);

  if(response.ok) {
    const data = await response.json();
    dispatch(actionCreateImage(data));
  }
};

//this thunk gets all the images
export const thunkGetAllImages = (images) => async (dispatch) => {
  const response = await csrfFetch(`/api/images`);

  if(response.ok) {
    const data = await response.json();
    dispatch(actionGetImages(data));

  }
};


export const thunkCreateImage = (photo) => async (dispatch) => {
  const { image, content } = photo;
  const formData = new FormData();
  formData.append('content', content);

  if(image) formData.append('image', image);

  const response = await csrfFetch(`/api/photos`, {
      method: 'POST',
      headers: {
          "Content-Type": "multipart/form-data",
      },
      body: formData,
  });
  if (response.ok) {
      const newPhoto = await response.json();
      dispatch(actionCreateImage(newPhoto));
      return newPhoto;
  }
};

export const thunkUpdateImage = (image) => async (dispatch) => {
  const response = await csrfFetch(`/api/images/${image.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(image),
  });

  if(response.ok) {
    const data = await response.json();
    dispatch(actionCreateImage(data));
    return data;
  }
};


export const thunkDeleteImage = (image) => async (dispatch) => {

  const response = await csrfFetch(`/api/images/${image.id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(image),
  });

  if(response.ok) {
    dispatch(actionDeleteImage(image.id));
    return true;
  }
};

const initialState = {};

const imageReducer = (state = initialState, action) => {

  let newState = {...state}

  switch(action.type) {

    case CREATE_IMAGE: {
        const newState = {...state};
        newState[action.image.id] = action.image
        return newState
    }

    case GET_IMAGE:
      action.images.forEach(image => {
        newState[image.id] = image
      })
      return newState;

    case UPDATE_IMAGE: {
      return {
          newState,
          [action.image.id]: {
            ...state[action.image.id],
            ...action.image,
          }
        };
      }

    case DELETE_IMAGE:
      delete newState[action.imageId]
      return newState;

    default:
      return state;
  }
}

export default imageReducer;
