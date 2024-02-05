import React from "react";
import FavoriteList from "@/components/Favorite/FavoriteList";

const Home: React.FC = () => {
  return (
    <main className={"flex flex-col items-center justify-center"}>
      <div>
        <h1>MY STAR WARS CODEX</h1>
      </div>
      <FavoriteList />
    </main>
  );
};

export default Home;
