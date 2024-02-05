"use client";
import React, { useEffect, useState } from "react";
import { getFavorites, isIdInFavorites } from "@/services/Favorite";

const FavoriteList: React.FC = () => {
  const [favorites, setFavorites] = useState(getFavorites());

  return (
    <div>
      <h2>This are your favorites</h2>
      {getFavorites().map((favorite, index) => {
        return <div key={index}>{favorite}</div>;
      })}
    </div>
  );
};

export default FavoriteList;
