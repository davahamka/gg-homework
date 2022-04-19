import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import SearchTrack from "../components/SearchTrack";
import store from "../store";
import UserEvent from "@testing-library/user-event";

const renderWithUtils = (children) =>
  render(<Provider store={store}>{children}</Provider>);

test("renders search input component", async () => {
  renderWithUtils(<SearchTrack />);

  const inputElement = screen.getByPlaceholderText("Find tracks that you want");

  expect(inputElement).toBeInTheDocument();
});

test("value change input search component", () => {
  renderWithUtils(<SearchTrack />);

  const inputElement = screen.getByPlaceholderText("Find tracks that you want");

  UserEvent.type(inputElement, "tulus");

  expect(screen.getByDisplayValue("tulus")).toBeInTheDocument();
});

test("renders search button component", async () => {
  renderWithUtils(<SearchTrack />);

  const buttonElement = screen.getByRole("button", {
    name: /cari/i,
  });

  expect(buttonElement).toBeInTheDocument();
});
