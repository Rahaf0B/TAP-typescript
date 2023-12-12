// const express = require("express");
import express from "express";
import libRoutes from "./library";
const app = express();

app.use("/books",libRoutes);

app.use((req, res, next)=>{
  res.status(404).send({message:"Not Found"});
});

app.listen(3000, () => {
  console.log("Express app is listening on the port 3000!");
});
