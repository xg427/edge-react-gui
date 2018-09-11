// @flow

/* globals describe it expect */

import { ACCOUNT_INIT_COMPLETE } from '../../../../constants/indexConstants.js'
import { initialState, spendingLimits } from './SpendingLimitsReducer.js'

describe('spendingLimits', () => {
  it('should render initialState', () => {
    // $FlowExpectedError
    const actual = spendingLimits(undefined, {})

    expect(actual).toMatchSnapshot()
  })

  describe('when logging in', () => {
    it('should update', () => {
      const loginAction = {
        type: ACCOUNT_INIT_COMPLETE,
        data: {
          spendingLimits: {
            transaction: {
              isEnabled: false,
              amount: 150
            }
          }
        }
      }
      const actual = spendingLimits(initialState, loginAction)

      expect(actual).toMatchSnapshot()
    })
  })

  describe('from spending limits scene', () => {
    it('should disable', () => {
      const initialState = {
        transaction: {
          isEnabled: true,
          amount: 0
        }
      }
      const action = {
        type: 'SPENDING_LIMITS/NEW_SPENDING_LIMITS',
        data: {
          spendingLimits: {
            transaction: {
              isEnabled: false,
              amount: 234
            }
          }
        }
      }
      const actual = spendingLimits(initialState, action)

      expect(actual).toMatchSnapshot()
    })

    it('should enable', () => {
      const initialState = {
        transaction: {
          isEnabled: false,
          amount: 0
        }
      }

      const action = {
        type: 'SPENDING_LIMITS/NEW_SPENDING_LIMITS',
        data: {
          spendingLimits: {
            transaction: {
              isEnabled: true,
              amount: 234
            }
          }
        }
      }
      const actual = spendingLimits(initialState, action)

      expect(actual).toMatchSnapshot()
    })
  })
})
