// @flow

import type { EdgeContextCallbacks } from 'edge-core-js'

import type { Dispatch } from '../../ReduxTypes'

export default (dispatch: Dispatch): EdgeContextCallbacks => ({
  onError: (error: Error) => {
    console.log(error)
    dispatch({ type: 'ERROR_ALERT/DISPLAY_ERROR_ALERT', data: { message: error.message } })
  },

  onExchangeUpdate () {
    dispatch({ type: 'EXCHANGE_RATES/UPDATE_EXCHANGE_RATES' })
  }
})
