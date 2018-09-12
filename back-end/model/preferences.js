const bookshelf = require('./bookshelf')

const Preference = bookshelf.Model.extend({
  tableName: 'preferences',
  users: function () {
    return this.belongsToMany('User')
  }
})

module.exports = bookshelf.model('Preference', Preference)