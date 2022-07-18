import express, { Request, Response } from "express";

const app = express()

app.get('/test', (req: Request, res: Response) => {
  res.json({ success: true })
})

app.listen(3333, () => {
  console.log("Listening at 3333 port")
})