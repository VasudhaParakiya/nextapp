import mongoose from "mongoose";

export const connectDBHandler = (handler) => async (req, res) => {
  if (mongoose.connections[0].readyState !== 1) {
    console.log("X not connected X");
    await mongoose
      .connect("mongodb://127.0.0.1:27017/nextjsdemo")
      .then(() => console.log("db connected successfully🚀"))
      .catch((err) => console.log("db connection Error = ", err));
  }

  return handler(req, res);
};

const db = mongoose.connection;
db.once("ready", () => console.log(`connected to mongo on }`));
