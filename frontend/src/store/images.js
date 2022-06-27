import { csrfFetch } from './csrf';

export const LOAD_IMAGE = 'images/Load_IMAGE'
export const UPDATE_IMAGE = 'images/Update_IMAGE'
export const REMOVE_IMAGE = 'images/Remove_IMAGE'
export const ADD_IMAGE = 'images/Add_IMAGE'

const load = (images) => ({
  type: LOAD_IMAGE,
  images
})

const initialState = {};

const imageReducer = (state = initialState, action) => {
  switch(action.type) {
    default:
      return state;
  }
}

export default imageReducer;
