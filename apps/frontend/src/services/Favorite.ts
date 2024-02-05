const FAVORITES_KEY = "myFavorites";

const getFavorites = (): string[] => {
  const favorites = window.localStorage.getItem(FAVORITES_KEY);
  return favorites ? JSON.parse(favorites) : [];
};

const setAsFavorite = (id: string) => {
  const favorites = getFavorites();
  const updatedFavorites = [...favorites, id];
  window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
};

export const removeFavoriteString = (id: string) => {
  const favorites = getFavorites();
  const updatedFavorites = favorites.filter((str: string) => str !== id);
  window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
};

const isIdInFavorites = (id: string) => {
  const favorites = getFavorites();
  return favorites.includes(id);
};

const toggleFavorite = (id: string) => {
  const favorites = getFavorites();
  const isFavorite = favorites.includes(id);

  if (isFavorite) {
    removeFavoriteString(id);
  } else {
    setAsFavorite(id);
  }
};

export { toggleFavorite, isIdInFavorites, getFavorites };
