import React from "react";
import { getCharacterById } from "@/services/ApiClient";
import { EntityPageProps } from "@/domain/types";
import Image from "next/image";
import Link from "next/link";
import RelatedList from "@/components/RelatedList";
import { getRelatedMovies, getRelatedStarships } from "@/app/utils";

const CharacterPage: React.FC<EntityPageProps> = async ({
  params,
}: EntityPageProps) => {
  const character = await getCharacterById(params.id);
  const relatedMovies = getRelatedMovies(character.movies);
  const relatedStarships = getRelatedStarships(character.starships);

  return (
    <div className={"mt-8 flex flex-col"}>
      <div className={"hero bg-base-200"}>
        <div
          className={"hero-content flex-col lg:flex-row-reverse items-start"}
        >
          <Image
            src={`/images/characters/${character.extId}.jpg`}
            alt={"Character picture"}
            width={450}
            height={800}
            className={"rounded-lg shadow-2xl border-2"}
          />
          <div className={"lg:mr-20 capitalize"}>
            <h2 className={"text-4xl font-bold mb-10"}>{character.name}</h2>
            <p>Birth Year: {character.birthYear}</p>
            <p>Height: {character.height}</p>
            <p>Mass: {character.mass}</p>
            <p>Gender: {character.gender}</p>
            <p>Hair Color: {character.hairColor}</p>
            <p>Skin Color: {character.skinColor}</p>
            <p>
              Homeworld:{" "}
              <Link
                className={"link hover:text-warning"}
                href={`/planets/${character.planet._id}`}
              >
                {character.planet.name}
              </Link>
            </p>
            <div className={"mt-10 border rounded-lg p-2"}>
              {relatedMovies.length > 0 && (
                <RelatedList
                  title={"Can be seen in"}
                  entityList={relatedMovies}
                />
              )}
              {relatedStarships.length > 0 && (
                <RelatedList
                  title={"Known for piloting:"}
                  entityList={relatedStarships}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterPage;
