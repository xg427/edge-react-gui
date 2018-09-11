// @flow

type UpdateCurrentSceneKeyAction = {
  type: 'SCENES/UPDATE_CURRENT_SCENE_KEY',
  data: { sceneKey: string }
}

export type ScenesAction = UpdateCurrentSceneKeyAction
