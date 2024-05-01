import { render, screen } from "@testing-library/react";
import { fetchBooks } from "@/scripts/data";
import { BooksTable } from "@/scripts/dataTypes";
import Book from "@/components/Book";

jest.mock("../../scripts/data", () => ({
  fetchBooks: jest.fn(),
}));

describe("books main feed", () => {
  it("shows feed", async () => {
    const mockBooks: BooksTable[] = [
      {
        id: "123-123-123",
        title: "test title 1",
        author: "test author 1",
        notes: "test notes 1",
      },
    ];

    (fetchBooks as jest.Mock).mockResolvedValue(mockBooks);

    render(
      <Book
        key={mockBooks[0].id}
        title={mockBooks[0].title}
        author={mockBooks[0].author}
        notes={mockBooks[0].notes}
      />,
    );

    screen.getByText(/test title 1/);
    screen.getByText(/test author 1/);
    screen.getByText(/test notes 1/);
  });
});
