import Books from "@/components/Books";
import InputBar from "@/components/InputBar";

export default function Page() {
  return (
    <div className="flex flex-col m-6">
      <InputBar />
      <div className="mt-2">
        <Books />
      </div>
    </div>
  );
}
