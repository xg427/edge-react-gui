// @flow

import React, { Component } from 'react'
import { Text } from 'react-native'
import { sprintf } from 'sprintf-js'

import { InteractiveModal, PrimaryButton, SecondaryButton, TextInput } from '../../../../components/Modals'
import { Icon } from '../../../../components/Icon/Icon.ui'
import s from '../../../../../../locales/strings'

export type Props = {
  isActive: boolean,
  onConfirm: (uniqueIdentifier: string) => any,
  onBackButtonPress?: () => any,
  onBackdropPress?: () => any,
  onCancel: () => any,
  currencyCode: string,
  value: string
}
export type State = { uniqueIdentifier: string }
export class UniqueIdentifierModal extends Component<Props, State> {
  state = {
    uniqueIdentifier: ''
  }

  render () {
    const { isActive, onConfirm, onCancel, currencyCode } = this.props
    const { onBackdropPress = onCancel, onBackButtonPress = onCancel } = this.props
    const type = getUniqueIdentifierType(currencyCode)
    const description = getUniqueIdentifierDescription(type)
    const title = type
    const label = type
    const confirm = s.strings.unique_identifier_modal_confirm
    const cancel = s.strings.unique_identifier_modal_cancel
    const icon = { type: 'ionIcons', name: 'ios-key' }
    const keyboardType = 'numeric'
    const { uniqueIdentifier } = this.state

    return (
      <InteractiveModal isActive={isActive} onBackdropPress={onBackdropPress} onBackButtonPress={onBackButtonPress}>
        <InteractiveModal.Icon>
          <Icon style={{}} type={icon.type} name={icon.name} size={30} />
        </InteractiveModal.Icon>

        <InteractiveModal.Title>
          <Text>{title}</Text>
        </InteractiveModal.Title>

        <InteractiveModal.Body>
          <InteractiveModal.Row>
            <InteractiveModal.Item>
              <InteractiveModal.Description>
                <Text>{description}</Text>
              </InteractiveModal.Description>
            </InteractiveModal.Item>
          </InteractiveModal.Row>

          <InteractiveModal.Row>
            <InteractiveModal.Item>
              <TextInput
                autoFocus
                onChangeText={uniqueIdentifier => this.setState({ uniqueIdentifier })}
                keyboardType={keyboardType}
                value={uniqueIdentifier}
                label={label}
                onSubmit={onConfirm}
              />
            </InteractiveModal.Item>
          </InteractiveModal.Row>
        </InteractiveModal.Body>

        <InteractiveModal.Footer>
          <InteractiveModal.Row>
            <InteractiveModal.Item>
              <PrimaryButton onPress={() => onConfirm(this.state.uniqueIdentifier)}>
                <PrimaryButton.Text>
                  <Text>{confirm}</Text>
                </PrimaryButton.Text>
              </PrimaryButton>
            </InteractiveModal.Item>

            <InteractiveModal.Item>
              <SecondaryButton onPress={onCancel}>
                <SecondaryButton.Text>
                  <Text>{cancel}</Text>
                </SecondaryButton.Text>
              </SecondaryButton>
            </InteractiveModal.Item>
          </InteractiveModal.Row>
        </InteractiveModal.Footer>
      </InteractiveModal>
    )
  }
}

const getUniqueIdentifierType = (currencyCode: string): string => {
  const types = {
    XRP: s.strings.unique_identifier_destination_tag,
    XMR: s.strings.unique_identifier_payment_id,
    default: s.strings.unique_identifier
  }

  return types[currencyCode] || types['default']
}
const getUniqueIdentifierDescription = (type: string): string => {
  return sprintf(s.strings.unique_identifier_modal_description, type)
}
