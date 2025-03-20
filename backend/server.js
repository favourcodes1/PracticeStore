import app from "./app.js";
import mongoose from "mongoose";

const db_URL = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

mongoose.connect(db_URL).then(() => {
  console.log("DB connection successful !");
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
