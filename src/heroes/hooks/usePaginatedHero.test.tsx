import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";
import { describe, test, expect, vi } from "vitest";
import { usePaginatedHero } from "./usePaginatedHero";
import { renderHook, waitFor } from "@testing-library/react";
import { getHeroesByPageAction } from "../actions/get-heroes-by-page-action";

vi.mock("../actions/get-heroes-by-page-action", () => ({
  getHeroesByPageAction: vi.fn(),
}));
const mockGetHeroesByPageAction = vi.mocked(getHeroesByPageAction);

const tanStackCustomProvider = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  return ({ children }: PropsWithChildren) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("usePaginatedHero", () => {
  test("should return the initial state (isLoading)", () => {
    const { result } = renderHook(() => usePaginatedHero(1, 6), {
      wrapper: tanStackCustomProvider(),
    });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.isError).toBe(false);
    expect(result.current.data).toBe(undefined);
    expect(result.current.data).toBeUndefined();
  });

  test("shoult return succedd state with data when API call succeeds", async () => {
    const mockHeroesData = {
      total: 20,
      pages: 4,
      heroes: [],
    };
    mockGetHeroesByPageAction.mockResolvedValue(mockHeroesData);
    const { result } = renderHook(() => usePaginatedHero(1, 6), {
      wrapper: tanStackCustomProvider(),
    });
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });
    expect(result.current.status).toBe('success');
    expect(mockGetHeroesByPageAction).toHaveBeenCalled();
    expect(mockGetHeroesByPageAction).toHaveBeenCalledWith(1,6,'all');
  });

  test("shoult call getHeroesByPageAction with arguments", async () => {
    const mockHeroesData = {
      total: 20,
      pages: 4,
      heroes: [],
    };
    mockGetHeroesByPageAction.mockResolvedValue(mockHeroesData);
    const { result } = renderHook(() => usePaginatedHero(1, 6,'heroes'), {
      wrapper: tanStackCustomProvider(),
    });
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });
    expect(result.current.status).toBe('success');
    expect(mockGetHeroesByPageAction).toHaveBeenCalled();
    expect(mockGetHeroesByPageAction).toHaveBeenCalledWith(1,6,'heroes');
  });
});

// describe('',()=>{
//     test('',()=>{

//     })
// })
