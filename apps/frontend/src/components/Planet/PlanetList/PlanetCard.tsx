import React from "react";
import Image from "next/image";
import Link from "next/link";

type PlanetCardProps = {
  planet: any;
};

const PlanetCard: React.FC<PlanetCardProps> = ({ planet }: PlanetCardProps) => {
  return (
    <div className={"group flex flex-col items-center h-full"}>
      <div
        className={
          "card card-side bg-base-100 shadow-xl h-full transition-all duration-300 group-hover:border-warning border-2"
        }
      >
        <figure>
          <Image
            src={`/images/planets/${planet.extId}.jpg`}
            alt={"Planet picture"}
            width={150}
            height={200}
            className={
              "aspect-[4/4] h-full w-full object-cover object-center transition-all duration-300 group-hover:scale-105"
            }
          />
        </figure>
        <div className={"card-body flex items-center"}>
          <h3
            className={
              "card-title transition-all duration-300 group-hover:text-warning h-1/2"
            }
          >
            {planet.name}
          </h3>
          <div className={"card-actions justify-end"}>
            <Link className={"btn btn-warning"} href={`/planets/${planet._id}`}>
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanetCard;
