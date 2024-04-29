import { deleteBook } from "@/scripts/actions";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export function EditBookBtn({ id }: { id: string }) {
  return (
    <Link href={`/books/${id}/edit`} className="self-center mr-3">
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteBookBtn({ id }: { id: string }) {
  const deleteBookByID = deleteBook.bind(null, id);
  return (
    <form action={deleteBookByID} className="self-center">
      <button>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}
