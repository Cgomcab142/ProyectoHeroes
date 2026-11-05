import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CustomJumbotron } from "@/components/custom/CustomJumbotron";
import { HeroGrid } from "@/heroes/components/HeroGrid";
import { CustomPagination } from "@/components/custom/CustomPagination";
import { CustomBreadcrumbs } from "@/components/custom/CustomBreadcrumbs";
import { useSearchParams } from "react-router";
import { use, useMemo } from "react";
import { HeroStats } from "@/heroes/components/HeroStats";
import { useHeroSummary } from "@/heroes/hooks/useHeroSummary";
import { usePaginatedHero } from "@/heroes/hooks/usePaginatedHero";
import { FavoriteHeroContext } from "@/heroes/context/FavoriteHeroContext";

export const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  // console.log(searchParams.get("page"));
  // console.log(searchParams.get("offset"));

  useSearchParams({ tab: ["page", "offset"] });
  const {favoriteCount,favorites} = use(FavoriteHeroContext)

  const activeTab = searchParams.get("tab") ?? "all";
  const page = searchParams.get("page") ?? "1";
  const limit = searchParams.get("limit") ?? "6";
  const category = searchParams.get("category") ?? "all";

  const selectedTab = useMemo(() => {
    const validTabs = ["all", "favorites", "heroes", "villains"];
    return validTabs.includes(activeTab) ? activeTab : "all";
  }, [activeTab]);

  const { data: heroesResponse } = usePaginatedHero(+page, +limit, category);
  const { data: summary } = useHeroSummary();

  return (
    <>
      <>
        {/* Header */}
        <CustomJumbotron
          title="Universo de Super héroes"
          description="Descubre, explora y administra super héroes y villanos"
        />
        <CustomBreadcrumbs current="Inicio" />

        {/* Stats Dashboard */}
        <HeroStats />

        {/* Controls */}
        {/* Action buttons */}

        {/* Advanced Filters */}

        {/* Tabs */}
        <Tabs value={selectedTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger
              value="all"
              onClick={() =>
                setSearchParams((prev) => {
                  prev.set("tab", "all");
                  prev.set("page", "1");
                  prev.set("category", "all");
                  return prev;
                })
              }
            >
              All Characters ({summary?.totalHeroes})
            </TabsTrigger>
            <TabsTrigger
              value="favorites"
              onClick={() =>
                setSearchParams((prev) => {
                  prev.set("tab", "favorites");
                  // prev.set("category", "all");
                  return prev;
                })
              }
              className="flex items-center gap-2"
            >
              Favorites ({favoriteCount})
            </TabsTrigger>
            <TabsTrigger
              value="heroes"
              onClick={() =>
                setSearchParams((prev) => {
                  prev.set("tab", "heroes");
                  prev.set("page", "1");
                  prev.set("category", "hero");
                  return prev;
                })
              }
            >
              Heroes ({summary?.heroCount})
            </TabsTrigger>
            <TabsTrigger
              value="villains"
              onClick={() =>
                setSearchParams((prev) => {
                  prev.set("tab", "villains");
                  prev.set("page", "1");
                  prev.set("category", "villain");
                  return prev;
                })
              }
            >
              Villains ({summary?.villainCount})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            {/* Mostrar todos los personajes */}
            <HeroGrid heroes={heroesResponse?.heroes ?? []} />
          </TabsContent>
          <TabsContent value="favorites">
            {/* Mostrar todos los personajes favoritos*/}

            <h1>Favoritos!!!</h1>
            <HeroGrid heroes={favorites} />
          </TabsContent>
          <TabsContent value="heroes">
            {/* Mostrar todos los personajes heroes*/}

            <h1>Héroes</h1>
            <HeroGrid heroes={heroesResponse?.heroes ?? []} />
          </TabsContent>
          <TabsContent value="villains">
            {/* Mostrar todos los personajes villanos*/}

            <h1>Villanos</h1>
            <HeroGrid heroes={heroesResponse?.heroes ?? []} />
          </TabsContent>
        </Tabs>

        {/* Character Grid */}

        {/* Pagination */}
        {
          selectedTab !== "favorites" && (
            <CustomPagination totalPages={heroesResponse?.pages ?? 1} />
          )
        }
      </>
    </>
  );
}
export default HomePage;