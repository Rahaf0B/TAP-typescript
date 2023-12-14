import express from "express";
import libRoutes from "./library";
const app = express();

app.set("view engine", "pug");
app.use("/library",libRoutes);

app.use((req, res, next)=>{
  res.status(404).send({message:"Not Found"});
});

app.listen(3000, () => {
  console.log("Express app is listening on the port 3000!");
});
