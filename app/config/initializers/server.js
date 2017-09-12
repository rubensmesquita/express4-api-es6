// config/initializers/server.js
'use strict'

import express from 'express'
import socket from 'socket.io'
import path from 'path'
import config from 'nconf'
import http from 'http'

// create the express app
// configure middlewares
import bodyParser from 'body-parser'
import morgan from 'morgan'
import logger from 'winston'

export default (cb) => {
	
	// Configure express 
	var app = express()
	const server = http.Server(app)
	const io = socket(server)
	
  app.use(morgan('common'))
  app.use(bodyParser.urlencoded({extended: true}))
  app.use(bodyParser.json({type: '*/*'}))

  logger.info('[SERVER] Initializing routes')
  // require('../../app/routes/index')(app)
    
  // app.use(express.static(path.join(__dirname, 'public')))
    
  // Error handler
  app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.json({
      message: err.message,
      error: (app.get('env') === 'development' ? err : {})
    })
    next(err)
  })
    
	io.listen(app.listen(config.get('NODE_PORT')))
  logger.info('[SERVER] Listening on port ' + config.get('NODE_PORT'))
	
	if (cb) {
    return cb()
	}

}



