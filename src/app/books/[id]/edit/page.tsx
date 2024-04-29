import EditBookForm from "@/components/EditBookForm";
import { fetchBookByID } from "@/scripts/data";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const book = await fetchBookByID(id);

  return <EditBookForm book={book} />;
}
