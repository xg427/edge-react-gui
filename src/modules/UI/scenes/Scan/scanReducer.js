// @flow

import { combineReducers } from 'redux'

import { addressModal, legacyAddressModal, camera } from './reducers'
// import { invalidUriModal } from './reducers/invalidUriModal.js'

export const scan = combineReducers({
  addressModal,
  legacyAddressModal,
  // invalidUriModal,
  camera
})

export default scan
