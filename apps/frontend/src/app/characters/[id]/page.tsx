import React from "react";
import { getCharacterById } from "@/services/ApiClient";
import { EntityPageProps } from "@/domain/types";
import CharacterDetails from "@/components/Character/CharacterDetails";
import Image from "next/image";

const CharacterPage: React.FC<EntityPageProps> = async ({
  params,
}: EntityPageProps) => {
  const character = await getCharacterById(params.id);
  return (
    <div className={"mt-12 flex flex-col"}>
      <div className={"hero bg-base-200"}>
        <div className={"hero-content flex-col lg:flex-row-reverse items-start"}>
          <Image
            src={`/images/characters/${character.extId}.jpg`}
            alt={"Character picture"}
            width={450}
            height={800}
            className={"max-w-sm rounded-lg shadow-2xl border-2"}
          />
          <div className={"lg:mr-20 capitalize"}>
            <h2 className={"text-4xl font-bold mb-10"}>{character.name}</h2>
            <p>Birth Year: {character.birthYear}</p>
            <p>Height: {character.height}</p>
            <p>Mass: {character.mass}</p>
            <p>Gender: {character.gender}</p>
            <p>Hair Color: {character.hairColor}</p>
            <p>Skin Color: {character.skinColor}</p>
            <p>Born in: {character.planet}</p>
            <div className={"mt-10 border rounded-lg p-2"}>
              <div>Can be seen in:</div>
              <div>Known for piloting:</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterPage;
