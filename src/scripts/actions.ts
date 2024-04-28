"use server";

import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";

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

  try {
    await sql`INSERT INTO Books (title, author, notes) VALUES (${title}, ${author}, ${notes})`;
    revalidatePath("/books");
  } catch (err) {
    console.error("error inserting book data", err);
  }
}
