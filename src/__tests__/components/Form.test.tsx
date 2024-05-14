import Form from "@/components/Form";
import { fireEvent, render, screen } from "@testing-library/react";

const sqlMock = jest.fn().mockResolvedValueOnce({});

jest.mock("../../scripts/actions", () => ({
  ...jest.requireActual("../../scripts/actions"),
  createBook: jest.fn().mockImplementation(async (formData: FormData) => {
    await sqlMock`INSERT INTO Books (title, author, notes) VALUES (${formData.get("title")}, ${formData.get("author")}, ${formData.get("notes")})`;
  }),
}));

describe("form", () => {
  beforeEach(() => {
    (sqlMock as jest.Mock).mockReset();
  });
  it("shows add book form", () => {
    render(<Form />);

    screen.getByLabelText(/title/);
    screen.getByLabelText(/author/);
    screen.getByLabelText(/notes/);
    screen.getByRole("button");
  });

  it("submits form successfully when reguired inputs supplied", () => {
    const { getByRole, getByLabelText } = render(<Form />);
    const submitBtn = getByRole("button", { name: "+" });

    fireEvent.change(getByLabelText(/title/i), {
      target: { value: "some title here" },
    });

    fireEvent.change(getByLabelText(/author/i), {
      target: { value: "some author name here" },
    });

    fireEvent.submit(submitBtn);

    expect(sqlMock).toHaveBeenCalledTimes(1);
  });

  it("does not submit form when missing required title and author", () => {
    render(<Form />);

    const submitBtn = screen.getByRole("button", { name: "+" });

    fireEvent.submit(submitBtn);

    expect(sqlMock).toHaveBeenCalledTimes(0);
  });

  it("gives user feedback when missing required fields", () => {
    render(<Form />);

    const submitBtn = screen.getByRole("button", { name: "+" });

    fireEvent.submit(submitBtn);

    const errMessage = screen.getByText(/oops! title and author are required/i);

    expect(errMessage).toBeVisible();
  });
});
