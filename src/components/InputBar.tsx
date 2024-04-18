export default function InputBar() {
  return (
    <form>
      <div className="flex gap-2 justify-center">
        <label htmlFor="title">title:</label>
        <input
          className="w-full"
          required
          id="title"
          type="text"
          name="title"
          placeholder="la croix yes plz tumeric."
        />
        <label htmlFor="author">author:</label>
        <input
          className="w-full"
          required
          id="author"
          type="text"
          name="author"
          placeholder="kogi retro echo"
        />
        <label htmlFor="notes">notes:</label>
        <input
          className="w-full"
          id="notes"
          type="text"
          name="notes"
          placeholder="drinking vinegar tumeric food truck"
        />
        <button className="w-1/2 rounded-md bg-blue-600">+</button>
      </div>
    </form>
  );
}
