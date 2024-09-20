import React from "react";
import Image from "next/image";

const Animals = ({ animals }) => {
  return (
    <section className="container mx-auto">
      <div className="grid w-full grid-cols-6">
        {animals.length > 0 ? (
          animals.map((animal) => (
            <div
              className="flex flex-col mb-2 items-center justify-center"
              key={animal._id}
            >
              {" "}
              <Image
                src={animal.image}
                width={160}
                height={191}
                alt={`Picture of the author ${animal.animal_name}`}
              />
              <p className="text-lg font-thin">
                {animal.animal_name.toUpperCase()}
              </p>
            </div>
          ))
        ) : (
          <div className="flex h-96 w-full justify-center items-center">
            <p>No animals found!!</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Animals;
