interface BookProps {
  title: string;
  author: string;
  notes: string;
}

export default function Book({ title, author, notes }: BookProps) {
  return (
    <div className="rounded-lg bg-slate-50 my-8 p-2 shadow">
      <p>{title}</p>
      <p>{author}</p>
      <p>{notes}</p>
    </div>
  );
}
