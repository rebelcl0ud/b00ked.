import { PencilIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function EditBookBtn({ id }: { id: string }) {
  return (
    <Link href={`/books/${id}/edit`}>
      <PencilIcon className="w-5" />
    </Link>
  );
}
