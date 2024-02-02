import React from "react";
import Image from "next/image";
import Link from 'next/link';

type CharacterCardProps = {
  character: any;
};

const CharacterCard: React.FC<CharacterCardProps> = ({
  character,
}: CharacterCardProps) => {
  return (
    <div className={"group flex flex-col items-center h-full"}>
      <div className={"card card-side bg-base-100 shadow-xl h-full transition-all duration-300 group-hover:border-warning border-2"}>
        <figure>
          <Image
            src={`/images/characters/${character.extId}.jpg`}
            alt={"Character picture"}
            width={450}
            height={800}
            className={"h-full w-full object-cover object-center transition-all duration-300 group-hover:scale-105"}
          />
        </figure>
        <div className={"card-body"}>
          <h3 className={"card-title transition-all duration-300 group-hover:text-warning"}>{character.name}</h3>
          <p>Birth : {character.birthYear}</p>
          <div className={"card-actions justify-end"}>
            <Link href={`/characters/${character._id}`}>
              <button className={"btn btn-primary"}>More details</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;
