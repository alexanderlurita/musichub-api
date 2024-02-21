import dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT ?? 3000

const DB_HOST = process.env.DB_HOST
const DB_NAME = process.env.DB_NAME
const DB_PORT = process.env.DB_PORT
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD

export { PORT, DB_HOST, DB_NAME, DB_PORT, DB_USER, DB_PASSWORD }
