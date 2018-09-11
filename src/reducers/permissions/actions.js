// @flow

import type { Dispatch } from '../../modules/ReduxTypes'
import type { Permission, PermissionStatus } from '../../modules/UI/permissions.js'
import { request } from '../../modules/UI/permissions.js'

export const requestPermission = (permission: Permission) => (dispatch: Dispatch, getState: any) => {
  const state = getState()
  if (state.permissions[permission] === 'authorized') {
    return
  }
  return request(permission).then(status => {
    dispatch({ type: 'PERMISSIONS/UPDATE_PERMISSIONS', data: { [permission]: status } })
  })
}

type UpdatePermissionsAction = {
  type: 'PERMISSIONS/UPDATE_PERMISSIONS',
  data: { [Permission]: PermissionStatus }
}

export type PermissionsAction = UpdatePermissionsAction
