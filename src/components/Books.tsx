import Book from "./Book";
import { fetchBooks } from "../scripts/data";
import EditBookBtn from "./EditBookBtn";

export default async function Books() {
  const books = await fetchBooks();
  return (
    <>
      {books.map((book, id) => {
        return (
          <div
            key={id}
            className="flex justify-between rounded-lg bg-slate-50 my-8 p-2 shadow"
          >
            <Book
              key={book.id}
              title={book.title}
              author={book.author}
              notes={book.notes}
            />
            <EditBookBtn id={book.id} />
          </div>
        );
      })}
    </>
  );
}
