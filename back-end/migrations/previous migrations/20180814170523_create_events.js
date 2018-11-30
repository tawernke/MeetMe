
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('events', function (table) {
    table.increments('id').primary()
    table.string('title').notNullable()
    table.string('description')
    table.string('start').notNullable()
    table.string('end')
    table.string('location')
    table.string('attendees')
    table.boolean('allDay')
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('events')
}
