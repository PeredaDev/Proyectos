import { mongoose } from "mongoose";

const db = mongoose.connection;
const connectionMongoose = () => {
  mongoose.set("strictQuery", true);
  mongoose
    .connect("mongodb+srv://jocapear:coderhouse@svdata.ukwp5dv.mongodb.net/SVDATA")
    // .connect("mongodb://localhost:27017/SVDATA") use for local db
    
    .catch((err) => console.log(err));

  db.once("open", () => {
    console.log("Conexion con base de datos");
  });

  db.on("error", (err) => {
    console.log(err);
  });
};

export default connectionMongoose();
