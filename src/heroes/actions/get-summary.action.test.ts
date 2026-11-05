import { describe, test, expect } from "vitest";
import { getSummaryAction } from "./get-summary.action";

describe("getSummaryAction", () => {
  test("should fetch summary and return complete information", async () => {
    const summary = await getSummaryAction();

    expect(summary).toStrictEqual({
        totalHeroes: expect.any(Number),
        strongestHero:  expect.objectContaining({
          id: "1",
          name: "Clark Kent",
          slug: "clark-kent",
          alias: "Superman",
          powers: [
            "Súper fuerza",
            "Vuelo",
            "Visión de calor",
            "Visión de rayos X",
            "Invulnerabilidad",
            "Súper velocidad",
          ],
          description:
            "El Último Hijo de Krypton, protector de la Tierra y símbolo de esperanza para toda la humanidad.",
          strength: 10,
          intelligence: 8,
          speed: 9,
          durability: 10,
          team: "Liga de la Justicia",
          image: "1.jpeg",
          firstAppearance: "1938",
          status: "Active",
          category: "Hero",
          universe: "DC",
        }),
        smartestHero: {
          id: expect.any(String),
          name: expect.any(String),
          slug: expect.any(String),
          alias: expect.any(String),
          powers: expect.any(Array),
          description: expect.any(String),
          strength: expect.any(Number),
          intelligence: expect.any(Number),
          speed: expect.any(Number),
          durability: expect.any(Number),
          team: expect.any(String),
          image: expect.any(String),
          firstAppearance: expect.any(String),
          status: expect.any(String),
          category: expect.any(String),
          universe: expect.any(String),
        },
        heroCount: expect.any(Number),
        villainCount:expect.any(Number),
      },)
    });
  });
// });
