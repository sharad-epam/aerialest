import { takeLatest, all } from 'redux-saga/effects'
import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'
import { saveUserdata } from './register/Sagas'
import { userLogin } from './login/Sagas'
import { getProfileData, updateProfileData } from './profile/Sagas'
import { getPasswordData } from './password/Sagas'
import { getPricesForPlaceOrder } from './PlaceOrder/Sagas'
import { placeOrder } from './order/Sagas'
import { getBillingInfo, getBillingInfoData } from './BillingInfo/Saga'
import { myOrders } from './MyOrders/Sagas'
import { getPricing } from './Pricing/Saga'
import * as ActionTypes from './ActionTypes'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { GithubTypes } from '../Redux/GithubRedux'

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { getUserAvatar } from './GithubSagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),
    takeLatest(ActionTypes.SAVE_USER_DATA_REQUEST, saveUserdata),
    takeLatest(ActionTypes.LOGIN_REQUEST, userLogin),
    takeLatest(ActionTypes.PROFILE_REQUEST, getProfileData),
    takeLatest(ActionTypes.PROFILE_UPDATE_REQUEST, updateProfileData),
    takeLatest(ActionTypes.PASSWORD_REQUEST, getPasswordData),
    takeLatest(ActionTypes.GET_PRICES_REQUEST, getPricesForPlaceOrder),
    takeLatest(ActionTypes.PLACE_ORDER_REQUEST, placeOrder),
    takeLatest(ActionTypes.BILLING_INFO_DROPDOWN_REQUEST, getBillingInfo),
    takeLatest(ActionTypes.MY_ORDERS_REQUEST, myOrders),
    takeLatest(ActionTypes.BILLING_INFO_DATA_REQUEST, getBillingInfoData),
    takeLatest(ActionTypes.GET_PRICING_REQUEST, getPricing),
    // some sagas receive extra parameters in addition to an action
    takeLatest(GithubTypes.USER_REQUEST, getUserAvatar, api)
  ])
}
