// @flow

type DisplayErrorAlertAction = {
  type: 'ERROR_ALERT/DISPLAY_ERROR_ALERT',
  data: { message: string }
}

type DismissErrorAlertAction = {
  type: 'ERROR_ALERT/DISMISS_ERROR_ALERT'
}

export type ErrorAlertAction = DisplayErrorAlertAction | DismissErrorAlertAction
