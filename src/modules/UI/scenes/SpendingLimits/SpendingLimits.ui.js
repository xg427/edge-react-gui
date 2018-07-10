// @flow

import React, { Component } from 'react'
import { KeyboardAvoidingView, SafeAreaView, Switch, Text, View } from 'react-native'

import s from '../../../../locales/strings.js'
import Gradient from '../../components/Gradient/Gradient.ui'
import { PasswordInput } from '../../components/Modals/components/PasswordInput.ui.js'
import { TextInput } from '../../components/Modals/components/TextInput.ui.js'
import { PrimaryButton } from '../../components/Modals/components/PrimaryButton.ui.js'
import styles from './styles.js'

const ENTER_YOUR_PASSWORD = s.strings.enter_your_password
const DAILY_SPENDING_LIMIT_TITLE = s.strings.spending_limits_daily_title
const DAILY_SPENDING_LIMIT_PLACEHOLDER = s.strings.spending_limits_daily_placeholder
const DAILY_SPENDING_LIMIT_DESCRIPTION = s.strings.spending_limits_daily_description
const TRANSACTION_SPENDING_LIMIT_TITLE = s.strings.spending_limits_tx_title
const TRANSACTION_SPENDING_LIMIT_PLACEHOLDER = s.strings.spending_limits_tx_title
const TRANSACTION_SPENDING_LIMIT_DESCRIPTION = s.strings.spending_limits_tx_description
const SAVE_TEXT = s.strings.save

export type Props = {}
export class SpendingLimits extends Component<Props> {
  render () {
    const behavior = 'padding'
    return (
      <KeyboardAvoidingView enabled behavior={behavior}>
        <SafeAreaView>
          <Gradient style={styles.gradient} />

          <View style={[styles.item, styles.passwordInput]}>
            <PasswordInput label={ENTER_YOUR_PASSWORD} />
          </View>

          <View style={[styles.item, styles.spendingLimit, styles.dailySpendingLimit]}>
            <View style={{ flexDirection: 'row', width: '100%', alignItems: 'stretch', justifyContent: 'space-between' }}>
              <View>
                <Text>{DAILY_SPENDING_LIMIT_TITLE}</Text>
                <Text>{DAILY_SPENDING_LIMIT_DESCRIPTION}</Text>
              </View>
              <Switch onValueChange={() => {}} value={1} />
            </View>
            <TextInput placeholder={DAILY_SPENDING_LIMIT_PLACEHOLDER} suffix={'$'} autoCorrect={false} keyboardType={'numeric'} />
          </View>

          <View style={[styles.item, styles.spendingLimit, styles.dailySpendingLimit]}>
            <View style={{ flexDirection: 'row', width: '100%', alignItems: 'stretch', justifyContent: 'space-between' }}>
              <View>
                <Text>{TRANSACTION_SPENDING_LIMIT_TITLE}</Text>
                <Text>{TRANSACTION_SPENDING_LIMIT_DESCRIPTION}</Text>
              </View>
              <Switch onValueChange={() => {}} value={1} />
            </View>
            <TextInput placeholder={TRANSACTION_SPENDING_LIMIT_PLACEHOLDER} suffix={'$'} autoCorrect={false} keyboardType={'numeric'} />
          </View>

          <View style={[styles.item, styles.submitButton]}>
            <PrimaryButton onPress={() => {}}>
              <PrimaryButton.Text>{SAVE_TEXT}</PrimaryButton.Text>
            </PrimaryButton>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    )
  }
}
