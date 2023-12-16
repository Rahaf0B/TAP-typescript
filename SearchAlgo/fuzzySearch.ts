import { Ibook } from "../services";

import Fuse from "fuse.js";

async function SearchingAndOrder(
  books: Ibook[],
  attribute: string,
  value: string,
  sort?: string
): Promise<Ibook[]> {
  try {
    const opt = {
      includeScore: true,
      keys: [attribute],
    };

    const fuse = new Fuse(books, opt);
    const result = fuse.search("^" + value);
    let bookRes: Ibook[] = [];
    result.forEach(function (book) {
      bookRes.push(book["item"]);
    });
    if (sort) {
      if (sort == "asc") {
        bookRes.sort((a, b) =>
          a[attribute as keyof Ibook] > b[attribute as keyof Ibook]
            ? 1
            : b[attribute as keyof Ibook] > a[attribute as keyof Ibook]
            ? -1
            : 0
        );
      } else if (sort == "desc") {
        bookRes.sort((a, b) =>
          a[attribute as keyof Ibook] < b[attribute as keyof Ibook]
            ? 1
            : b[attribute as keyof Ibook] < a[attribute as keyof Ibook]
            ? -1
            : 0
        );
      }
    }
    return bookRes;
  } catch (e: any) {
    throw new Error(e.message);
  }
}

export default {
  SearchingAndOrder,
};
