import React, { Suspense } from "react";
import Loading from "@/app/loading";
import { QueryParamsProps } from "@/domain/types";
import MovieList from "@/components/Movie/MovieList";

const MoviesPage: React.FC<QueryParamsProps> = async ({ searchParams }) => {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <div className={"mt-4 flex flex-col"}>
      <Suspense key={currentPage} fallback={<Loading />}>
        <MovieList currentPage={currentPage} />
      </Suspense>
    </div>
  );
};

export default MoviesPage;
