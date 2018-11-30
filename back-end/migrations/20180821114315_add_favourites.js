exports.up = function (knex, Promise) {
  return knex.schema.createTable('users', function (table) {
    table.increments('id').primary()
    table.string('username').notNullable()
    table.string('name').notNullable()
  }).createTable('events', function (table) {
    table.increments('id').primary()
    table.string('title').notNullable()
    table.string('description')
    table.string('start').notNullable()
    table.string('end')
    table.string('location')
    table.boolean('allDay')
  }).createTable('places', function (table) {
    table.increments('id').primary()
    table.string('name').notNullable()
    table.string('address_1')
    table.string('city')
    table.string('state')
    table.string('zip_code')
    table.string('country')
    table.string('type')
    table.string('rating')
    table.string('image')
    table.string('phone')
  }).createTable('preferences', function (table) {
    table.increments('id').primary()
    table.string('name').notNullable()
  }).createTable('events_users', function (table) {
    table.increments('id').primary()
    table.integer('user_id').references('users.id')
    table.integer('event_id').references('events.id')
  }).createTable('places_users', function (table) {
    table.increments('id').primary()
    table.integer('user_id').references('users.id')
    table.integer('place_id').references('places.id')
  }).createTable('preferences_users', function (table) {
    table.increments('id').primary()
    table.integer('user_id').references('users.id')
    table.integer('preference_id').references('preferences.id')
  })
}

exports.down = function (knex, Promise) {
  return knex.schema
    .dropTable('events_users')
    .dropTable('places_users')
    .dropTable('preferences_users')
    .dropTable('places')
    .dropTable('preferences')
    .dropTable('users')
    .dropTable('events')
}