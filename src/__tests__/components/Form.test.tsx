import Form from "@/components/Form";
import { render, screen } from "@testing-library/react";

describe("form", () => {
  it("shows add book form", () => {
    render(<Form />);

    screen.getByLabelText(/title/);
    screen.getByLabelText(/author/);
    screen.getByLabelText(/notes/);
    screen.getByRole("button");
  });
});
