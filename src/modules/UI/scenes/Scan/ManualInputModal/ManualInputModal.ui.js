// @flow

import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { sprintf } from 'sprintf-js'

import { Icon } from '../../../components/Icon/Icon.ui.js'
import { InteractiveModal, PrimaryButton, SecondaryButton, TertiaryButton, TextInput } from '../../../components/Modals'

import * as Constants from '../../../../../constants/indexConstants.js'
import s from '../../../../../locales/strings.js'
import { styles } from './styles.js'

export type Props = {
  isActive: boolean,
  input: string,
  clipboard: string,
  inputChanged: string => void,
  doneButtonPressed: () => void,
  cancelButtonPressed: () => void,
  backdropPressed: () => void,
  backButtonPressed: () => void,
  pasteButtonPressed: () => void,
  hidden: () => void
}
export class ManualInputModal extends Component<Props> {
  static defaultProps = {
    isActive: false,
    input: '',
    inputChanged: () => {},
    doneButtonPressed: () => {},
    cancelButtonPressed: () => {},
    backdropPressed: () => {},
    backButtonPressed: () => {},
    pasteButtonPressed: () => {},
    hidden: () => {}
  }

  render () {
    const {
      isActive,
      clipboard,
      input,
      inputChanged,
      doneButtonPressed,
      cancelButtonPressed,
      backButtonPressed,
      backdropPressed,
      pasteButtonPressed,
      hidden
    } = this.props
    const copyMessage = this.props.input ? sprintf(s.strings.string_paste_address, this.props.input) : null
    const TITLE = s.strings.fragment_send_address_dialog_title
    const DONE = 'DONE'
    const CANCEL = 'CANCEL'

    return (
      <InteractiveModal isActive={isActive} onBackButtonPress={backButtonPressed} onBackdropPress={backdropPressed} onModalHide={hidden}>
        <InteractiveModal.Icon>
          <Icon style={{}} type={Constants.FONT_AWESOME} name={Constants.ADDRESS_BOOK_O} size={30} />
        </InteractiveModal.Icon>

        <InteractiveModal.Title>
          <Text>{TITLE}</Text>
        </InteractiveModal.Title>

        <InteractiveModal.Body>
          <InteractiveModal.Row>
            <TextInput onChangeText={inputChanged} label={'LABEL'} value={''} />
          </InteractiveModal.Row>
        </InteractiveModal.Body>

        <InteractiveModal.Footer>
          {clipboard && (
            <InteractiveModal.Row>
              <InteractiveModal.Item>
                <TertiaryButton onPress={pasteButtonPressed}>
                  <TertiaryButton.Text>{'Paste'}</TertiaryButton.Text>
                </TertiaryButton>
              </InteractiveModal.Item>
            </InteractiveModal.Row>

          )}

          <InteractiveModal.Row>
            <InteractiveModal.Item>
              <SecondaryButton onPress={cancelButtonPressed}>
                <SecondaryButton.Text>{CANCEL}</SecondaryButton.Text>
              </SecondaryButton>
            </InteractiveModal.Item>

            <InteractiveModal.Item>
              <PrimaryButton onPress={doneButtonPressed}>
                <PrimaryButton.Text>{DONE}</PrimaryButton.Text>
              </PrimaryButton>
            </InteractiveModal.Item>
          </InteractiveModal.Row>
        </InteractiveModal.Footer>
      </InteractiveModal>
    )
  }
}

export default ManualInputModal
