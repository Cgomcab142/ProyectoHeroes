import { describe, test, expect, vi } from "vitest";
import { appRouter } from "./app.router";
import {
  createMemoryRouter,
  Outlet,
  RouterProvider,
  useParams,
} from "react-router";
import { render, screen } from "@testing-library/react";

vi.mock("@/heroes/layouts/HeroesLayout", () => ({
  HeroesLayout: () => (
    <div data-testid="heroes-layout">
      <Outlet />
    </div>
  ),
}));

vi.mock("@/heroes/pages/home/HomePage", () => ({
  default: function HomePage() {
    return <div data-testid="home-page"></div>;
  },
}));

vi.mock("@/heroes/pages/hero/HeroPage", () => ({
  HeroPage: () => {
    const { idSlug = "" } = useParams();
    return <div data-testid="hero-page">HeroPage - {idSlug}</div>;
  },
}));

vi.mock("@/heroes/pages/search/SearchPage", () => ({
  default: () => <div data-testid="search-page"></div>,
}));


describe("appRouter", () => {
  test("should be configured as expected", () => {
    expect(appRouter.routes).toMatchSnapshot();
  });

  test("should render home page at root path", () => {
    const router = createMemoryRouter(appRouter.routes, {
      initialEntries: ["/"],
    });
    render(<RouterProvider router={router} />);
    screen.debug();

    expect(screen.getByTestId("home-page")).toBeDefined();
  });

  test("should render hero page at/heroes/:idSlug path", () => {
    const router = createMemoryRouter(appRouter.routes, {
      initialEntries: ["/hero/superman"],
    });

    render(<RouterProvider router={router} />);

    expect(screen.getByTestId("hero-page").innerHTML).toContain("superman");
  });

  test("should render search pae at /search path", async () => {
    const router = createMemoryRouter(appRouter.routes, {
      initialEntries: ["/search"],
    });

    render(<RouterProvider router={router} />);
    screen.debug();

    expect(await screen.findByTestId("search-page")).toBeDefined()
  });

   test('should redirect to home page for unkown router',()=>{
      const router = createMemoryRouter(appRouter.routes, {
      initialEntries: ["/otra"],
    });

    render(<RouterProvider router={router} />);

    expect(screen.findByTestId("home-page")).toBeDefined()
    screen.debug()

    })
});

// })// describe('',()=>{
//     test('',()=>{

//     })
// })
