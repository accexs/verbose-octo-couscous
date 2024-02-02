import React from "react";
import { getPlanets } from "@/services/ApiClient";

const PlanetsPage: React.FC = async () => {
  const planets = await getPlanets();
  return (
    <div>
      <h1>All planets</h1>
      <pre>{JSON.stringify(planets, null, 2)}</pre>
    </div>
  );
};

export default PlanetsPage;
