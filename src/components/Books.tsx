import Book from "./Book";
import { fetchBooks } from "../scripts/data";

export default async function Books() {
  const books = await fetchBooks();
  return (
    <>
      {books.map((book) => {
        return (
          <Book
            key={book.id}
            title={book.title}
            author={book.author}
            notes={book.notes}
          />
        );
      })}
    </>
  );
}
