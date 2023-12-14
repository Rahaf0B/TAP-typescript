import express, { Router, Request, Response } from "express";
import bodyParser from "body-parser";
import services, { Ibook } from "./services";
const router = Router();

router.get("/book", async (req: Request, res: Response) => {
  if (req.query.name) {
    try {
      const response = await services.getBookByName(req.query.name as string);
      if (response.length == 0) {
        res.status(200).send({ "error-Massage": "Book Not Found" });
      } else {
        res.status(200).send(response);
      }
    } catch (e: any) {
      res.status(200).send({ "error-Massage": e.message });
    }
  } else {
    res.status(200).send({ "error-Massage": "Query Parameter Not Found" });
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  if (isNaN(Number(req.params.id))) {
    res.status(404).send({ message: "Invalid id" });
  } else {
    try {
      const book = await services.getBookWithIsbn(parseInt(req.params.id));

      if (book) {
        res.render("book", { status: 200, data: book });
      } else {
        res.render("book", { status: 400, message: "book not found" });
      }
    } catch (e: any) {
      res.render("book", { status: 400, message: e.message });
    }
  }
});

router.get("/", async (req: Request, res: Response) => {
  try {
    const books = await services.getBooks();
    res.render("books", { status: 200, data: books });
  } catch (e: any) {
    res.render("books", { status: 400, message: e.message });
  }
});

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.post("/", async (req: Request, res: Response) => {
  let data = req.body;
  if (services.checkBookData(data)) {
    try {
      const response = await services.addBooks(data);
      res.status(200).send({ message: response.message });
    } catch (e: any) {
      res.status(400).send({ message: e.message });
    }
  } else {
    res.status(400).send({ message: "check the data" });
  }
});
export default router;
