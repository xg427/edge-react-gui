// @flow

import type { EdgeContextCallbacks } from 'edge-core-js'

import type { Dispatch } from '../../ReduxTypes'
import { displayErrorAlert } from '../../UI/components/ErrorAlert/actions'

export default (dispatch: Dispatch): EdgeContextCallbacks => ({
  onError: (error: Error) => {
    console.log(error)
    dispatch(displayErrorAlert(error.message))
  },

  onExchangeUpdate () {
    dispatch({ type: 'EXCHANGE_RATES/UPDATE_EXCHANGE_RATES' })
  }
})
