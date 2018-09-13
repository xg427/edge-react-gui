// @flow

import type { GuiContact } from '../../types'

export const LOAD_CONTACTS_START = 'CONTACTS/LOAD_CONTACTS_START'
export const loadContactsStart = () => ({
  type: LOAD_CONTACTS_START
})

export const LOAD_CONTACTS_SUCCESS = 'CONTACTS/LOAD_CONTACTS_SUCCESS'
export const loadContactsSuccess = (contacts: Array<GuiContact>) => ({
  type: LOAD_CONTACTS_SUCCESS,
  data: { contacts }
})
