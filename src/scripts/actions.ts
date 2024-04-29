"use server";

import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const FormSchema = z.object({
  id: z.string(),
  title: z.string(),
  author: z.string(),
  notes: z.string(),
});

const CreateBook = FormSchema.omit({ id: true });
const UpdateBook = FormSchema.omit({ id: true });

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

// submit update
export async function updateBook(id: string, formData: FormData) {
  console.log("updateBook() fired");

  const { title, author, notes } = UpdateBook.parse({
    title: formData.get("title"),
    author: formData.get("author"),
    notes: formData.get("notes"),
  });

  try {
    await sql`
        UPDATE books 
        SET title = ${title}, author = ${author}, notes = ${notes} 
        WHERE id = ${id}`;
  } catch (err) {
    console.error("error updating book", err);
  }
  revalidatePath("/books");
  redirect("/books");
}

// submit a delete
export async function deleteBook(bookID: string) {
  try {
    await sql`DELETE FROM books WHERE id = ${bookID}`;
  } catch (err) {
    console.error("error deleting book", err);
    throw new Error("failed to delete book");
  }
  revalidatePath("/books");
}
