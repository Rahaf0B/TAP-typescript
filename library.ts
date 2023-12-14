import express, { Router, Request, Response } from "express";
import bodyParser from "body-parser";
import services from "./services";
import reqValidation from "./middleware/validateRequest";
const router = Router();

router.get(
  "/book",
  reqValidation.validateNameQuery,
  async (req: Request, res: Response) => {
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
  }
);

router.get(
  "/:isbn",
  reqValidation.validateISBNParams,
  async (req: Request, res: Response) => {
    try {
      const book = await services.getBookWithIsbn(parseInt(req.params.isbn));

      if (book) {
        res.render("book", { status: 200, data: book });
      } else {
        res.render("book", { status: 400, message: "book not found" });
      }
    } catch (e: any) {
      res.render("book", { status: 400, message: e.message });
    }
  }
);

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

router.post(
  "/",
  reqValidation.bookPostValidation,
  async (req: Request, res: Response) => {
    try {
      const response = await services.addBooks(req.body);
      res.status(200).send({ message: response.message });
    } catch (e: any) {
      res.status(400).send({ message: e.message });
    }
  }
);
export default router;
