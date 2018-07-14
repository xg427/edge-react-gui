// @flow

export const updateSpendingLimitsRequested = (password: string, { dailySpendingLimits, transactionSpendingLimit }) => (
  dispatch: Dispatch,
  getState: GetState
) => {
  const state = getState()
  const account = CORE_SELECTORS.getAccount(state)

  ACCOUNT_API.checkPassword(account, password).then(isCorrect ? dispatch(updateSpendingLimits(spendingLimits)) : dispatch(incorrectPassword()))
}

export const UPDATE_SPENDING_LIMITS = PREFIX + 'UPDATE_SPENDING_LIMITS'
export const updateSpendingLimits = () => {}
