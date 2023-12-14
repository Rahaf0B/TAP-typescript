import { object, string, number } from "yup";
import { Request, Response, NextFunction } from "express";

async function bookPostValidation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let bookSchema = object({
    body: object({
      name: string()
        .strict(true)
        .typeError("The Name Should be String")
        .nullable()
        .required("The Name is required"),
      author: string()
        .strict(true)
        .typeError("The Name Should be String")
        .nullable()
        .required("The Author is required"),
      isbn: number()
        .strict(true)
        .typeError("ISBN must be a number")
        .integer("Please enter a valid number.")
        .nullable()
        .required("The ISBN is required"),
    })
      .required("The name,author,isbn are required")
      .nullable()
      .strict(true),
  });

  try {
    const book = await bookSchema.validate({ body: req.body });
    next();
  } catch (e: any) {
    return res.status(400).send(e.message);
  }
}

async function validateISBNParams(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let bookISBNParamsSchema = object({
    params: object({
      isbn: number()
        .typeError("ISBN must be a number")
        .integer("Please enter a valid number.")
        .nullable()
        .required("The ISBN is required"),
    }),
  });

  try {
    const isbn = await bookISBNParamsSchema.validate({ params: req.params });
    next();
  } catch (e: any) {
    return res.status(400).send(e.message);
  }
}

async function validateNameQuery(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let bookNameQuerySchema = object({
    query: object({
      name: string()
        .strict(true)
        .typeError("The Name Should be String")
        .nullable()
        .required("The Name is required"),
    }),
  });

  try {
    const isbn = await bookNameQuerySchema.validate({ query: req.query });
    next();
  } catch (e: any) {
    return res.status(400).send(e.message);
  }
}
export default { bookPostValidation, validateISBNParams, validateNameQuery };
