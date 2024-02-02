import { StarWarsEntityTypes } from "@/domain/types";

const apiUri = process.env.BACKEND_URL ?? "http://localhost:4000";
const getCharacters = async (query: string = "") => {
  return await fetchEntityList("characters", query);
};

const getMovies = async (query: string = "") => {
  return await fetchEntityList("movies", query);
};

const getPlanets = async (query: string = "") => {
  return await fetchEntityList("planets", query);
};

const getStarships = async (query: string = "") => {
  return await fetchEntityList("starships", query);
};

const getCharacterById = async (id: string) => {
  return await fetchEntityById(id, "characters");
};

const getMovieById = async (id: string) => {
  return await fetchEntityById(id, "movies");
};

const getPlanetById = async (id: string) => {
  return await fetchEntityById(id, "planets");
};

const getStarshipById = async (id: string) => {
  return await fetchEntityById(id, "starships");
};

const fetchEntityList = async (
  entityName: StarWarsEntityTypes,
  query: string = "",
) => {
  const res = await fetch(`${apiUri}/${entityName}?${query}`);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
};

const fetchEntityById = async (id: string, entityName: StarWarsEntityTypes) => {
  const res = await fetch(`${apiUri}/${entityName}/${id}`);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
};

export {
  getCharacters,
  getMovies,
  getStarships,
  getPlanets,
  getMovieById,
  getPlanetById,
  getStarshipById,
  getCharacterById,
};
