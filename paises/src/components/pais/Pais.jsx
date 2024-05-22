import React from "react";

const Pais = ({
  name,
  capital,
  population,
  flag,
  region,
  showDetails,
  code,
}) => {
  const showDetailsHandler = () => {
    showDetails(code);
  };

  return (
    <div
    className="pais"
      onClick={showDetailsHandler}
    >
      <picture>
        <img src={flag} alt="Bandeira do País" />
      </picture>
      <section>
        <h2>{name}</h2>
        <p>
          <span className="paisInfo">Population: </span>
          {population}
        </p>
        <p>
          <span className="paisInfo"> Capital: </span>
          {capital}
        </p>
        <p>
          <span className="paisInfo">Region: </span>
          {region}
        </p>
      </section>
    </div>
  );
};

export default Pais;