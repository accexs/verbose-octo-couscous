"use client";
import React, { useEffect, useState } from "react";
import { getFavorites } from "@/services/Favorite";

const FavoriteList: React.FC = () => {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const allFavorites = getFavorites();
    setFavorites(allFavorites);
  }, []);

  return (
    <div>
      <h2>This are your favorites</h2>
      {favorites.map((favorite, index) => {
        return <div key={index}>{favorite}</div>;
      })}
    </div>
  );
};

export default FavoriteList;
