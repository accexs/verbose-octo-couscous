import React from "react";
import { getPlanetById } from "@/services/ApiClient";
import { EntityPageProps } from "@/domain/types";

const PlanetPage: React.FC<EntityPageProps> = async ({
  params,
}: EntityPageProps) => {
  const planet = await getPlanetById(params.id);
  return (
    <div>
      <h1>Planet Page</h1>
      <p>ID: {params.id}</p>
      <pre>{JSON.stringify(planet, null, 2)}</pre>
    </div>
  );
};

export default PlanetPage;
