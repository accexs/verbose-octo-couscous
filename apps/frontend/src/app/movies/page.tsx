import React from "react";
import { getMovies } from "@/services/ApiClient";

const MoviesPage: React.FC = async () => {
  const movies = await getMovies();
  return (
    <div>
      <h1>All movies</h1>
      <pre>{JSON.stringify(movies, null, 2)}</pre>
    </div>
  );
};

export default MoviesPage;
