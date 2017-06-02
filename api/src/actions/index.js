'use strict'

const findUser = require('./user/find')

module.exports = (db) => {
  return {
    user: {
      find: findUser(db)
    }
  }
}
