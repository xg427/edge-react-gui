/* globals jest describe it expect */
/* eslint-disable flowtype/require-valid-file-annotation */

import { spendingLimits, initialState } from './spendingLimits.js'
import { ACCOUNT_INIT_COMPLETE } from '../../../../constants/indexConstants.js'
import { update } from './spendingLimits.js'

describe('spendingLimits', () => {
  it('should render initialState', () => {
    const actual = spendingLimits(undefined, {})

    expect(actual).toMatchSnapshot()
  })

  it('should update when logging in', () => {
    const loginAction = {
      type: ACCOUNT_INIT_COMPLETE,
      spendingLimits: {
        transaction: {
          isEnabled: false,
          amount: 150
        }
      }
    }
    const actual = spendingLimits(initialState, loginAction)

    expect(actual).toMatchSnapshot()
  })

  it('should use defaults when logging in, if not included in action', () => {
    const loginAction = {
      type: ACCOUNT_INIT_COMPLETE
    }
    const actual = spendingLimits(initialState, loginAction)

    expect(actual).toMatchSnapshot()
  })

  it('should update when receiving update spending limits action', () => {
    const updateAction = update({
      transaction: {
        isEnabled: false,
        amount: 234
      }
    })
    const actual = spendingLimits(initialState, updateAction)

    expect(actual).toMatchSnapshot()
  })
})
