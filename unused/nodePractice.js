const path = require('path')
var pathObj = path.parse(__filename)
const os = require('os')
const fs = require('fs')

console.log() // global scope
function testFunction() {
    console.log('hello world')
}

// setTimeout(testFunction, 1000)

// window is the globally scoped object. Node has the global object instead of the window object.
// However, we cannot access variables through the global object. Rather, they are scoped to the
// file which function as a module.
 
module.exports.message = message
// to only send the message var
module.exports = message
// const incomingMessage = require('./message')

fs.readdir('./', function(err, files) {
   if (err) console.log('error', err)
   else console.log('result', files)
})

// events. These events are classes
const EventEmitter = require('events')
const emitter = new EventEmitter()

emitter.on('messageLogged', function(arg) {
    console.log('listener called', arg)
})

// emit needs to go after on or it will not be called
emitter.emit('messageLogged', {id: 1, url: 'url'})

const http = require('http')
const server = http.createServer()

server.on('connection', (socket) => {
    console.log('new connection...')
})

server.listen(3100)
console.log('listening on port 3100')