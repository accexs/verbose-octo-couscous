export type EntityPageProps = {
  params: { id: string };
};

export type RelatedEntityType = {
  id: string;
  name: string;
  imagePath: string;
  href: string;
};

export type StarWarsEntityTypes =
  | "characters"
  | "planets"
  | "movies"
  | "starships";

export type QueryParamsProps = {
  searchParams: {
    page?: string;
    query?: string;
  };
};

export type PaginatorPropsType = {
  currentPage: number;
  totalPages: number;
};
