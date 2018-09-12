const bookshelf = require('./bookshelf')

//Relationship is defined on the model here
const Place = bookshelf.Model.extend({
  tableName: 'places',
  users: function () {
    return this.belongsToMany('User')
  }
})

module.exports = bookshelf.model('Place', Place)