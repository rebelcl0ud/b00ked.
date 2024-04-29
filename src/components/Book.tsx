interface BookProps {
  title: string;
  author: string;
  notes: string;
}

export default function Book({ title, author, notes }: BookProps) {
  return (
    <div>
      <p>{title}</p>
      <p>{author}</p>
      <p>{notes}</p>
    </div>
  );
}
