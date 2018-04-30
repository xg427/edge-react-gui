// @flow

import React, { Component } from 'react'
import { Text } from 'react-native'
import { sprintf } from 'sprintf-js'

import { Icon } from '../../../components/Icon/Icon.ui.js'
import { InteractiveModal, PrimaryButton, SecondaryButton } from '../../../components/Modals'

import s from '../../../../../locales/strings.js'

type Props = {
  isVisible: boolean,
  currencyName: string,
  continueButtonPressed: () => void,
  cancelButtonPressed: () => void,
  backButtonPressed: () => void,
  backdropPressed: () => void,
  hidden: () => void
}
export class LegacyAddressModal extends Component<Props> {
  static defaultProps = {
    isVisible: false,
    currencyName: 'the intended currency',
    continueButtonPressed: () => {},
    cancelButtonPressed: () => {},
    backButtonPressed: () => {},
    backdropPressed: () => {},
    hidden: () => {}
  }

  render () {
    const { isVisible, currencyName, continueButtonPressed, cancelButtonPressed, backdropPressed, backButtonPressed, hidden } = this.props
    const WARNING = sprintf(s.strings.legacy_address_modal_warning, currencyName)
    const TITLE = s.strings.legacy_address_modal_title
    const CONTINUE = s.strings.legacy_address_modal_continue
    const CANCEL = s.strings.legacy_address_modal_cancel

    return (
      <InteractiveModal isVisible={isVisible} onBackButtonPress={backButtonPressed} onBackdropPress={backdropPressed} onModalHide={hidden}>
        <InteractiveModal.Icon>
          <Icon style={{}} type={'ionIcons'} name={'ios-alert-outline'} size={30} />
        </InteractiveModal.Icon>

        <InteractiveModal.Title>
          <Text>{TITLE}</Text>
        </InteractiveModal.Title>

        <InteractiveModal.Body>
          <InteractiveModal.Description>{WARNING}</InteractiveModal.Description>
        </InteractiveModal.Body>

        <InteractiveModal.Footer>
          <InteractiveModal.Row>
            <InteractiveModal.Item>
              <PrimaryButton onPress={continueButtonPressed}>
                <PrimaryButton.Text>{CONTINUE}</PrimaryButton.Text>
              </PrimaryButton>
            </InteractiveModal.Item>

            <InteractiveModal.Item>
              <SecondaryButton onPress={cancelButtonPressed}>
                <SecondaryButton.Text>{CANCEL}</SecondaryButton.Text>
              </SecondaryButton>
            </InteractiveModal.Item>
          </InteractiveModal.Row>
        </InteractiveModal.Footer>
      </InteractiveModal>
    )
  }
}

export default LegacyAddressModal
