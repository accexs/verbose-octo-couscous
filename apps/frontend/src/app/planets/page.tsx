import React, { Suspense } from "react";
import { getPlanets } from "@/services/ApiClient";
import { QueryParamsProps } from "@/domain/types";
import Loading from "@/app/loading";
import PlanetList from "@/components/Planet/PlanetList";

const PlanetsPage: React.FC<QueryParamsProps> = async ({
  searchParams,
}: QueryParamsProps) => {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  const planets = await getPlanets();
  return (
    <div className={"mt-4 flex flex-col"}>
      <Suspense key={currentPage} fallback={<Loading />}>
        <PlanetList currentPage={currentPage} />
      </Suspense>
    </div>
  );
};

export default PlanetsPage;
