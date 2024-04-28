"use client";

import { createBook } from "@/scripts/actions";
import { useRef } from "react";

export default function Form() {
  const ref = useRef<HTMLFormElement>(null);

  return (
    <form
      ref={ref}
      action={async (formData) => {
        await createBook(formData);
        ref.current?.reset();
      }}
    >
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
  );
}
