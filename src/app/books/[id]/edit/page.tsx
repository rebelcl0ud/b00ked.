import EditBookForm from "@/components/EditBookForm";
import { fetchBookByID } from "@/scripts/data";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const book = await fetchBookByID(id);

  if (!book) {
    notFound();
  }

  return <EditBookForm book={book} />;
}
