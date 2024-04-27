"use server";

import { z } from "zod";

const FormSchema = z.object({
  id: z.string(),
  title: z.string(),
  author: z.string(),
  notes: z.string(),
});

const CreateBook = FormSchema.omit({ id: true });

export async function createBook(formData: FormData) {
  console.log("createBook() fired");

  const { title, author, notes } = CreateBook.parse({
    title: formData.get("title"),
    author: formData.get("author"),
    notes: formData.get("notes"),
  });
}
