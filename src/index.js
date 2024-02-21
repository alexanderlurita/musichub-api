import express from 'express'
import cors from 'cors'
import { PORT } from './config.js'
import router from './routes/index.js'

const app = express()

app.use(express.json())
app.use(cors())
app.disable('x-powered-by')

app.use('/api', router)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
