import { RelatedEntityType } from "@/domain/types";

function romanize(num: number): string {
  let lookup: Record<string, number> = {
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1,
  };

  let roman = "";

  for (let i in lookup) {
    while (num >= lookup[i]) {
      roman += i;
      num -= lookup[i];
    }
  }

  return roman;
}

const getRelatedMovies = (movieList: any[]): RelatedEntityType[] => {
  return movieList.map((movie: any): RelatedEntityType => {
    return {
      id: movie.id,
      name: movie.title,
      imagePath: `/images/movies/${movie.extId}.jpg`,
      href: `/movies/${movie._id}`,
    };
  });
};

const getRelatedCharacters = (characterList: any[]): RelatedEntityType[] => {
  return characterList.map((character: any): RelatedEntityType => {
    return {
      id: character.id,
      name: character.name,
      imagePath: `/images/characters/${character.extId}.jpg`,
      href: `/characters/${character._id}`,
    };
  });
};

const getRelatedPlanets = (planetList: any[]): RelatedEntityType[] => {
  return planetList.map((planet: any): RelatedEntityType => {
    return {
      id: planet.id,
      name: planet.name,
      imagePath: `/images/planets/${planet.extId}.jpg`,
      href: `/planets/${planet._id}`,
    };
  });
};

const getRelatedStarships = (starshipList: any[]): RelatedEntityType[] => {
  return starshipList.map((starship: any): RelatedEntityType => {
    return {
      id: starship.id,
      name: starship.name,
      imagePath: `/images/starships/${starship.extId}.jpg`,
      href: `/starships/${starship._id}`,
    };
  });
};

export {
  romanize,
  getRelatedMovies,
  getRelatedStarships,
  getRelatedCharacters,
  getRelatedPlanets,
};
