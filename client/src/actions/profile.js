import { GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE, ACCOUNT_DELETED, CLEAR_PROFILE, GET_PROFILES, GET_REPOS } from './types';
import axios from 'axios';
import { setAlert } from './alert';

// Get Current Profile
export const getCurrentProfile = () => async dispatch => {
  try {
    const res = await axios.get('/api/profile/me');

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    })
  } catch (err) {
    dispatch({ type: CLEAR_PROFILE })
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    })
  }
}

// Get All Profiles
export const getProfiles = () => async dispatch => {
  dispatch({ type: CLEAR_PROFILE })
  try {
    const res = await axios.get('/api/profile');

    dispatch({
      type: GET_PROFILES,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    })
  }
}

// Get Profile By ID
export const getProfileById = userId => async dispatch => {
  try {
    const res = await axios.get(`/api/profile/user/${userId}`);

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    })
  }
}

// Get Repos
export const getRepo = username => async dispatch => {
  try {
    const res = await axios.get(`/api/profile/github/${username}`);

    dispatch({
      type: GET_REPOS,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    })
  }
}

// Create / Update Profile
export const createProfile = (formData, history, edit = false) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const res = await axios.post('/api/profile', formData, config);

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    })

    if (!edit) {
      history.push('/dashboard');
    }

    dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'))

  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    })
  }
}

// Add Experience
export const addExperience = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const res = await axios.put('/api/profile/experience', formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    })

    history.push('/dashboard');

    dispatch(setAlert('Added an Experience', 'success'))

  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    })
  }
}

// Add Education
export const addEducation = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const res = await axios.put('/api/profile/education', formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    })

    history.push('/dashboard');

    dispatch(setAlert('Added an Education', 'success'))

  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    })
  }
}

// Delete Experience
export const deleteExperience = id => async dispatch => {
  if (window.confirm('Are you sure to delete this experience?')) {
    try {
      const res = await axios.delete(`/api/profile/experience/${id}`);

      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data
      })

      dispatch(setAlert('Experience deleted', 'success'))

    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      })
    }
  }
}

// Delete Education
export const deleteEducation = id => async dispatch => {
  if (window.confirm('Are you sure to delete this education?')) {
    try {
      const res = await axios.delete(`/api/profile/education/${id}`);

      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data
      })

      dispatch(setAlert('Education deleted', 'success'))

    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      })
    }
  }
}

// Delete Education
export const deleteAccount = () => async dispatch => {
  if (window.confirm('Are you sure to delete your account? This can\'t be undone.')) {
    try {
      await axios.delete(`/api/profile`);

      dispatch({ type: CLEAR_PROFILE })
      dispatch({ type: ACCOUNT_DELETED })

      dispatch(setAlert('Your account has been permanently deleted', 'success'))

    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      })
    }
  }
}