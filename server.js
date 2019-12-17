const express = require('express')
const app = express()
const api = require('./server/routes/api')

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
	res.header(
		'Access-Control-Allow-Headers',
		'Content-Type, Authorization, Content-Length, X-Requested-With'
	)
	next()
})

app.use('/api', api)

const port = process.env.PORT || 4200
app.listen(port, function() {
	console.log(`Running on port ${port}`)
})
