import { books } from "@/scripts/dummyData";
import Book from "./Book";

export default function Books() {
  return (
    <>
      {books.map((book, index) => {
        return (
          <>
            <Book
              key={index}
              title={book.title}
              author={book.author}
              notes={book.notes}
            />
            {/* edit/delete btns here */}
          </>
        );
      })}
    </>
  );
}
