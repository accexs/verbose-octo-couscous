import React from "react";
import { getStarshipById } from "@/services/ApiClient";
import { EntityPageProps } from "@/domain/types";

const StarshipPage: React.FC<EntityPageProps> = async ({
  params,
}: EntityPageProps) => {
  const starship = await getStarshipById(params.id);
  return (
    <div>
      <h1>Starship Page</h1>
      <p>ID: {params.id}</p>
      <pre>{JSON.stringify(starship, null, 2)}</pre>
    </div>
  );
};

export default StarshipPage;
