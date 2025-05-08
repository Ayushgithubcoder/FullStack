import express from "express";
import dotenv from "dotenv";
dotenv.config()
import cors from "cors";
import db from "./utils/db_connect.js";



// Importing user 
// route

import userRoutue from "./Route/user.routes.js"


const app = express()
const port = process.env.PORT || 3000

app.use(express.json()) 
app.use(express.urlencoded({extended:true}))

app.get('/', (req, res) => {
  console.log(req);
  console.log(res);
  res.send('Hello World!')
})
app.get('/sharma', (req, res) => {
  console.log(req);
  console.log(res);
  res.send('Hello Sharma ji!')
})
app.use(
  cors({origin:process.env.BASE_URL,
    methods:["GET","POST","DELETE","OPTIONS"],
    allowedHeaders:["Content-Type","Authorization"],
    credentials:true
  })
);
//connect to db
db()
app.use("/api/v1/user/",userRoutue)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
