// @flow

import type { EdgeTransaction } from 'edge-core-js'

type DisplayTransactionAlertAction = {
  type: 'TRANSACTION_ALERT/DISPLAY_TRANSACTION_ALERT',
  data: { edgeTransaction: EdgeTransaction }
}

type DismissTransactionAlertAction = {
  type: 'TRANSACTION_ALERT/DISMISS_TRANSACTION_ALERT'
}

export type TransactionAlertAction = DisplayTransactionAlertAction | DismissTransactionAlertAction
