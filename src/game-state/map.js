import get from 'lodash.get'

import initialMap from './raw-map'

export const MOVE_PLAYER_UP = 'MOVE_PLAYER_UP'
export const MOVE_PLAYER_DOWN = 'MOVE_PLAYER_DOWN'
export const MOVE_PLAYER_LEFT = 'MOVE_PLAYER_LEFT'
export const MOVE_PLAYER_RIGHT = 'MOVE_PLAYER_RIGHT'
export const ADD_PLAYER = 'ADD_PLAYER'
export const REMOVE_PLAYER = 'REMOVE_PLAYER'

const getStartingLocation = () => ({ row: 2, column: 2 })

const removeKey = (obj, key) => {
  const { [key]: removedKey, ...rest } = obj
  return rest
}

const isUnblockedSquare = ({ row, column, map = [[]] }) => {
  // check that its a valid square
  if (row < 0 || row > map.height + 1) return false
  if (column < 0 || column > map.width + 1) return false

  return map.grid[row][column].type !== 'ROCK'
}

const map = (
  state = {
    map: initialMap,
    players: {}
  },
  action
) => {
  const { type, playerId } = action
  const { row, column } = get(state, `players[${playerId}]`, {})
  switch (type) {
    case MOVE_PLAYER_UP:
      if (isUnblockedSquare({ row: row + 1, column, map: state.map })) {
        return {
          ...state,
          players: {
            ...state.players,
            [playerId]: {
              row: row - 1,
              column
            }
          }
        }
      }

      return state
    case MOVE_PLAYER_DOWN:
      if (isUnblockedSquare({ row: row - 1, column, map: state.map })) {
        return {
          ...state,
          players: {
            ...state.players,
            [playerId]: {
              row: row + 1,
              column
            }
          }
        }
      }

      return state

    case MOVE_PLAYER_LEFT:
      if (isUnblockedSquare({ row, column: column - 1, map: state.map })) {
        return {
          ...state,
          players: {
            ...state.players,
            [playerId]: {
              row,
              column: column - 1
            }
          }
        }
      }

      return state

    case MOVE_PLAYER_RIGHT:
      if (isUnblockedSquare({ row, column: column + 1, map: state.map })) {
        return {
          ...state,
          players: {
            ...state.players,
            [playerId]: {
              row,
              column: column + 1
            }
          }
        }
      }

      return state

    case ADD_PLAYER:
      return { ...state, players: { ...state.players, [playerId]: getStartingLocation() } }

    case REMOVE_PLAYER:
      return { ...state, players: removeKey(state.players, playerId) }

    default:
      return state
  }
}

export const movePlayerUp = (playerId) => ({
  type: MOVE_PLAYER_UP,
  playerId
})

export const movePlayerDown = (playerId) => ({
  type: MOVE_PLAYER_DOWN,
  playerId
})

export const movePlayerLeft = (playerId) => ({
  type: MOVE_PLAYER_LEFT,
  playerId
})

export const movePlayerRight = (playerId) => ({
  type: MOVE_PLAYER_RIGHT,
  playerId
})

export const addPlayer = (playerId) => ({
  type: ADD_PLAYER,
  playerId
})

export const removePlayer = (playerId) => ({
  type: REMOVE_PLAYER,
  playerId
})

export default map
