const bookshelf = require('./bookshelf')

//Relationship is defined on the model here
const User = bookshelf.Model.extend({
  tableName: 'users',
  events: function() {
    return this.belongsToMany('Event')
  },
  places: function () {
    return this.belongsToMany('Place')
  },
  preferences: function () {
    return this.belongsToMany('Preference')
  }
})

module.exports = bookshelf.model('User', User)