// const fs = require("fs/promises");
// const fse = require("fs-extra");
const booksFile = "books.json";
import fs from "fs/promises";
import fse from "fs-extra";

interface Ibook {
  name: string;
  author: string;
  isbn: number;
}

function checkBookExists(
  books: Ibook[],
  checkingProps: keyof Ibook,
  value: string | number
): Ibook[] {
  try {
    const book = books?.filter((book: Ibook) =>
      book[checkingProps].toString().startsWith(value.toString())
    );
    return book;
  } catch (e: any) {
    throw new Error(e.message);
  }
}

async function readFile(file: string): Promise<Ibook | any> {
  try {
    const fileData = await fs.readFile(file, "utf-8");
    return JSON.parse(fileData);
  } catch (e: any) {
    throw new Error(e.message);
  }
}

async function getBook(name: string): Promise<Ibook[]> {
  try {
    const books = await readFile("books.json");
    const bookFound = checkBookExists(books["books"], "name", name);
    return bookFound;
  } catch (e: any) {
    throw new Error(e.message);
  }
}

export default {
  getBook,
};
