import React from "react";
import { getMovies } from "@/services/ApiClient";
import Paginator from "@/components/Paginator";
import MovieCard from "@/components/Movie/MovieList/MovieCard";

type MovieListProps = {
  currentPage: number;
};

const MOVIES_PER_PAGE = 6;

const MovieList: React.FC<MovieListProps> = async ({
  currentPage,
}: MovieListProps) => {
  const { data, totalPages } = await getMovies(
    `limit=${MOVIES_PER_PAGE}&page=${currentPage}`,
  );
  return (
    <section
      className={"flex w-full flex-col items-center justify-center px-2 lg:px-32"}
    >
      <div className={"flex w-full justify-between"}>
        <h2 className={"inline-block text-4xl font-bold capitalize"}>Movies</h2>
      </div>

      <div className={"mt-8 grid lg:grid-cols-3 gap-2 md:gap-4 lg:gap-8"}>
        {data.map((movie: any) => {
          return (
            <article
              key={movie._id}
              className={"col-span-1 row-span-1 lg:max-h-52"}
            >
              <MovieCard movie={movie} />
            </article>
          );
        })}
      </div>
      <div className={"w-full flex justify-center mt-6"}>
        <Paginator currentPage={currentPage} totalPages={totalPages} />
      </div>
    </section>
  );
};

export default MovieList;
