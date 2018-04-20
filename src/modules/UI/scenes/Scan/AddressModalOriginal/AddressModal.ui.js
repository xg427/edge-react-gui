// @flow

import React, { Component } from 'react'
import FAIcon from 'react-native-vector-icons/FontAwesome'
import { sprintf } from 'sprintf-js'

import * as Constants from '../../../../../constants/indexConstants.js'
import s from '../../../../../locales/strings.js'
import { colors } from '../../../../../theme/variables/airbitz.js'
import StylizedModal from '../../../components/Modal/Modal.ui'
import { styles } from '../styles.js'
import { AddressInput } from './AddressInput.js'
import { AddressInputButtons } from './AddressInputButtons.js'

export type Props = {
  isActive: boolean,
  input: string,
  inputChanged: (string) => void,
  confirmButtonPressed: () => void,
  cancelButtonPressed: () => void,
  backdropPressed: () => void,
  backButtonPressed: () => void,
  pasteButtonPressed: () => void,
  hidden: () => void
}
export type State = {
  input: string,
  clipboard: ''
}
export class AddressModal extends Component<Props, State> {
  render () {
    const {input, inputChanged, confirmButtonPressed} = this.props
    const icon = <FAIcon name={Constants.ADDRESS_BOOK_O} size={24} color={colors.primary} style={styles.icon} />

    const copyMessage = this.props.input ? sprintf(s.strings.string_paste_address, this.props.input) : null
    const middle = (
      <AddressInput
        copyMessage={copyMessage}
        onChangeText={inputChanged}
        onSubmit={confirmButtonPressed}
        onPaste={this.props.pasteButtonPressed}
        input={input}
      />
    )

    const bottom = <AddressInputButtons onSubmit={this.props.confirmButtonPressed} onCancel={this.props.cancelButtonPressed} />

    return (
      <StylizedModal
        {...this.props}
        featuredIcon={icon}
        headerText={s.strings.fragment_send_address_dialog_title}
        modalMiddle={middle}
        modalBottom={bottom}
        visibilityBoolean={this.props.isActive}
        onExitButtonFxn={this.props.exitButtonPressed}
        style={copyMessage && styles.withAddressCopied}
      />
    )
  }
}

export default AddressModal
