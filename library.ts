// const express = require("express");
// const routeLibrary = express.Router();
// const bodyParser = require("body-parser");
// const services = require("./services.js");
// const e = require("express");

import express,{Router,Request,Response} from "express";
import services from "./services";
const router=Router()

router.get("/book", async (req:Request, res:Response) => {
try{
const response=await services.getBook(req.query.name as string);
res.status(200).send({"books":response});
} catch (e:any) {res.status(200).send({"error-Massage":e.message})}
});


export default router;