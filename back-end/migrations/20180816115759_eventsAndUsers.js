
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('users', function (table) {
    table.increments('id').primary()
    table.string('username').notNullable()
    table.string('name').notNullable()
    table.string('likedPlaces')
    table.string('explorePlaces')
  }).createTableIfNotExists('events', function (table) {
    table.increments('id').primary()
    table.string('title').notNullable()
    table.string('description')
    table.string('start').notNullable()
    table.string('end')
    table.string('location')
    table.boolean('allDay')
  }).createTableIfNotExists('events_users', function (table) {
    table.increments('id').primary()
    table.integer('user_id').references('users.id')
    table.integer('event_id').references('events.id')
  })
}

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTable('events_users')
    .dropTable('users')
    .dropTable('events')
}
