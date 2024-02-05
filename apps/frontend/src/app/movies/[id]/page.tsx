import React from "react";
import { getMovieById } from "@/services/ApiClient";
import { EntityPageProps } from "@/domain/types";
import Image from "next/image";
import TextCrawl from "@/components/Movie/TextCrawl";
import {
  getRelatedCharacters,
  getRelatedPlanets,
  getRelatedStarships,
  romanize,
} from "@/app/utils";
import RelatedList from "@/components/RelatedList";

const MoviePage: React.FC<EntityPageProps> = async ({
  params,
}: EntityPageProps) => {
  const movie = await getMovieById(params.id);
  const relatedStarships = getRelatedStarships(movie.starships);
  const relatedCharacters = getRelatedCharacters(movie.characters);
  const relatedPlanets = getRelatedPlanets(movie.planets);
  return (
    <div className={"mt-8 flex flex-col"}>
      <div className={"hero bg-base-200"}>
        <div
          className={"hero-content flex-col lg:flex-row-reverse items-start"}
        >
          <Image
            src={`/images/movies/${movie.extId}.jpg`}
            alt={"Movie picture"}
            width={450}
            height={800}
            className={"rounded-lg shadow-2xl border-2"}
          />
          <div className={"lg:mr-20 capitalize w-1/2"}>
            <h2
              className={"text-4xl font-bold mb-10 text-warning"}
            >{`Episode ${romanize(movie.episodeId)} ${movie.title}`}</h2>
            <p className={"font-bold"}>Release Date: {movie.releaseDate}</p>
            <p className={"font-bold"}>Director: {movie.director}</p>
            <p className={"font-bold"}>Producers: {movie.producer}</p>
            <TextCrawl text={movie.openingCrawl} />
            <div className={"mt-10 border rounded-lg p-2"}>
              {relatedCharacters.length > 0 && (
                <RelatedList
                  title={"Seen characters"}
                  entityList={relatedCharacters}
                />
              )}
              {relatedPlanets.length > 0 && (
                <RelatedList
                  title={"Seen planets"}
                  entityList={relatedPlanets}
                />
              )}
              {relatedStarships.length > 0 && (
                <RelatedList
                  title={"Seen starships"}
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

export default MoviePage;
