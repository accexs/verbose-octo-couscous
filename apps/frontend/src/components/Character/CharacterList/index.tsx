import React from "react";
import CharacterCard from "@/components/Character/CharacterList/CharacterCard";
import { getCharacters } from "@/services/ApiClient";
import Paginator from "@/components/Paginator";
import Favorite from "@/components/Favorite";

type CharacterListProps = {
  currentPage: number;
};

const CHARACTERS_PER_PAGE = 6;

const CharacterList: React.FC<CharacterListProps> = async ({
  currentPage,
}: CharacterListProps) => {
  const { data, totalPages } = await getCharacters(
    `limit=${CHARACTERS_PER_PAGE}&page=${currentPage}`,
  );
  return (
    <section
      className={"flex w-full flex-col items-center justify-center px-2 lg:px-32"}
    >
      <div className={"flex w-full justify-between"}>
        <h2 className={"inline-block text-4xl font-bold capitalize"}>
          Characters
        </h2>
      </div>

      <div className={"mt-8 grid lg:grid-cols-3 gap-2 md:gap-6 lg:gap-12"}>
        {data.map((character: any) => {
          return (
            <article key={character._id} className={"col-span-1 row-span-1 "}>
              <CharacterCard character={character} />
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

export default CharacterList;
