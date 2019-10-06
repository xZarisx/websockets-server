import uuid from 'uuid'
import expressWs from './express-ws'
import store from './game-state/store'
import {
  movePlayerUp,
  movePlayerDown,
  movePlayerLeft,
  movePlayerRight,
  addPlayer,
  removePlayer
} from './game-state/map'
console.log('store.getState().players: ', store.getState().players)

const aWss = expressWs.getWss('/websocket')

store.subscribe(() => {
  aWss.clients.forEach((client) => {
    client.send(JSON.stringify(store.getState().map))
  })
})

const websocket = (ws, req) => {
  ws.id = uuid.v4()
  store.dispatch(addPlayer(ws.id))
  ws.on('message', (msg) => {
    switch (msg) {
      case 'up':
        store.dispatch(movePlayerUp(ws.id))
        return
      case 'down':
        store.dispatch(movePlayerDown(ws.id))
        return
      case 'left':
        store.dispatch(movePlayerLeft(ws.id))
        return
      case 'right':
        store.dispatch(movePlayerRight(ws.id))
    }
  })
  ws.on('close', (msg) => {
    store.dispatch(removePlayer(ws.id))
  })
}

export default websocket
