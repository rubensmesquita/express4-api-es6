// /index.js
'use strict'

import server from './config/initializers/server'
import nconf from 'nconf'
import async from 'async'
import logger from 'winston'
import db from './config/initializers/database'

// Load Environment variables from .env file
require('dotenv').load()

// Set up configs
nconf.use('memory')
// First load command line arguments
nconf.argv()
// Load environment variables
nconf.env()
// Load config file for the environment
require('./config/environments/' + nconf.get('NODE_ENV'))

logger.info('[APP] Starting server initialization')

async.series([
    (callback) => {
        db(callback)
    },
    (callback) => {
        server(callback)
    }
], function(err) {
    if (err) {
      logger.error('[APP] initialization failed', err)
    } else {
      logger.info('[APP] initialized SUCCESSFULLY')
    }
  }
)