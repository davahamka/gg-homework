import { rest } from "msw";
import { setupServer } from "msw/node";
import TestSearchTrack from "../components/TestSearchTrack";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { responseTrackSearch } from "../mocks/responseTrackSearch";

const server = setupServer(
  rest.get("/search", (req, res, ctx) => {
    return res(ctx.json(responseTrackSearch));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("loads and displays greeting", async () => {
  render(<TestSearchTrack />);

  userEvent.click(screen.getByText("cari"));

  await screen.findByText("Tulus");
});
