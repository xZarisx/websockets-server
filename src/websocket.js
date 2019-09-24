import expressWs from './express-ws'

let messages = []

const aWss = expressWs.getWss('/websocket');

const websocket = (ws, req) => {
  ws.on('open', (msg) => {
    messages = [...messages, 'welcome']
    ws.send(JSON.stringify(messages));
  });
  ws.on('message', (msg) => {
    messages = [...messages, msg]
    aWss.clients.forEach((client) => {
      client.send(JSON.stringify(messages));
    });
  });
  ws.on('close', (msg) => {
    messages = [...messages, `good bye`]
  });
}

export default websocket
