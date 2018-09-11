// @flow

import type { GuiContact } from '../../types'

type LoadContactsStartAction = {
  type: 'CONTACTS/LOAD_CONTACTS_START'
}

type LoadContactsSuccessAction = {
  type: 'CONTACTS/LOAD_CONTACTS_SUCCESS',
  data: { contacts: Array<GuiContact> }
}

export type ContactsAction = LoadContactsStartAction | LoadContactsSuccessAction
