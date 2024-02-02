import React, { Suspense } from "react";
import Loading from "@/app/loading";
import { QueryParamsProps } from "@/domain/types";
import CharacterList from "@/components/Character/CharacterList";

const CharactersPage: React.FC<QueryParamsProps> = async ({ searchParams }) => {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <div className={"mt-4 flex flex-col"}>
      <Suspense key={currentPage} fallback={<Loading />}>
        <CharacterList currentPage={currentPage} />
      </Suspense>
    </div>
  );
};

export default CharactersPage;
