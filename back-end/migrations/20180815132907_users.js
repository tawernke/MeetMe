exports.up = function (knex, Promise) {
  return knex.schema.createTableIfNotExists('users', function (table) {
    table.increments('id').primary()
    table.string('username').notNullable()
    table.string('name').notNullable()
    table.string('events')
    table.string('likedPlaces')
    table.string('explorePlaces')
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('users')
}
