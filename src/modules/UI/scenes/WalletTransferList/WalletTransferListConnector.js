// @flow

import { connect } from 'react-redux'

import type { Dispatch, State } from '../../../ReduxTypes.js'
import WalletTransferList from './WalletTransferList.ui'

const mapStateToProps = (state: State) => ({
  walletTransferList: state.ui.scenes.walletTransferList.walletTransferList,
  walletListModalVisible: state.ui.scenes.walletTransferList.walletListModalVisible
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  toggleWalletListModal: () => dispatch({ type: 'WALLET_TRANSFER_LIST/TOGGLE_WALLET_LIST_MODAL_VISIBILITY' })
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WalletTransferList)
