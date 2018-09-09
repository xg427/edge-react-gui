// @flow

type DisplayDropdownAlert = {
  type: 'DROPDOWN_ALERT/DISPLAY_DROPDOWN_ALERT',
  data: {
    type: string,
    title: string,
    message: string
  }
}

type DismissDropdownAlert = {
  type: 'DROPDOWN_ALERT/DISMISS_DROPDOWN_ALERT'
}

export type DropdownAlertAction = DisplayDropdownAlert | DismissDropdownAlert
