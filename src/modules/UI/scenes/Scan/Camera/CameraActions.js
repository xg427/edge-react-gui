// @flow

export const PREFIX = 'CAMERA/'

export const SCAN_ENABLED = PREFIX + 'SCAN_ENABLED'
export const scanDisabled = () => ({
  type: SCAN_ENABLED
})

export const SCAN_DISABLED = PREFIX + 'SCAN_DISABLED'
export const scanEnabled = () => ({
  type: SCAN_DISABLED
})

export const SCAN_TOGGLED = PREFIX + 'SCAN_TOGGLED'
export const scanToggled = () => ({
  type: SCAN_TOGGLED
})

export const TORCH_ENABLED = PREFIX + 'TORCH_ENABLED'
export const torchEnabled = () => ({
  type: TORCH_ENABLED
})

export const TORCH_DISABLED = PREFIX + 'TORCH_DISABLED'
export const torchDisabled = () => ({
  type: TORCH_DISABLED
})

export const TORCH_TOGGLED = PREFIX + 'TORCH_TOGGLED'
export const torchToggled = () => ({
  type: TORCH_TOGGLED
})

export const QR_CODE_SCANNED = PREFIX + 'QR_CODE_SCANNED'
export const qrCodeScanned = (data: string) => ({
  type: QR_CODE_SCANNED,
  data: { data }
})
