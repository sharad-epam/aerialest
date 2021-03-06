import { put, call } from 'redux-saga/effects'
import AsyncStorage from '@react-native-community/async-storage'

import * as Actions from './Actions'
import * as Profile from '../profile/Actions'
import { URL } from '../../Assets/Constants'

const registerApi = async token => {
  const requestUrl = `${URL}/customers/me`
  // prettier-ignore
  const headerParams = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
  return fetch(requestUrl, { method: 'GET', headers: headerParams })
}
const profileUpdate = ({ profileData }, token) => {
  const requestUrl = `${URL}/customers/me`
  // prettier-ignore
  const headerParams = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,

  }
  return fetch(requestUrl, {
    method: 'PUT',
    body: JSON.stringify(profileData),
    headers: headerParams
  })
}

export function* getProfileData(action) {
  try {
    const token = yield AsyncStorage.getItem('token')
    const response = yield call(registerApi, JSON.parse(token))
    const responseJson = yield response.json()
    yield put(Profile.profileRequestSuccess(responseJson))
  } catch (error) {
    yield put(Actions.profileRequestError(error))
  }
}

export function* updateProfileData(action) {
  try {
    const token = yield AsyncStorage.getItem('token')
    const response = yield call(profileUpdate, action, JSON.parse(token))
    yield put(Actions.profileUpdateSuccess(response))
  } catch (error) {
    yield put(Actions.profileRequestError(error))
  }
}
