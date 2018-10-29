const bookshelf = require('./bookshelf')
const User = require('../model/users')

const Event = bookshelf.Model.extend({
  tableName: 'events',
  users: function() {
    return this.belongsToMany(User)
  },
  
})

module.exports = bookshelf.model('Event', Event)