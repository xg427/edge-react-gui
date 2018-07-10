// @flow

import { connect } from 'react-redux'

import type { State } from '../../../ReduxTypes.js'
import { SpendingLimits } from './SpendingLimits.ui.js'

export const mapStateToProps = (state: State) => ({})
export const mapDispatchToProps = () => ({})

export default connect(mapStateToProps, mapDispatchToProps)(SpendingLimits)
