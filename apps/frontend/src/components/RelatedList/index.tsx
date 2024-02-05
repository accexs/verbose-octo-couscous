import React from "react";
import Image from "next/image";
import { RelatedEntityType } from "@/domain/types";
import Link from "next/link";

type RelatedListProps = {
  title: string;
  entityList: Array<RelatedEntityType>;
};

const RelatedList: React.FC<RelatedListProps> = ({
  entityList,
  title,
}: RelatedListProps) => {
  return (
    <div className={"my-4"}>
      <h3>{title}</h3>
      <div className={"mt-2 grid grid-cols-3 gap-2"}>
        {entityList.map((entity: RelatedEntityType, index) => {
          return (
            <div key={index} className="avatar relative">
              <div className="w-24 mask mask-squircle">
                <Link href={entity.href}>
                  <Image
                    src={entity.imagePath}
                    alt={entity.name}
                    width={400}
                    height={400}
                    className={
                      "aspect-square transition-all duration-150 hover:scale-105"
                    }
                  />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RelatedList;
