// Update with your config settings.

module.exports = {
  client: process.env.DB_CLIENT,
  connection: {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
  }
}
