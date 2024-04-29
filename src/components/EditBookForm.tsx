import { updateBook } from "@/scripts/actions";
import { BookForm } from "@/scripts/dataTypes";
import { PlusIcon } from "@heroicons/react/24/outline";

export default function EditBookForm({ book }: { book: BookForm }) {
  const updateBookWithID = updateBook.bind(null, book.id);

  return (
    <form action={updateBookWithID}>
      <div className="flex gap-2 justify-center">
        {/* title */}
        <label htmlFor="title">title:</label>
        <input
          className="w-full"
          required
          id="title"
          type="text"
          name="title"
          defaultValue={book.title}
        />
        {/* author */}
        <label htmlFor="author">author:</label>
        <input
          className="w-full"
          required
          id="author"
          type="text"
          name="author"
          defaultValue={book.author}
        />
        {/* notes */}
        <label htmlFor="notes">notes:</label>
        <input
          className="w-full"
          id="notes"
          type="text"
          name="notes"
          defaultValue={book.notes}
        />
        <button
          type="submit"
          className="flex justify-center items-center w-1/2 rounded-md bg-blue-600"
        >
          <PlusIcon className="w-5" />
        </button>
      </div>
    </form>
  );
}
