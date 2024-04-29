import { sql } from "@vercel/postgres";
import { BookForm, BooksTable } from "@/scripts/dataTypes";
import { unstable_noStore as noStore } from "next/cache";

export async function fetchBooks(): Promise<BooksTable[]> {
  try {
    const data = await sql<BooksTable>`SELECT * FROM books`;
    const books = data.rows;
    return books;
  } catch (error) {
    console.error(`db error: ${error}`);
    throw new Error("failed to fetch books table");
  }
}

export async function fetchBookByID(id: string) {
  noStore();
  try {
    const data = await sql<BookForm>`
      SELECT 
        books.id,
        books.title, 
        books.author,
        books.notes
      FROM books
      WHERE books.id = ${id}
    `;
    return data.rows[0];
  } catch (error) {
    console.error(`db error: ${error}`);
    throw new Error("failed to fetch book");
  }
}
