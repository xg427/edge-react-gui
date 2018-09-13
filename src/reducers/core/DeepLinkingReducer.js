// @flow

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

    case 'accountInitComplete': {
      return {
        ...state,
        passwordRecoveryLink: null
      }
    }

    default:
      return state
  }
}
