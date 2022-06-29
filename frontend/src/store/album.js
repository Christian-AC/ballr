import { csrfFetch } from './csrf';

export const GET_ALBUMS = 'album/GET_ALBUM'
export const UPDATE_ALBUM = 'album/UPDATE_ALBUM'
export const DELETE_ALBUM = 'album/DELETE_ALBUM'
export const CREATE_ALBUM = 'album/CREATE_ALBUM'

const actionCreateAlbum = (album) => {
  return {
    type: CREATE_ALBUM,
    album
  }
}

const actionGetAlbums = (albums) => {
  return {
    type: GET_ALBUMS,
    albums
  }
}

const actionUpdateAlbum = (album) => {
  return {
    type: UPDATE_ALBUM,
    album
  }
}

const actionDeleteAlbum = (albumId) => {
  return {
    type: DELETE_ALBUM,
    albumId
  }
}


// this tunk gets a single album
export const thunkGetalbum = (albumId) => async (dispatch) => {
  const response = await csrfFetch(`/api/albums/${albumId.id}`);

  if(response.ok) {
    const data = await response.json();
    dispatch(actionCreateAlbum(data));
  }
};

//this thunk gets all the albumss
export const thunkGetAllALbums = () => async (dispatch) => {
  const response = await csrfFetch(`/api/albums`);

  if(response.ok) {
    const data = await response.json();
    dispatch(actionGetAlbums(data));

  }
};


export const thunkCreatealbum = (album) => async (dispatch) => {
  const response = await csrfFetch(`/api/albums/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(album),
  });

  if(response.ok) {
    const data = await response.json();
    dispatch(actionCreateAlbum(data));

  }
};

export const thunkUpdateAlbum = (album) => async (dispatch) => {
  const response = await csrfFetch(`/api/albums/${album.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(album),
  });

  if(response.ok) {
    const data = await response.json();
    dispatch(actionCreateAlbum(data));

  }
};


export const thunkDeleteAlbum = (album) => async (dispatch) => {

  const response = await csrfFetch(`/api/albums/${album.id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(album),
  });

  if(response.ok) {
    dispatch(actionDeleteAlbum(album.id));

  }
};

const initialState = {};

const albumReducer = (state = initialState, action) => {

  let newState = {...state}

  switch(action.type) {

    case CREATE_ALBUM: {

        const newState = {
          ...state,
          [action.album.id]: action.album
        };
        return newState;
    }


    case GET_ALBUMS:
      action.albums.forEach(album => {
        newState[album.id] = album
      })
      return newState;

    case UPDATE_ALBUM: {
      return {
          newState,
          [action.album.id]: {
            ...state[action.album.id],
            ...action.album,
          }
        };
      }

    case DELETE_ALBUM:
      delete newState[action.albumId]
      return newState;

    default:
      return state;
  }
}

export default albumReducer;
