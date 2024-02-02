import { StarWarsEntityTypes } from "@/domain/types";

const apiUri = "http://localhost:4000";
const getCharacters = async () => {
  return await fetchEntityList("characters");
};

const getMovies = async () => {
  return await fetchEntityList("movies");
};

const getPlanets = async () => {
  return await fetchEntityList("planets");
};

const getStarships = async () => {
  return await fetchEntityList("starships");
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

const fetchEntityList = async (entityName: StarWarsEntityTypes) => {
  const res = await fetch(`${apiUri}/${entityName}`);
  await new Promise((resolve) => setTimeout(resolve, 3000));
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
};

const fetchEntityById = async (id: string, entityName: StarWarsEntityTypes) => {
  const res = await fetch(`${apiUri}/${entityName}/${id}`);
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
