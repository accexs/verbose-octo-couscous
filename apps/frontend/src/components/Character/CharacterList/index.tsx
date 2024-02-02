import React from "react";
import CharacterCard from "@/components/Character/CharacterList/CharacterCard";

type CharacterListProps = {
  characterList: any[];
};
const CharacterList: React.FC<CharacterListProps> = ({
  characterList,
}: CharacterListProps) => {
  return (
    <section
      className={"flex w-full flex-col items-center justify-center px-32"}
    >
      <div className={"fl flex w-full justify-between"}>
        <h2 className={"inline-block text-4xl font-bold capitalize"}>
          Characters
        </h2>
      </div>

      <div className={"mt-16 grid grid-cols-3 grid-rows-2 gap-12"}>
        {characterList.map((character) => {
          return (
            <article key={character._id} className={"col-span-1 row-span-1"}>
              <CharacterCard character={character} />
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default CharacterList;
