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


// this tunk gets a single image
export const thunkGetImage = (imageId) => async (dispatch) => {

  const response = await csrfFetch(`/api/images/${imageId}`);

  if(response.ok) {
    const data = await response.json();
    dispatch(actionCreateImage(data.user));
    return response;
  } else {
    return await response.json();
  }
};

//this thunk gets all the images
export const thunkGetAllImages = () => async (dispatch) => {
  const response = await csrfFetch(`/api/images`);

  if(response.ok) {
    const data = await response.json();
    dispatch(actionGetImages(data));
    return response;
  } else {
    return await response.json();
  }
};


export const thunkCreateImage = (image) => async (dispatch) => {
  const response = await csrfFetch(`/api/images/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(image),
  });

  if(response.ok) {
    const data = await response.json();
    dispatch(actionCreateImage(data.user));
    return response;
  } else {
    return await response.json();
  }
};

export const thunkUpdateImage = (image) => async (dispatch) => {
  const response = await csrfFetch(`/api/images/create`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(image),
  });

  if(response.ok) {
    const data = await response.json();
    dispatch(actionCreateImage(data.user));
    return response;
  } else {
    return await response.json();
  }
};


export const thunkDeleteImage = (image) => async (dispatch) => {

  const response = await csrfFetch('/api/images/', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(image),
  });

  if(response.ok) {
    dispatch(actionDeleteImage(image.id));
    return response;
  } else {
    return await response.json();
  }


};

const initialState = {};

const imageReducer = (state = initialState, action) => {

  let newState = {...state}

  switch(action.type) {

    case CREATE_IMAGE: {
      if(!state[action.image.id]) {
        const newState = {
          ...state,
          [action.image.id]: action.image
        };
        return newState;
      }
    }
    return {
      ...state,
      [action.image.id]: action.image
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
