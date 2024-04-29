import Books from "@/components/Books";
import Form from "@/components/Form";

export default function Page() {
  return (
    <div className="flex flex-col m-6 w-1/2">
      <Form />
      <div className="mt-2">
        <Books />
      </div>
    </div>
  );
}
