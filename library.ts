import express, { Router, Request, Response } from "express";
import bodyParser from "body-parser";
import services from "./services";
import reqValidation from "./middleware/validateRequest";
const router = Router();

router.get(
  "/book",
  reqValidation.validateNameQuery,
  async (req: Request, res: Response) => {
    try {
      const response = await services.getBookByName(
        req.query.name as string,
        req.query.sort as string
      );

      res.status(200).send(response);
    } catch (e: any) {
      res.status(500).send();
    }
  }
);

router.get(
  "/:isbn",
  reqValidation.validateISBNParams,
  async (req: Request, res: Response) => {
    try {
      const book = await services.getBookWithIsbn(parseInt(req.params.isbn));

        res.render("book", { status: 200, data: book });
     
    } catch (e: any) {
      res.render("book", { status: 500 });
    }
  }
);

router.get("/", async (req: Request, res: Response) => {
  try {
    const books = await services.getBooks();
    res.render("books", { status: 200, data: books });
  } catch (e: any) {
    res.render("books", { status: 500 });
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
      res.status(500).send();
    }
  }
);
export default router;
