import Books from "@/components/Books";
import Form from "@/components/Form";

export default function Page() {
  return (
    <div className="flex flex-col m-6">
      <Form />
      <div className="mt-2">
        <Books />
      </div>
    </div>
  );
}
