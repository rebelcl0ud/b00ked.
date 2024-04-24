import { sql } from "@vercel/postgres";
import { BooksTable } from "@/scripts/dataTypes";

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
