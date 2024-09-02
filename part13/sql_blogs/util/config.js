require('dotenv').config()

module.exports = {
  DATABASE_URL: process.env.DATABASE_URL,
  PORT: process.env.PORT || 3000,
  SECRET: process.env.SECRET,
  development: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres'  
  },
  test: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres'
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres'
  }
}

require('dotenv').config()
