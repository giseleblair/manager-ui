'use strict'

module.exports = {
  find: async function(req, res) {
    console.log('route: user.find', res.locals)
    // TODO confirm id?
    try {
      const user = await res.locals.actions.user.find(req.params.id)
      res.send(user)
    } catch (err) {
      console.error('Failed to get user', err)
      res.sendStatus(500)
    }
  }
}
