import EditBookForm from "@/components/EditBookForm";
import { fireEvent, render, screen } from "@testing-library/react";

const sqlMock = jest.fn().mockResolvedValueOnce({});

jest.mock("../../scripts/actions", () => ({
  ...jest.requireActual("../../scripts/actions"),
  updateBook: jest
    .fn()
    .mockImplementation(async (id: string, formData: FormData) => {
      await sqlMock`UPDATE books
        SET title = ${formData.get("title")}, author = ${formData.get("author")}, notes = ${formData.get("notes")}
        WHERE id = ${id}`;
    }),
}));

describe("edit form", () => {
  beforeEach(() => {
    (sqlMock as jest.Mock).mockReset();
  });
  const mockBook = {
    id: "112-2234",
    title: "test title",
    author: "test author",
    notes: "",
  };
  it("shows edit book form", () => {
    render(<EditBookForm book={mockBook} />);

    screen.getByLabelText(/title/);
    screen.getByLabelText(/author/);
    screen.getByLabelText(/notes/);
    screen.getByRole("button");
  });

  it("shows edit form pre-filled", () => {
    const { getByLabelText } = render(<EditBookForm book={mockBook} />);

    const bTitle = getByLabelText("title:") as HTMLInputElement;
    const bAuthor = getByLabelText("author:") as HTMLInputElement;
    const bNotes = getByLabelText("notes:") as HTMLInputElement;

    expect(bTitle.value).toBe("test title");
    expect(bAuthor.value).toBe("test author");
    expect(bNotes.value).toHaveLength(0);
  });

  it("updates successfully", () => {
    const { getByRole } = render(<EditBookForm book={mockBook} />);

    const submitBtn = getByRole("button");

    fireEvent.submit(submitBtn, { formData: { id: mockBook.id } });

    expect(sqlMock).toHaveBeenCalledTimes(1);
  });

  it("does not update", () => {
    const { getByRole, getByLabelText } = render(
      <EditBookForm book={mockBook} />,
    );

    const submitBtn = getByRole("button");

    fireEvent.change(getByLabelText(/title/i), {
      target: { value: "" },
    });

    fireEvent.submit(submitBtn, { formData: { id: mockBook.id } });

    expect(sqlMock).toHaveBeenCalledTimes(0);
  });

  it("gives user feedback when missing required fields", () => {
    const { getByRole, getByLabelText } = render(
      <EditBookForm book={mockBook} />,
    );

    const submitBtn = getByRole("button");

    fireEvent.change(getByLabelText(/title/i), {
      target: { value: "" },
    });

    fireEvent.submit(submitBtn, { formData: { id: mockBook.id } });

    const errMessage = screen.getByText(/oops! title and author are required/i);

    expect(errMessage).toBeVisible();
  });
});
