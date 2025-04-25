import pg from 'pg'
import logger from "../utils/logger.js"
import dotenv from "dotenv"

dotenv.config();

const {Pool} = pg

const {DB_USER,DB_PASSWORD,DB_HOST,DB_NAME,DB_PORT, NODE_ENV, TEST_DB_NAME, PRODUCTION_DB_NAME} = process.env

if(!DB_USER || !DB_PASSWORD || !DB_HOST || !DB_NAME || !DB_PORT || !NODE_ENV || !TEST_DB_NAME || !PRODUCTION_DB_NAME) {
    logger.error("missing database enviroment variables, check your .env file")
    process.exit(1)
}

const pool = new Pool ({
    user: DB_USER,
    host: DB_HOST,
    database: NODE_ENV === "test" ? TEST_DB_NAME : NODE_ENV === "production" ? PRODUCTION_DB_NAME : DB_NAME,
    password: DB_PASSWORD,
    host: DB_HOST,
    port: parseInt(DB_PORT, 10),
    connectionTimeoutMillis: 2000
})

logger.info(`Database is configured on: ${database}`)
pool.on("connect", (client) => {
    logger.info(`Client connected from Pool (Total count: ${pool.totalCount}`)
})

const initialzeDbSchema = async () => {
    const client = await pool.connect ()

try {
    logger.info(`initailizing: ${DB_NAME} `)
    await client.query(`CRAETE EXTENTION IF NOT EXISTS pgcrypto`)

    //user table
    await client.query(`
        CREATE TABLE IF NOT EXISSTS user (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        first_name VARCHAR(20) NOT NULL,
        last_name VARCHAR(20) NOT NULL,
        email VARCHAR(225) UNIQUE NOT NULL,
        password VARCHAR(225) NOT NULL,
        created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        )`
    )
    logger.info('successfully created user table')

    //service provider table
    await client.query(`
        CREATE TABLE IF NOT EXISSTS service-provider (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        provider_name VARCHAR(225) NOT NULL,
        email VARCHAR(225) UNIQUE NOT NULL,
        password VARCHAR(225) NOT NULL,
        job VARCHAR(100) NOT NULL,
        description TEXT,
        created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        )`
    )
    logger.info('successfully created service-provider table')

    await client.query(`
        CREATE TABLE IF NOT EXISSTS timeslot (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        start_time TIMESTAMP,
        duration TIME NOT NULL,
        provider_id UUID NOT NULL REFERRNCES service-provider(id) ON DELETE CASCADE,
        )`
    )
    logger.info('successfully created timeslot table')
} catch (error) {
    logger.error(`Error while loading InitialzeDbSchema`,error)
} finally{
    client.release()
}
}

const connectToDb = async () => {
    try {
      const client = await pool.connect()
      logger.info(`Database connection pool established successfully`)
      client.release()
    } catch (error) {
      logger.error('Unable to establish database connection pool', error)
      process.exit(1)
    }
  }

  export { pool, initialzeDbSchema, connectToDb }