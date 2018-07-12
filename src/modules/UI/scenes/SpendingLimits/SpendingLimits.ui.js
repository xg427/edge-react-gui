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

import THEME from '../../../../theme/variables/airbitz.js'

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
      <SafeAreaView style={[{ flex: 1 }]}>
        <Gradient style={[styles.gradient]} />

        <KeyboardAwareScrollView>
          <Scene>
            <Scene.Padding style={[{ flex: 1, padding: 24 }]}>
              <Scene.Header>
                <PasswordInput label={ENTER_YOUR_PASSWORD} value={'123123123'} />
              </Scene.Header>

              <Scene.Padding style={[{ paddingVertical: 4, backgroundColor: 'yellow' }]} />

              <Scene.Body>
                <Scene.Body.Row>
                  <Scene.Body.Item style={{ flex: 1 }}>
                    <Scene.Body.Text style={[{ fontSize: 14, color: THEME.COLORS.PRIMARY, fontFamily: THEME.FONTS.DEFAULT }]}>
                      {DAILY_SPENDING_LIMIT_TITLE}
                    </Scene.Body.Text>
                    <Scene.Body.Text style={[{ fontSize: 12, color: THEME.COLORS.PRIMARY, fontFamily: THEME.FONTS.DEFAULT }]}>
                      {DAILY_SPENDING_LIMIT_DESCRIPTION}
                    </Scene.Body.Text>
                  </Scene.Body.Item>

                  <Switch onValueChange={() => {}} value={1} />
                </Scene.Body.Row>

                <View style={styles.debug}>
                  <TextInput labelHeight={22} label={DAILY_SPENDING_LIMIT_PLACEHOLDER} suffix={'$'} autoCorrect={false} keyboardType={'numeric'} />
                </View>

                <Scene.Padding style={[{ paddingVertical: 14, backgroundColor: 'yellow' }]} />

                <Scene.Body.Row>
                  <Scene.Body.Item style={{ flex: 1 }}>
                    <Scene.Body.Text style={[{ fontSize: 14, color: THEME.COLORS.PRIMARY, fontFamily: THEME.FONTS.DEFAULT }]}>
                      {TRANSACTION_SPENDING_LIMIT_TITLE}
                    </Scene.Body.Text>

                    <Scene.Body.Text style={[{ fontSize: 12, color: THEME.COLORS.PRIMARY, fontFamily: THEME.FONTS.DEFAULT }]}>
                      {TRANSACTION_SPENDING_LIMIT_DESCRIPTION}
                    </Scene.Body.Text>
                  </Scene.Body.Item>

                  <Switch onValueChange={() => {}} value={1} />
                </Scene.Body.Row>

                <TextInput labelHeight={22} label={TRANSACTION_SPENDING_LIMIT_PLACEHOLDER} suffix={'$'} autoCorrect={false} keyboardType={'numeric'} />
              </Scene.Body>

              <Scene.Padding style={[{ paddingVertical: 4, backgroundColor: 'yellow' }]} />

              <Scene.Footer>
                <Scene.Footer.Row style={{ justifyContent: 'space-between' }}>
                  <Scene.Footer.Item style={{ flex: 1, paddingRight: 2 }}>
                    <PrimaryButton style={[{ maxWidth: 250 }]} onPress={() => {}}>
                      <PrimaryButton.Text style={{}}>{SAVE_TEXT}</PrimaryButton.Text>
                    </PrimaryButton>
                  </Scene.Footer.Item>

                  <Scene.Footer.Item style={{ flex: 1, paddingLeft: 2 }}>
                    <PrimaryButton onPress={() => {}}>
                      <PrimaryButton.Text>{SAVE_TEXT}</PrimaryButton.Text>
                    </PrimaryButton>
                  </Scene.Footer.Item>
                </Scene.Footer.Row>
              </Scene.Footer>
            </Scene.Padding>
          </Scene>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    )
  }
}

// return (
//   <SafeAreaView style={[{ flex: 1 }]}>
//     <Gradient style={[styles.gradient]} />
//
//     <Scene style={[styles.scene, {}]}>
//       <Scene.Padding style={[{ flex: 1, padding: 24, justifyContent: 'space-around' }]}>
//         <Scene.Header style={styles.debug}>
//           <Scene.Body.Item>
//             <PasswordInput label={ENTER_YOUR_PASSWORD} value={'123123123'} />
//           </Scene.Body.Item>
//         </Scene.Header>
//
//         {/* <Scene.Padding style={[{ paddingVertical: 14 }, { backgroundColor: 'green' }]} /> */}
//
//         <Scene.Body style={styles.debug}>
//           <Scene.Body.Row>
//             <Scene.Body.Item style={{ flex: 1 }}>
//               <Scene.Body.Text style={[{ color: THEME.COLORS.PRIMARY, fontFamily: THEME.FONTS.DEFAULT }]}>{DAILY_SPENDING_LIMIT_TITLE}</Scene.Body.Text>
//               <Scene.Body.Text style={[{ color: THEME.COLORS.PRIMARY, fontFamily: THEME.FONTS.DEFAULT }]}>
//                 {DAILY_SPENDING_LIMIT_DESCRIPTION}
//               </Scene.Body.Text>
//             </Scene.Body.Item>
//
//             <Scene.Body.Item>
//               <Switch onValueChange={() => {}} value={1} />
//             </Scene.Body.Item>
//           </Scene.Body.Row>
//
//           <Scene.Body.Item>
//             <TextInput label={DAILY_SPENDING_LIMIT_PLACEHOLDER} suffix={'$'} autoCorrect={false} keyboardType={'numeric'} />
//           </Scene.Body.Item>
//
//           <Scene.Padding style={[{ paddingVertical: 14 }]} />
//
//           <Scene.Body.Row>
//             <Scene.Body.Item style={{ flex: 1 }}>
//               <Scene.Body.Text style={[{ color: THEME.COLORS.PRIMARY, fontFamily: THEME.FONTS.DEFAULT }]}>
//                 {TRANSACTION_SPENDING_LIMIT_TITLE}
//               </Scene.Body.Text>
//               <Scene.Body.Text style={[{ color: THEME.COLORS.PRIMARY, fontFamily: THEME.FONTS.DEFAULT }]}>
//                 {TRANSACTION_SPENDING_LIMIT_DESCRIPTION}
//               </Scene.Body.Text>
//             </Scene.Body.Item>
//
//             <Scene.Body.Item>
//               <Switch onValueChange={() => {}} value={1} />
//             </Scene.Body.Item>
//           </Scene.Body.Row>
//
//           <Scene.Body.Item>
//             <TextInput label={TRANSACTION_SPENDING_LIMIT_PLACEHOLDER} suffix={'$'} autoCorrect={false} keyboardType={'numeric'} />
//           </Scene.Body.Item>
//         </Scene.Body>
//
//         {/* <Scene.Padding style={[{ paddingVertical: 14 }]} /> */}
//
//         <Scene.Footer style={{}}>
//           <Scene.Footer.Row style={{ justifyContent: 'space-between' }}>
//             <Scene.Footer.Item style={{ flex: 1, paddingRight: 2 }}>
//               <PrimaryButton style={[{ maxWidth: 250 }]} onPress={() => {}}>
//                 <PrimaryButton.Text style={{}}>{SAVE_TEXT}</PrimaryButton.Text>
//               </PrimaryButton>
//             </Scene.Footer.Item>
//
//             <Scene.Footer.Item style={{ flex: 1, paddingLeft: 2 }}>
//               <PrimaryButton style={[]} onPress={() => {}}>
//                 <PrimaryButton.Text>{SAVE_TEXT}</PrimaryButton.Text>
//               </PrimaryButton>
//             </Scene.Footer.Item>
//           </Scene.Footer.Row>
//         </Scene.Footer>
//       </Scene.Padding>
//     </Scene>
//   </SafeAreaView>
// )
// }
