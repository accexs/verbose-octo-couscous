import React from "react";
import { getCharacters } from "@/services/ApiClient";
import CharacterList from "../../components/Character/CharacterList";

const CharactersPage: React.FC = async () => {
  const characters = await getCharacters();
  return (
    <div className={'mt-12 flex flex-col'}>
      <CharacterList characterList={characters} />
    </div>
  );
};

export default CharactersPage;
