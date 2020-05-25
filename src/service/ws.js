/**
 *
 * @param {*} config
 *

 */
const toJSON = (string) => {
  try {
    return JSON.parse(string)
  } catch (e) {
    return string
  }
}
const ws = (config) => {
  let socket = new WebSocket(config.endpoint)

  socket.onopen = function (event) {
    socket.send(config.handshake || 'HELLOPINIPIG')
    let data = toJSON(event.data)
    config.onOpen(data)
  }

  socket.onmessage = function (event) {
    try {
      let data = toJSON(event.data)
      config.onMessage(data)
    } catch (e) {
      console.error(e)
    }
  }

  socket.onclose = function (event) {
    if (event.wasClean) {
      config.onClose(event)
    } else {
      // e.g. server process killed or network down
      // event.code is usually 1006 in this case
      console.log('[close] Connection died reconnecting')
      connected = false
      setTimeout(() => {
        console.log('refreshing due to closed connection')
        ws(config)
      }, 10000)
    }
  }
  socket.onerror = function (error) {
    //console.log(`[error] ${error.message}`)
    config.onError(error)
  }
  const send = (payload) => {
    let data = typeof payload === 'string' ? payload : JSON.stringify(payload)
    socket.send(data)
  }

  return {
    send,
    socket,
  }
}

export default ws
