// var http = require('http')

// http
//     .createServer((req, res) => {
//         res.writeHead(200, { 'Content-type': 'text/plain' })
//         res.end('Hello World ')
//     })
//     .listen(3000)

// console.log('Server started')

var express = require('express')
var app = express()

app.get('/', (req, res) => {
    res.json({
        menu: {
            id: 1,
            value: "1",
            popup: {

            }
        }
    })
    // res.send('Hello World')
})


app.listen(3000, () => {
    console.log('Server started')
})