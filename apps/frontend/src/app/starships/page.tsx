import React, { Suspense } from "react";
import { QueryParamsProps } from "@/domain/types";
import Loading from "@/app/loading";
import StarshipList from "@/components/Starship/StarshipList";

const StarshipsPage: React.FC<QueryParamsProps> = async ({
  searchParams,
}: QueryParamsProps) => {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <div className={"mt-4 flex flex-col"}>
      <Suspense key={currentPage} fallback={<Loading />}>
        <StarshipList currentPage={currentPage} />
      </Suspense>
    </div>
  );
};

export default StarshipsPage;
