// @flow

/* globals test expect */

import { AUTHORIZED, DENIED, RESTRICTED } from '../../modules/UI/permissions.js'
import { initialState, permissionsReducer } from './permissionsReducer.js'

test('initialState', () => {
  const expected = initialState
  // $FlowExpectedError
  const actual = permissionsReducer(undefined, {})

  expect(actual).toEqual(expected)
})

test('updatePermissions => AUTHORIZED', () => {
  const expected = {
    ...initialState,
    camera: AUTHORIZED
  }
  const action = { type: 'PERMISSIONS/UPDATE_PERMISSIONS', data: { camera: AUTHORIZED } }
  const actual = permissionsReducer(initialState, action)

  expect(actual).toEqual(expected)
})

test('updatePermissions => DENIED', () => {
  const expected = {
    ...initialState,
    camera: DENIED
  }
  const action = { type: 'PERMISSIONS/UPDATE_PERMISSIONS', data: { camera: DENIED } }
  const actual = permissionsReducer(initialState, action)

  expect(actual).toEqual(expected)
})

test('updatePermissions => RESTRICTED', () => {
  const expected = {
    ...initialState,
    camera: RESTRICTED
  }
  const action = { type: 'PERMISSIONS/UPDATE_PERMISSIONS', data: { camera: RESTRICTED } }
  const actual = permissionsReducer(initialState, action)

  expect(actual).toEqual(expected)
})

test('updatePermissions => MULTI', () => {
  const expected = {
    ...initialState,
    bluetooth: AUTHORIZED,
    camera: RESTRICTED,
    contacts: AUTHORIZED
  }
  const action = {
    type: 'PERMISSIONS/UPDATE_PERMISSIONS',
    data: {
      bluetooth: AUTHORIZED,
      camera: RESTRICTED,
      contacts: AUTHORIZED
    }
  }
  const actual = permissionsReducer(initialState, action)

  expect(actual).toEqual(expected)
})
