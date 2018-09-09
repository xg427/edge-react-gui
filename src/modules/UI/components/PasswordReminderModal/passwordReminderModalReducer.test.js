// @flow

/* globals test describe expect */

import { INVALID, IS_CHECKING, VERIFIED, initialState, passwordReminderModalReducer as uut } from './indexPasswordReminderModal.js'

describe('PasswordReminderModal', () => {
  test('initialState', () => {
    const expected = initialState
    // $FlowExpectedError
    const actual = uut(undefined, {})

    expect(actual).toEqual(expected)
  })

  test('CHECK_PASSWORD', () => {
    const expected = IS_CHECKING
    const actual = uut(undefined, { type: 'PASSWORD_REMINDER_MODAL/CHECK_PASSWORD_START' }).status

    expect(actual).toEqual(expected)
  })

  test('VERIFIED', () => {
    const expected = VERIFIED
    const actual = uut(undefined, { type: 'PASSWORD_REMINDER_MODAL/CHECK_PASSWORD_SUCCESS' }).status

    expect(actual).toEqual(expected)
  })

  test('INVALID', () => {
    const expected = INVALID
    const actual = uut(undefined, { type: 'PASSWORD_REMINDER_MODAL/CHECK_PASSWORD_FAIL' }).status

    expect(actual).toEqual(expected)
  })
})
