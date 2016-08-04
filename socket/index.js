'use strict'

var rooms = {},users = {}
var scoreboard = {}

var getScore = group => {
  var result = []
  for (var id in rooms) {
    var room = rooms[id]
    if (room.score === null || room.group !== group) {
      continue
    }

    var name = users[room.host].user
    name += ' :'
    room.players.forEach (player => { name += ' ' + users[player].user })
    var temp = room.score.split (" ")
    var correct = parseInt (temp[1])
    var wrong = parseInt (temp[3])
    var score = parseInt (temp[5])
    var time = room.time

    result.push ({ name, correct, wrong, score, time })
  }

  result.sort ((a, b) => {
    if (a['score'] === b['score']) {
      return a['time'] - b['time']
    } else {
      return b['score'] - a['score']
    }
  })

  return result
}

var randomID = length => {
  var mod = Math.pow (10, length)
  var ret = parseInt (Math.random ()*mod).toString ()
  while (ret.length < length) {
    ret = '0' + ret
  }
  return ret
}

var getRoomID = () => {
  var roomID = randomID (4)
  while (rooms[roomID] !== undefined) {
    roomID = randomID (4)
  }
  return roomID
}

module.exports = (io) => {
  io.of ('/game').on ('connection', socket => {
    socket.on ('createRoom', user => {
      var roomID = getRoomID ()
      rooms[roomID] = {
        group: null,
        host: socket.id,
        players: [],
        score: null,
        time: null
      }
      users[socket.id] = { user, roomID, socket }

      socket.emit ('createRoom', roomID)
    })

    socket.on ('joinRoom', data => {
      var roomID = data.roomID, group = data.group
      var room = rooms[roomID]
      if (room === undefined) {
        socket.emit ('message', 'Room Not Found')
      } else if (roomID === users[socket.id].roomID) {
        socket.emit ('message', 'Not Your Room Number')
      } else {
        if (room.group === null) {
          room.group = group
        }
        if (room.group !== group) {
          socket.emit ('message', 'Group Not Found')
        } else {
          delete rooms[users[socket.id].roomID]

          room.players.push (socket.id)
          users[socket.id].roomID = roomID

          users[room.host].socket.emit ('joinGame', group)
          socket.emit ('joinRoom', { roomID, group })
        }
      }
    })

    socket.on ('sendWord', word => {
      var room = rooms[users[socket.id].roomID]
      if (room === undefined) {
        socket.disconnect ()
      } else {
        room.players.forEach (id => users[id].socket.emit ('sendWord', word))
      }
    })

    socket.on ('checkWord', data => {
      var room = rooms[users[socket.id].roomID]
      if (room === undefined) {
        socket.disconnect ()
      } else {
        users[room.host].socket.emit ('checkWord', data)
      }
    })

    socket.on ('sendScore', score => {
      var room = rooms[users[socket.id].roomID]
      if (room === undefined) {
        socket.disconnect ()
      } else {
        room.score = score;
        room.time = new Date ().getTime ()
        room.players.forEach (id => users[id].socket.emit ('sendScore', score))
      }
    })

    socket.on ('leaveRoom', () => {
      var roomID = users[socket.id].roomID
      var room = rooms[roomID]

      if (room === undefined) {
        delete users[socket.id]
        socket.disconnect ()
      } else if (room.host === socket.id) {
        room.players.forEach (player => {
          users[player].socket.emit ('leaveGame')
          delete users[player]
        })
        socket.emit ('leaveGame')
        delete users[socket.id]
        delete rooms[roomID]
      } else {
        var players = room.players
        players.splice (players.indexOf (socket.id), 1)

        socket.emit ('leaveGame')
        delete users[socket.id]
        if (players.length === 0) {
          users[room.host].socket.emit ('leaveGame')
          delete users[room.host]
          delete rooms[roomID]
        }
      }
    })

    socket.on ('disconnect', () => {
      var roomID = users[socket.id].roomID
      var room = rooms[roomID]

      if (room === undefined) {
        delete users[socket.id]
      } else if (room.host === socket.id) {
        room.players.forEach (player => {
          users[player].socket.emit ('leaveGame')
          delete users[player]
        })
        delete users[socket.id]
        delete rooms[roomID]
      } else {
        var players = room.players
        players.splice (players.indexOf (socket.id), 1)

        delete users[socket.id]
        if (players.length === 0) {
          users[room.host].socket.emit ('leaveGame')
          delete users[room.host]
          delete rooms[roomID]
        }
      }
    })
  })

  io.of ('/scoreboard').on ('connection', socket => {
    socket.on ('getScore', group => {
      socket.emit ('getScore', getScore (group))
      scoreboard[socket.id] = setInterval (() => socket.emit ('getScore', getScore (group)), 1000)
    })

    socket.on ('disconnect', () => {
      clearInterval (scoreboard[socket.id])
      delete scoreboard[socket.id]
    })
  })
}
