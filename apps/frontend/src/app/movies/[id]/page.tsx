import React from "react";
import { getMovieById } from "@/services/ApiClient";
import { EntityPageProps } from "@/domain/types";

const MoviePage: React.FC<EntityPageProps> = async ({
  params,
}: EntityPageProps) => {
  const movie = await getMovieById(params.id);
  return (
    <div>
      <h1>Movie Page</h1>
      <p>ID: {params.id}</p>
      <pre>{JSON.stringify(movie, null, 2)}</pre>
    </div>
  );
};

export default MoviePage;
