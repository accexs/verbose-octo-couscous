import React from "react";
import Image from "next/image";
import Link from "next/link";

type MovieCardProps = {
  movie: any;
};

const MovieCard: React.FC<MovieCardProps> = ({ movie }: MovieCardProps) => {
  return (
    <div className={"group flex flex-col items-center h-full"}>
      <div
        className={
          "card card-side bg-base-100 shadow-xl h-full transition-all duration-300 group-hover:border-warning border-2"
        }
      >
        <figure>
          <Image
            src={`/images/movies/${movie.extId}.jpg`}
            alt={"Movie picture"}
            width={150}
            height={200}
            className={
              "h-full w-full object-cover object-center transition-all duration-300 group-hover:scale-105"
            }
          />
        </figure>
        <div className={"card-body"}>
          <h3
            className={
              "card-title transition-all duration-300 group-hover:text-warning"
            }
          >
            {movie.title}
          </h3>
          <p className={"text-sm"}>Release date: {movie.releaseDate}</p>
          <div className={"card-actions justify-end"}>
            <Link
              className={"btn btn-sm btn-warning"}
              href={`/movies/${movie._id}`}
            >
              More details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
