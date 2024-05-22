import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "../../assets/css/PaisInfos.css";

const PaisInfos = () => {
  const navigate = useNavigate();
  const params = useParams();
  const countryName = params.countryName;
  const [loading, setLoading] = useState(false);
  const [pais, setPais] = useState({
    name: "",
    sigla: "",
    official: "",
    flagImg: "",
    population: 0,
    region: "",
    subregion: "",
    capital: "",
    currencies: {},
    languages: [],
    borders: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const pais = ""
      const fetchData = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
      const res = await fetchData.json();
      setPais({
        ...pais,
        name: res[0].name.common,
        sigla: res[0].cioc,
        official: res[0].name.official,
        flagImg: res[0].flags.png,
        population: res[0].population,
        region: res[0].region,
        subregion: res[0].subregion,
        capital: res[0].capital,
        currencies: res[0].currencies,
        languages: res[0].languages,
        borders: res[0].borders,
      });
      setLoading(false);
    };
    fetchData();
  }, [countryName]);

  let languages;
  languages = Object.values(pais.languages);

  let borders = [];
  borders = pais.borders;

  let currencies;
  currencies = Object.values(pais.currencies);

  return loading ? (
    <div>Loading . . .</div>
  ) : (
    <div className="paisDetalhes">
      <button
      className="botaoVolta"
        onClick={() => navigate(-1)}
      >
        Voltar
      </button>
      <div className="bodyPaisDetalhes">
        <div className="imgContainer">
          <img src={pais.flagImg} alt="Bandeira do Pais" />
        </div>
        <div className="conteudoPaisDetalhes">
          <div className="nomePaisDetalhes">
            <h1>{pais.name}</h1>
          </div>
          <div className="paisDetalhesInfo">
            <section>
              <p>
                Nome Oficial: <span> {`${countryName} (${pais.sigla})`}</span>
              </p>
              <p>
                População: <span> {pais.population.toLocaleString('pt-BR')}</span>
              </p>
              <p>
                Região: <span> {pais.region}</span>
              </p>
              <p>
                Sub Região: <span> {pais.subregion}</span>
              </p>
              <p>
                Capital: <span> {pais.capital}</span>
              </p>
            </section>
            <section>
              <p>
                Moeda:{" "}
                <span>
                  {currencies?.map(
                    (currency, index) =>
                      currency.name +
                      `${index === currencies.length - 1 ? "" : " , "} `
                  )}
                </span>
              </p>
              <p>
                Línguas:{" "}
                <span>
                  {languages?.map(
                    (language, index) =>
                      language +
                      `${index === languages.length - 1 ? "" : " , "} `
                  )}
                </span>
              </p>
            </section>
          </div>
          <div>
            <p>
              Fronteiras:
              {borders !== undefined &&
                pais.borders.map((border) => <span key={border}>{` ${border} `}</span>)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaisInfos;