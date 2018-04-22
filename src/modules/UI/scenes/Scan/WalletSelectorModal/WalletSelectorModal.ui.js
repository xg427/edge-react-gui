// @flow

import React, { Component } from 'react'
import { FlatList, Text } from 'react-native'

import { DropUpModal } from '../../../components/Modals'

import THEME from '../../../../../theme/variables/airbitz.js'

type Props = {
  isActive: boolean,
  data: Array<{ id: number }>,
  walletRowPressed: () => void,
  dismissButtonPressed: () => void,
  backButtonPressed: () => void,
  backdropPressed: () => void,
  hidden: () => void
}
export class WalletSelectorModal extends Component<Props> {
  static defaultProps = {
    isActive: false,
    data: [],
    walletRowPressed: () => {},
    dismissButtonPressed: () => {},
    backButtonPressed: () => {},
    backdropPressed: () => {},
    hidden: () => {}
  }

  render () {
    const { isActive, data, walletRowPressed, backdropPressed, backButtonPressed, hidden } = this.props

    return (
      <DropUpModal
        isActive={isActive}
        backdropColor={'transparent'}
        onBackButtonPress={backButtonPressed}
        onBackdropPress={backdropPressed}
        onModalHide={hidden}>

        <DropUpModal.Container>
          <DropUpModal.Header>
            <DropUpModal.Header.Text>
              <Text>{'Select Wallet'}</Text>
            </DropUpModal.Header.Text>
          </DropUpModal.Header>

          <DropUpModal.Body>
            <FlatList style={{marginBottom: THEME.SPACER.HEADER}}
              data={data}
              renderItem={({ item }) => (
                <DropUpModal.Row key={item.key}>
                  <Text>{'ROW'}</Text>
                </DropUpModal.Row>
              )}
            />
          </DropUpModal.Body>
        </DropUpModal.Container>
      </DropUpModal>
    )
  }
}

export default WalletSelectorModal
