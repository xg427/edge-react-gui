// @flow

import React, { type ComponentType, type Element } from 'react'
import { Modal } from 'react-native'

export type ModalProps<Result> = { onDone(result: Result): mixed }

type State = { queue: Array<Element<any>>, hiding: boolean }

/**
 * Manages a queue of modal components to show to the user.
 * There should be a single instance of this class mounted somewhere in your
 * React component tree.
 */
export class ModalManager extends React.Component<{}, State> {
  constructor (props: {}) {
    super(props)
    this.state = { hiding: false, queue: [] }

    // Register as the global modal manager:
    if (globalModalManager != null) {
      throw new Error('The ModalManager must only be mounted once')
    }
    globalModalManager = this
  }

  componentWillUnmount () {
    // Un-register as the global modal manager:
    globalModalManager = null
  }

  // Removes a just-closed modal from the queue:
  onDismiss = () => this.setState({ hiding: false, queue: this.state.queue.slice(1) })

  showModal<Result> (Component: ComponentType<ModalProps<Result>>): Promise<Result> {
    return new Promise(resolve =>
      // Push the component onto the end of the queue:
      this.setState({
        queue: [
          ...this.state.queue,
          // eslint-disable-next-line react/jsx-key
          <Component
            onDone={result => {
              this.setState({ hiding: true })
              resolve(result)
            }}
          />
        ]
      })
    )
  }

  render () {
    // If the queue is empty, render nothing:
    if (this.state.queue.length === 0) return null

    return (
      <Modal onDismiss={this.onDismiss} visible={!this.state.hiding} animationType="fade">
        {this.state.queue[0]}
      </Modal>
    )
  }
}

let globalModalManager: ModalManager | null = null

/**
 * Pushes a modal onto the global queue.
 * @param {*} Component A modal component.
 * Receives a single prop, `onDone`, which it should call to hide itself.
 * The value passed to `onDone` becomes the returned promise result.
 */
export async function showModal<Result> (Component: ComponentType<ModalProps<Result>>): Promise<Result> {
  if (globalModalManager == null) {
    throw new Error('The ModalManager is not mounted')
  }
  return globalModalManager.showModal(Component)
}
