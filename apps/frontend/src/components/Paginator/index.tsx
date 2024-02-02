"use client";
import React from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { PaginatorPropsType } from "@/domain/types";

const Paginator: React.FC<PaginatorPropsType> = ({
  currentPage,
  totalPages,
}: PaginatorPropsType) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className={"join"}>
      <Link
        className={`join-item btn btn-warning ${
          currentPage <= 1 ? "btn-disabled" : ""
        }`}
        href={createPageURL(currentPage - 1)}
      >
        «
      </Link>
      <button className={"join-item btn btn-warning pointer-events-none"}>
        Page {currentPage}
      </button>
      <Link
        className={`join-item btn btn-warning ${
          currentPage >= totalPages ? "btn-disabled" : ""
        }`}
        href={createPageURL(currentPage + 1)}
      >
        »
      </Link>
    </div>
  );
};

export default Paginator;
