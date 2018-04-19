// @flow

export const PREFIX = 'ADDRESS_MODAL/'

export const ACTIVATED = PREFIX + 'ACTIVATED'
export const activated = (input: string) => ({
  type: ACTIVATED,
  data: { input }
})

export const DEACTIVATED = PREFIX + 'DEACTIVATED'
export const deactivated = () => ({
  type: DEACTIVATED
})

export const TOGGLED = PREFIX + 'TOGGLED'
export const toggled = () => ({
  type: TOGGLED
})

export const DEPLOYED = PREFIX + 'DEPLOYED'
export const deployed = () => ({
  type: DEPLOYED
})

export const HIDDEN = PREFIX + 'HIDDEN'
export const hidden = () => ({
  type: HIDDEN
})

export const BACKDROP_PRESSED = PREFIX + 'BACKDROP_PRESSED'
export const backdropPressed = () => ({
  type: BACKDROP_PRESSED
})

export const BACK_BUTTON_PRESSED = PREFIX + 'BACK_BUTTON_PRESSED'
export const backButtonPressed = () => ({
  type: BACK_BUTTON_PRESSED
})

export const CONFIRM_BUTTON_PRESSED = PREFIX + 'CONFIRM_BUTTON_PRESSED'
export const confirmButtonPressed = () => ({
  type: CONFIRM_BUTTON_PRESSED
})

export const CANCEL_BUTTON_PRESSED = PREFIX + 'CANCEL_BUTTON_PRESSED'
export const cancelButtonPressed = () => ({
  type: CANCEL_BUTTON_PRESSED
})

export const PASTE_BUTTON_PRESSED = PREFIX + 'PASTE_BUTTON_PRESSED'
export const pasteButtonPressed = () => ({
  type: PASTE_BUTTON_PRESSED
})

export const INPUT_CHANGED = PREFIX + 'INPUT_CHANGED'
export const inputChanged = (input: string) => ({
  type: INPUT_CHANGED,
  data: { input }
})
