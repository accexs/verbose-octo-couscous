import React from "react";
import { getPlanets } from "@/services/ApiClient";
import Paginator from "@/components/Paginator";
import PlanetCard from "@/components/Planet/PlanetList/PlanetCard";

type PlanetListProps = {
  currentPage: number;
};

const PLANETS_PER_PAGE = 6;

const PlanetList: React.FC<PlanetListProps> = async ({
  currentPage,
}: PlanetListProps) => {
  const { data, totalPages } = await getPlanets(
    `limit=${PLANETS_PER_PAGE}&page=${currentPage}`,
  );
  return (
    <section
      className={"flex w-full flex-col items-center justify-center px-2 lg:px-32"}
    >
      <div className={"flex w-full justify-between"}>
        <h2 className={"inline-block text-4xl font-bold capitalize"}>
          Planets
        </h2>
      </div>

      <div className={"mt-8 grid lg:grid-cols-3 gap-2 md:gap-4 lg:gap-8"}>
        {data.map((planet: any) => {
          return (
            <article
              key={planet._id}
              className={"col-span-1 row-span-1 lg:max-h-52"}
            >
              <PlanetCard planet={planet} />
            </article>
          );
        })}
      </div>
      <div className={"w-full flex justify-center mt-6"}>
        <Paginator currentPage={currentPage} totalPages={totalPages} />
      </div>
    </section>
  );
};

export default PlanetList;
