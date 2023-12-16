import fs from "fs/promises";

const booksFile = "books.json";
import Search from "./SearchAlgo/fuzzySearch";

export interface Ibook {
  name: string;
  author: string;
  isbn: number;
}

let books: Ibook[] = null;

function checkBookExists(
  booksToSearch: Ibook[],
  checkingProps: keyof Ibook,
  value: string | number
): Ibook[] {
  try {
    const book = booksToSearch?.filter(
      (book: Ibook) => book[checkingProps] === value

      // .toString()
      // .toLowerCase()
      // .startsWith(value.toString().trim().toLowerCase())
    );
    return book;
  } catch (e: any) {
    throw new Error(e.message);
  }
}

async function readFile(file: string): Promise<Ibook[] | any> {
  try {
    const fileData = await fs.readFile(file, "utf-8");
    return JSON.parse(fileData)[file.includes("books") ? "books" : ""];
  } catch (e: any) {
    throw new Error(e.message);
  }
}

async function getBooks(): Promise<Ibook[]> {
  try {
    if (books === null) {
      books = await readFile(booksFile);
    }
    return books;
  } catch (e: any) {
    throw new Error(e.message);
  }
}

async function getBookByName(
  value: string,
  sortType?: string
): Promise<Ibook[]> {
  try {
    const booksData = await getBooks();
    return await Search.SearchingAndOrder(
      booksData,
      "name",
      value.trim(),
      sortType
    );
  } catch (e: any) {
    throw new Error(e.message);
  }
}

async function getBookWithIsbn(isbn: number): Promise<Ibook[]> {
  try {
    const booksData = await getBooks();
    const book = checkBookExists(booksData, "isbn", isbn);
    return book;
  } catch (e: any) {
    throw new Error(e.message);
  }
}

async function addBooks(dataInfo: Ibook): Promise<any> {
  try {
    let booksData;
    try {
      booksData = await getBooks();
    } finally {
      const book = checkBookExists(booksData, "name", dataInfo.name);
      if (book?.length > 0) {
        throw new Error("The Book already exists");
      }
      booksData?.push(dataInfo);
      const dataToWrite = booksData ? booksData : { books: [dataInfo] };
      fs.writeFile(booksFile, JSON.stringify(dataToWrite));
      return { message: "The data has been updated" };
    }
  } catch (e: any) {
    throw new Error(e.message);
  }
}

export default {
  getBooks,
  getBookByName,
  getBookWithIsbn,
  addBooks,
};
