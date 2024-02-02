import React from "react";
import { getCharacterById, getStarshipById } from "@/services/ApiClient";
import { EntityPageProps } from "@/domain/types";
import Image from "next/image";

const StarshipPage: React.FC<EntityPageProps> = async ({
  params,
}: EntityPageProps) => {
  const starship = await getStarshipById(params.id);
  return (
    <div className={"mt-8 flex flex-col"}>
      <div className={"hero bg-base-200 w-full"}>
        <div
          className={
            "hero-content flex-col lg:flex-row-reverse items-start w-full"
          }
        >
          <Image
            src={`/images/starships/${starship.extId}.jpg`}
            alt={"Character picture"}
            width={450}
            height={800}
            className={"aspect-video rounded-lg shadow-2xl border-2 w-4/6"}
          />
          <div className={"lg:mr-20 capitalize"}>
            <h2 className={"text-4xl font-bold mb-10"}>{starship.name}</h2>
            <p>model: {starship.model}</p>
            <p>manufacturer: {starship.manufacturer}</p>
            <p>Cargo Capacity: {starship.cargoCapacity}</p>
            <p>Consumables: {starship.consumables}</p>
            <p>Crew: {starship.crew}</p>
            <p>passengers: {starship.passengers}</p>
            <p>Hyper drive Rating: {starship.hyperdriveRating}</p>
            <p>MGLT: {starship.mglt}</p>
            <p>Max Atmosphering Speed: {starship.maxAtmospheringSpeed}</p>
            <p>Length: {starship.length}</p>
            <p>Cost in Credits: {starship.costInCredits}</p>
            <div className={"mt-10 border rounded-lg p-2"}>
              <div>Known Pilots:</div>
              <div>Movies:</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StarshipPage;
