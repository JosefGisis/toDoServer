import cors from 'cors'
import morgan from 'morgan'
import { passport } from './src/api/1/middleware/auth.js'
import v1 from './src/api/1/router'
import express, { Request, Response, NextFunction } from 'express'

const app = express()
app.use(passport.initialize())

app.use(express.json())
app.use(cors())
app.use(morgan('short'))
app.use('/api/1', v1)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(err)
    res.status(500).json({ message: err.message })
    next() //just to remove red squiggly lines >:(
})

app.listen(process.env.PORT || 3000, () => {
    console.log(`server is running on port ${process.env.PORT || 3000 }`)
})