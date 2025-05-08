import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()
const db=() => {
        mongoose
        .connect(process.env.MONGO_URL)
        .then(() => {
            console.log("MongoDb connected")

        })
        .catch((err) => {
            console.log("Error while connecting to MongeDB")

        })
}
export default db