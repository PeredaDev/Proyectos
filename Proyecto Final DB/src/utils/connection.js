import { mongoose } from "mongoose";
import 'dotenv/config'

const db = mongoose.connection;
const connectionMongoose = () => {
  mongoose.set("strictQuery", true);
  mongoose
    // .connect(process.env.DATABASE_CONNECTION_INTERNET)
    .connect(process.env.DATABASE_CONNECTION_LOCAL)
    .catch((err) => console.log(err));

  db.once("open", () => {
    console.log("Conexion con base de datos");
  });

  db.on("error", (err) => {
    console.log(err);
  });
};

export default connectionMongoose();
