// @flow

import { combineReducers } from 'redux'

import { AddressModalReducer as addressModal } from './AddressModal/AddressModalReducer.js'
import { LegacyAddressReducer as legacyAddressModal } from './LegacyAddress/LegacyAddressReducer.js'
import { CameraReducer as camera } from './Camera/CameraReducer.js'
// import { InvalidUriModalReducer as invalidUriModal } from './InvalidUriModal/InvalidUriModalReducer.js'

export const scan = combineReducers({
  addressModal,
  legacyAddressModal,
  // invalidUriModal,
  camera
})

export default scan
