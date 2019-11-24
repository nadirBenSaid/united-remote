//Import and configure environment variables from .env file
require('dotenv').config();
const ENV = process.env;

//Export database connection string

module.exports = {
	connectionString: `mongodb+srv://${ENV.DB_USER}:${ENV.DB_PASS}@${ENV.DB_HOST}`,
};
