/* eslint-disable flowtype/require-valid-file-annotation */

/* globals test expect */

import { scan as scanReducer } from './scanReducer.js'
import { addressModal } from './reducers/addressModal.js'
import { legacyAddressModal } from './reducers/legacyAddressModal.js'
// import { invalidUriModal } from './reducers/invalidUriModal.js'
import { camera } from './reducers/camera.js'
import { uri } from './reducers/uri.js'

test('initialState', () => {
  const expected = {
    addressModal: addressModal(undefined, {}),
    legacyAddressModal: legacyAddressModal(undefined, {}),
    // invalidUriModal: invalidUriModal(undefined, {}),
    camera: camera(undefined, {}),
    uri: uri(undefined, {})
  }
  const actual = scanReducer(undefined, {})

  expect(actual).toEqual(expected)
})
