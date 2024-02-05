import React from "react";
import Image from "next/image";
import Link from "next/link";

type StarshipCardProps = {
  starship: any;
};

const StarshipCard: React.FC<StarshipCardProps> = ({
  starship,
}: StarshipCardProps) => {
  return (
    <div className={"group flex flex-col items-center"}>
      <div
        className={
          "shadow-xl transition-all duration-300 group-hover:border-warning border-2 overflow-hidden rounded-xl"
        }
      >
        <div className={"h-56 relative"}>
          <Image
            src={`/images/starships/${starship.extId}.jpg`}
            alt={"Character picture"}
            width={150}
            height={200}
            className={
              "aspect-video h-full w-full object-cover object-center transition-all duration-300 group-hover:scale-105"
            }
          />
          {/*<div className={"absolute w-full top-0 text-center bg-black h-1/6"}>Titulo</div>*/}
          <div
            className={
              "absolute w-full bottom-0 text-center bg-black h-1/5 flex justify-between items-center"
            }
          >
            <div className={"pl-3 text-xl capitalize"}>
              <h3>{starship.name}</h3>
            </div>
            <div className={"pr-3"}>
              <Link
                className={"btn btn-warning btn-sm"}
                href={`/starships/${starship._id}`}
              >
                Details
              </Link>{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StarshipCard;
