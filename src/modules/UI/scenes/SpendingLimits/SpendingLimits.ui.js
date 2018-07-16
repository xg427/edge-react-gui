// @flow

import React, { Component } from 'react'
import { KeyboardAvoidingView, SafeAreaView, Switch, Text, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import s from '../../../../locales/strings.js'
import { Gradient, Scene } from 'edge-components'
import { PasswordInput } from '../../components/Modals/components/PasswordInput.ui.js'
import { TextInput } from '../../components/Modals/components/TextInput.ui.js'
import { PrimaryButton } from '../../components/Modals/components/PrimaryButton.ui.js'
import styles from './styles.js'
import type { SpendingLimits as SpendingLimitsType } from '../../Settings/spendingLimits/spendingLimits.js'

import THEME from '../../../../theme/variables/airbitz.js'

const ENTER_YOUR_PASSWORD = s.strings.enter_your_password
const DAILY_SPENDING_LIMIT_TITLE = s.strings.spending_limits_daily_title
const DAILY_SPENDING_LIMIT_PLACEHOLDER = s.strings.spending_limits_daily_placeholder
const DAILY_SPENDING_LIMIT_DESCRIPTION = s.strings.spending_limits_daily_description
const TRANSACTION_SPENDING_LIMIT_TITLE = s.strings.spending_limits_tx_title
const TRANSACTION_SPENDING_LIMIT_PLACEHOLDER = s.strings.spending_limits_tx_title
const TRANSACTION_SPENDING_LIMIT_DESCRIPTION = s.strings.spending_limits_tx_description
const SAVE_TEXT = s.strings.save

const debug = {
  borderColor: 'red',
  borderWidth: 1
}

export type Props = {
  dailySpendingLimit: {
    amount: number,
    isEnabled: boolean
  },
  transactionSpendingLimit: {
    amount: number,
    isEnabled: boolean
  },
  currencySymbol: string,
  onSubmit: SpendingLimitsType => mixed
}
export type State = {
  password: string,
  dailyAmount: number,
  dailyIsEnabled: boolean,
  transactionAmount: number,
  transactionIsEnabled: boolean
}
export class SpendingLimits extends Component<Props, State> {
  constructor (props: Props) {
    super(props)
    this.state = {
      password: '',
      // dailyAmount: props.dailySpendingLimit.amount,
      // dailyIsEnabled: props.dailySpendingLimit.isEnabled,
      transactionAmount: props.transactionSpendingLimit.amount,
      transactionIsEnabled: props.transactionSpendingLimit.isEnabled,
      currencySymbol: props.currencySymbol
    }
  }

  render () {
    const { currencySymbol } = this.props
    const { dailyAmount, dailyIsEnabled, transactionAmount, transactionIsEnabled } = this.state
    const { onDailyIsEnabledChanged, onDailyAmountChanged, onTransactionIsEnabledChanged, onTransactionAmountChanged, onPasswordChanged, onSubmit } = this

    return (
      <SafeAreaView style={[{ flex: 1 }]}>
        <Gradient style={[styles.gradient]} />

        <Scene>
          <KeyboardAwareScrollView>
            <Scene.Padding style={[{ paddingHorizontal: 24 }]}>
              <Scene.Header>
                <PasswordInput containerStyle={[{ flex: 1 }]} label={ENTER_YOUR_PASSWORD} onChangeText={onPasswordChanged} />
              </Scene.Header>

              <Scene.Padding style={[{ paddingVertical: 14 }]} />

              <Scene.Body>
                <Scene.Row>
                  <Scene.Item>
                    <Scene.Body.Text style={[{ color: THEME.COLORS.PRIMARY, fontFamily: THEME.FONTS.DEFAULT }]}>{DAILY_SPENDING_LIMIT_TITLE}</Scene.Body.Text>
                    <Scene.Body.Text style={[{ fontSize: 12, color: THEME.COLORS.PRIMARY, fontFamily: THEME.FONTS.DEFAULT }]}>
                      {DAILY_SPENDING_LIMIT_DESCRIPTION}
                    </Scene.Body.Text>
                  </Scene.Item>

                  <Switch onValueChange={onDailyIsEnabledChanged} value={dailyIsEnabled} />
                </Scene.Row>

                <Scene.Row>
                  <TextInput
                    disabled={!dailyIsEnabled}
                    // value={dailyAmount.toString()}
                    // onChangeText={onDailyAmountChanged}
                    containerStyle={[{ flex: 1 }]}
                    label={DAILY_SPENDING_LIMIT_PLACEHOLDER}
                    suffix={currencySymbol}
                    autoCorrect={false}
                    keyboardType={'numeric'}
                  />
                </Scene.Row>

                <Scene.Padding style={[{ paddingVertical: 14 }]} />

                <Scene.Row>
                  <Scene.Item>
                    <Scene.Body.Text style={[{ color: THEME.COLORS.PRIMARY, fontFamily: THEME.FONTS.DEFAULT }]}>
                      {TRANSACTION_SPENDING_LIMIT_TITLE}
                    </Scene.Body.Text>

                    <Scene.Body.Text style={[{ color: THEME.COLORS.PRIMARY, fontFamily: THEME.FONTS.DEFAULT }]}>
                      {TRANSACTION_SPENDING_LIMIT_DESCRIPTION}
                    </Scene.Body.Text>
                  </Scene.Item>

                  <Switch onValueChange={onTransactionIsEnabledChanged} value={transactionIsEnabled} />
                </Scene.Row>

                <Scene.Row>
                  <TextInput
                    disabled={!transactionIsEnabled}
                    value={transactionAmount.toString()}
                    onChangeText={onTransactionAmountChanged}
                    containerStyle={[{ flex: 1 }]}
                    label={TRANSACTION_SPENDING_LIMIT_PLACEHOLDER}
                    suffix={currencySymbol}
                    autoCorrect={false}
                    keyboardType={'numeric'}
                  />
                </Scene.Row>
              </Scene.Body>

              <Scene.Padding style={[{ paddingVertical: 14 }]} />

              <Scene.Footer>
                <PrimaryButton onPress={onSubmit}>
                  <PrimaryButton.Text>{SAVE_TEXT}</PrimaryButton.Text>
                </PrimaryButton>
              </Scene.Footer>
            </Scene.Padding>
          </KeyboardAwareScrollView>
        </Scene>
      </SafeAreaView>
    )
  }

  onTransactionIsEnabledChanged = (transactionIsEnabled: Boolean) => {
    this.setState({ transactionIsEnabled })
  }

  onDailyIsEnabledChanged = (dailyIsEnabled: Boolean) => {
    // this.setState({ dailyIsEnabled })
  }

  onDailyAmountChanged = (dailyAmount: string) => {
    // this.setState({ dailyAmount: parseFloat(dailyAmount) || 0 })
  }

  onTransactionAmountChanged = (transactionAmount: string) => {
    this.setState({ transactionAmount: parseFloat(transactionAmount) || 0 })
  }

  onPasswordChanged = (password: string) => {
    this.setState({ password })
  }

  onSubmit = () => {
    const { password, transactionIsEnabled, transactionAmount, dailyIsEnabled, dailyAmount } = this.state
    const { onSubmit } = this.props

    onSubmit({
      transaction: {
        isEnabled: transactionIsEnabled,
        amount: parseFloat(transactionAmount)
      }
    })
  }
}
