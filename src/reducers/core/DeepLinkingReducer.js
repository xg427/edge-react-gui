// @flow

import * as Constants from '../../constants/indexConstants'

const initialState = {
  passwordRecoveryLink: null
}

export default function (state: any = initialState, action: any) {
  switch (action.type) {
    case 'deepLinkReceived': {
      return {
        ...state,
        passwordRecoveryLink: action.data
      }
    }

    case Constants.ACCOUNT_INIT_COMPLETE:
      return { ...state, passwordRecoveryLink: null }
    default:
      return state
  }
}
