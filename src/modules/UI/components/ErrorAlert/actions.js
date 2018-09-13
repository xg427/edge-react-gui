// @flow

export const DISPLAY_ERROR_ALERT = 'UI/components/ErrorAlert/DISPLAY_ERROR_ALERT'
export const DISMISS_ERROR_ALERT = 'UI/components/ErrorAlert/DISMISS_ERROR_ALERT'

export const displayErrorAlert = (message: string) => ({
  type: DISPLAY_ERROR_ALERT,
  data: { message }
})

export const dismissErrorAlert = () => ({
  type: DISMISS_ERROR_ALERT,
  data: { message: '' }
})
