import {
  PROFILE_REQUEST,
  PROFILE_REQUEST_SUCCESS,
  PROFILE_REQUEST_ERROR,
  CLEAR_PROFILE
} from '../ActionTypes'

import Immutable from 'seamless-immutable'
import { createReducer } from '../CreateReducer'

const INITIAL_STATE = Immutable({
  profile: {},
  isFetching: false,
  success: false,
  error: null
})

const reducers = {
  [PROFILE_REQUEST]: state => {
    return Immutable.merge(state, { isFetching: true })
  },
  [PROFILE_REQUEST_SUCCESS]: (state, action) => {
    return Immutable.merge(state, {
      isFetching: false,
      profile: action.profile,
      success: true,
      error: null
    })
  },
  [PROFILE_REQUEST_ERROR]: (state, { error }) => {
    return Immutable.merge(state, {
      error: error.response.data.message,
      isFetching: false,
      success: false
    })
  },
  [CLEAR_PROFILE]: state => {
    return Immutable({
      profile: {},
      isFetching: false,
      success: false,
      error: null
    })
  }
}

export const reducer = createReducer(INITIAL_STATE, reducers)
