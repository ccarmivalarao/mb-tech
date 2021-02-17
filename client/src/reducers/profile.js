import { GET_PROFILE, UPDATE_PROFILE, PROFILE_ERROR, CLEAR_PROFILE, GET_PROFILES, GET_REPOS } from '../actions/types';

const initialState = {
  profile: null,
  profiles: [],
  errors: {},
  loading: true,
  repos: []
};

const profileReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false
      }
    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false
      }
    case GET_REPOS:
      return {
        ...state,
        loading: false,
        repos: payload
      }
    case PROFILE_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
        profile: null
      }
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        repos: [],
        loading: true
      }
    default:
      return state
  }

}

export default profileReducer;