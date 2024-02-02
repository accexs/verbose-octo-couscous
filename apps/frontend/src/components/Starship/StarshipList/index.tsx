import React from "react";
import { getStarships } from "@/services/ApiClient";
import Paginator from "@/components/Paginator";
import StarshipCard from "@/components/Starship/StarshipList/StarshipCard";

type StarshipListProps = {
  currentPage: number;
};

const STARSHIPS_PER_PAGE = 6;

const StarshipList: React.FC<StarshipListProps> = async ({
  currentPage,
}: StarshipListProps) => {
  const { data, totalPages } = await getStarships(
    `limit=${STARSHIPS_PER_PAGE}&page=${currentPage}`,
  );
  return (
    <section
      className={"flex w-full flex-col items-center justify-center px-32"}
    >
      <div className={"flex w-full justify-between"}>
        <h2 className={"inline-block text-4xl font-bold capitalize"}>
          Characters
        </h2>
      </div>

      <div className={"mt-8 grid grid-cols-3 gap-8"}>
        {data.map((starship: any) => {
          return (
            <article key={starship._id} className={"col-span-1 row-span-1"}>
              <StarshipCard starship={starship} />
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

export default StarshipList;
