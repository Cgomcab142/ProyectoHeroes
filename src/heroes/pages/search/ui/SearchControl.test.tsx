import { describe, test, expect } from "vitest";
import { SearchControl } from "./SearchControl";
import { MemoryRouter } from "react-router";
import { fireEvent, render, screen } from "@testing-library/react";

const renderWithRouter = (initialEntries: string[] = ["/"]) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <SearchControl />
    </MemoryRouter>,
  );
};

describe("SearchControls", () => {
  test("should render SearchControl with default values", () => {
    const { container } = renderWithRouter();
    expect(container).toMatchSnapshot();
  });

  test("should set input value when search param name is set", () => {
    renderWithRouter(["/?name=Batman"]);

    const input = screen.getByPlaceholderText(
      "Search heroes, villains, powers, teams...",
    ) as HTMLInputElement;

    expect(input.getAttribute("value")).toBe("Batman");
  });

  test("should change params when input is changed and enter is pressed", () => {
    renderWithRouter(["/?name=Batman"]);

    const input = screen.getByPlaceholderText(
      "Search heroes, villains, powers, teams...",
    ) as HTMLInputElement;

    expect(input.getAttribute("value")).toBe("Batman");

    fireEvent.change(input, { target: { value: "Superman" } });
    fireEvent.keyDown(input, { key: "Enter" });

    expect(input.getAttribute("value")).toBe("Superman");
  });

  test("should change params strength when slider changed", async () => {
    const { container } = renderWithRouter([
      "/?name=Batman&active-accordion=advance-filters",
    ]);
    const slider = container.querySelector(
      'input[type="range"]',
    ) as HTMLInputElement;
    expect(slider.getAttribute("aria-valuenow")).toBe("0");

    fireEvent.keyDown(slider, { key: "ArrowRight" });

    expect(slider.getAttribute("aria-valuenow")).toBe("1");

    screen.debug(slider);
  });

  test("should accordion be open when active-accordion param is set", async () => {

     renderWithRouter([
      "/?name=Batman&active-accordion=advance-filters",
    ]);

    const accordion = screen.getByTestId('accordion');
    screen.debug(accordion)
    // const accordionItem = accordion.querySelector('div');

    // expect(accordionItem?.getAttribute('data-open')).toBe(true)
  });
});

