"use client";

import { createBook } from "@/scripts/actions";
import { FormEvent, useRef, useState } from "react";

export default function Form() {
  const [showError, setShowError] = useState<string | null>(null);
  const ref = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(ref.current!);
    const title = formData.get("title");
    const author = formData.get("author");

    if (!title || !author) {
      setShowError("oops! title and author are required");
      return;
    }

    setShowError(null);

    await createBook(formData);
    ref.current?.reset();
  };

  return (
    <>
      {showError && (
        <h1 className="bg-red-200 text-center p-2 mb-8 rounded-md">
          {showError}
        </h1>
      )}

      <form ref={ref} onSubmit={handleSubmit} noValidate>
        <div className="flex gap-2 justify-center">
          {/* title */}
          <label htmlFor="title">title:</label>
          <input
            className="w-full"
            required
            id="title"
            type="text"
            name="title"
            placeholder="la croix yes plz tumeric."
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
            placeholder="kogi retro echo"
            onInvalid={(e) => e.preventDefault()}
          />
          {/* notes */}
          <label htmlFor="notes">notes:</label>
          <input
            className="w-full"
            id="notes"
            type="text"
            name="notes"
            placeholder="drinking vinegar tumeric food truck"
          />
          <button type="submit" className="w-1/2 rounded-md bg-blue-600">
            +
          </button>
        </div>
      </form>
    </>
  );
}
