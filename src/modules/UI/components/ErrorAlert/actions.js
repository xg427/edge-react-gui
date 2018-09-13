// @flow

export const displayErrorAlert = (message: string) => ({
  type: 'UI/components/ErrorAlert/DISPLAY_ERROR_ALERT',
  data: { message }
})

export const dismissErrorAlert = () => ({
  type: 'UI/components/ErrorAlert/DISMISS_ERROR_ALERT',
  data: { message: '' }
})
