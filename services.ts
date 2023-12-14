import fs from "fs/promises";

const booksFile = "books.json";

export interface Ibook {
  name: string;
  author: string;
  isbn: number;
}

let books: Ibook[] = null;

function checkBookExists(
  books: Ibook[],
  checkingProps: keyof Ibook,
  value: string | number
): Ibook[] {
  try {
    const book = books?.filter((book: Ibook) =>
      book[checkingProps]
        .toString()
        .toLowerCase()
        .startsWith(value.toString().trim().toLowerCase())
    );
    return book;
  } catch (e: any) {
    throw new Error(e.message);
  }
}

async function checkFileData() {
  try {
    if (books === null) {
      books = await readFile(booksFile);
    }
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
    await checkFileData();
    return books;
  } catch (e: any) {
    throw new Error(e.message);
  }
}

async function getBookByName(value: string): Promise<Ibook[]> {
  try {
    await checkFileData();
    const bookFound = checkBookExists(books, "name", value);
    return bookFound;
  } catch (e: any) {
    throw new Error(e.message);
  }
}

async function getBookWithIsbn(isbn: number): Promise<Ibook[]> {
  try {
    await checkFileData();
    const book = checkBookExists(books, "isbn", isbn);
    return book;
  } catch (e: any) {
    throw new Error(e.message);
  }
}

function checkBookData(data: any):boolean {
  if (Object.keys(data).length !== 0) {
    let Iobj: Ibook = { name: "", author: "", isbn: 0 };

    return (
      Object.keys(data).length === Object.keys(Iobj).length &&
      Object.keys(Iobj).every(
        (key) =>
          key in data && typeof data[key] === typeof Iobj[key as keyof Ibook]
      )
    );
  }
  return false;
}

async function addBooks(dataInfo: Ibook):Promise<any>{
  try {
    try {
      await checkFileData();
    } finally {
      const book = checkBookExists(books, "name", dataInfo.name);
      if (book?.length > 0) {
        throw new Error("The Book already exists");
      }
      books?.push(dataInfo);
      const dataToWrite = books ? books : { books: [dataInfo] };
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
  checkBookData,
};
