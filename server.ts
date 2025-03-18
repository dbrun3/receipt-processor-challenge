import express, { Request, Response } from 'express'
import receiptsRouter from './routes/receiptsRouter';

const port = 3000
const app = express()

app.use(express.json());
app.use('/receipts', receiptsRouter());

app.get('/', (_req: Request, res: Response) => {
  res.status(200).send("Hello Receipts!")
})

app.listen(port, () => {
  console.log(`Receipt processor listening on port ${port}`)
})
