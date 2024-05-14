"use client";

import { updateBook } from "@/scripts/actions";
import { BookForm } from "@/scripts/dataTypes";
import { PlusIcon } from "@heroicons/react/24/outline";
import { FormEvent, useState } from "react";

export default function EditBookForm({ book }: { book: BookForm }) {
  const [showError, setShowError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const title = formData.get("title");
    const author = formData.get("author");

    if (!title || !author) {
      setShowError("oops! title and author are required");
      return;
    }
    setShowError(null);

    await updateBook(book.id, new FormData(e.currentTarget));
  };

  return (
    <>
      {showError && (
        <h1 className="bg-red-200 text-center p-2 mb-8 rounded-md">
          {showError}
        </h1>
      )}
      <form onSubmit={handleSubmit} noValidate>
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
            onInvalid={(e) => e.preventDefault()}
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
            onInvalid={(e) => e.preventDefault()}
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
    </>
  );
}
