"use client";
import React, { useEffect, useState } from "react";
import { isIdInFavorites, toggleFavorite } from "@/services/Favorite";

type FavoriteProps = {
  id: string;
};

const Favorite: React.FC<FavoriteProps> = ({ id }: FavoriteProps) => {
  const [isFavorite, setFavorite] = useState(false);
  const handleIconClick = () => {
    setFavorite(!isFavorite);
    toggleFavorite(id);
  };

  useEffect(() => {
    setFavorite(isIdInFavorites(id));
  }, []);

  return (
    <div
      className={"absolute top-0 right-0 cursor-pointer p-2 z-10"}
      onClick={handleIconClick}
    >
      <div
        className={`mask mask-star w-6 h-6 transition-all duration-200 hover:bg-warning ${
          isFavorite ? "bg-warning" : "bg-gray-500"
        }`}
      ></div>
    </div>
  );
};

export default Favorite;
