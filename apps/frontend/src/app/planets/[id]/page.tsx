import React from "react";
import { getPlanetById } from "@/services/ApiClient";
import { EntityPageProps } from "@/domain/types";
import Image from "next/image";

const PlanetPage: React.FC<EntityPageProps> = async ({
  params,
}: EntityPageProps) => {
  const planet = await getPlanetById(params.id);
  return (
    <div className={"mt-8 flex flex-col"}>
      <div className={"hero bg-base-200"}>
        <div
          className={"hero-content flex-col lg:flex-row-reverse items-start"}
        >
          <Image
            src={`/images/planets/${planet.extId}.jpg`}
            alt={"Character picture"}
            width={450}
            height={800}
            className={"rounded-lg shadow-2xl border-2"}
          />
          <div className={"lg:mr-20 capitalize"}>
            <h2 className={"text-4xl font-bold mb-10"}>{planet.name}</h2>
            <p>Climate: {planet.climate}</p>
            <p>Surface Water: {planet.surfaceWater} %</p>
            <p>Population: {planet.population}</p>
            <p>Terrain: {planet.terrain}</p>
            <p>Diameter: {planet.diameter}</p>
            <p>Gravity: {planet.gravity}</p>
            <p>Orbital Period: {planet.orbitalPeriod} days</p>
            <p>Rotation Period: {planet.rotationPeriod} days</p>
            <div className={"mt-10 border rounded-lg p-2"}>
              <div>Residents :</div>
              <div>Related Movies:</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanetPage;
