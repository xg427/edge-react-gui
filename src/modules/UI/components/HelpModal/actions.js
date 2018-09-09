// @flow

type OpenHelpModalAction = {
  type: 'HELP_MODAL/OPEN_HELP_MODAL'
}

type CloseHelpModalAction = {
  type: 'HELP_MODAL/CLOSE_HELP_MODAL'
}

export type HelpModalAction = OpenHelpModalAction | CloseHelpModalAction
