import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/css/Home.css";
import Pais from "../../components/pais/Pais.jsx";

const url = "https://restcountries.com/v3.1/all";

const Home = () => {
  const [paises, setPaises] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const semPaises = paises.status || paises.message;

  const showDetails = (code) => {
    navigate(`/${code}`);
  };

  useEffect(() => {
    try {
      let response = [];
      const fetchData = async () => {
        setLoading(true);
        response = await fetch(url)
          .then((res) => {
            return res.json();
          })
          .then(setLoading(false));
        setPaises(response);
      };
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="container">
      <header>
        <h1>Países</h1>
      </header>
      {
        loading ? (
          <div>
            Loading . . .
          </div>
        ) : (
          <>
            <div>
              <section className="paises">
                {!semPaises ? (
                  paises?.map((pais, index) => {
                    return (
                      <Pais
                        key={index}
                        code={pais.name.common}
                        name={pais.name.common}
                        capital={pais.capital}
                        population={pais.population.toLocaleString('pt-BR')}
                        flag={pais.flags.png}
                        region={pais.region}
                        showDetails={showDetails}
                      />
                    );
                  })
                ) : (
                  <p>Nenhum país encontrado</p>
                )}
              </section>
            </div>
          </>
        )
      }
    </div>
  );
};

export default Home;