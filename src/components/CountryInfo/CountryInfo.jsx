import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { apiURL } from "../util/api";
import { Link } from "react-router-dom";

const CountryInfo = () => {
  const [country, setCountry] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const { countryName } = useParams();

  const getCountryByName = async () => {
    try {
      const res = await fetch(`${apiURL}/name/${countryName}`);

      if (!res.ok) throw new Error("Could not find!");

      const data = await res.json();

      setCountry(data);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  useEffect(() => {
    getCountryByName();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countryName]);

  return (
    <div className="country_info_wrapper">
      <button>
        <Link to="/">Back</Link>
      </button>
      {error ? "There is an error" : null}
      {isLoading ? "Loading...." : null}
      {country?.map((country, index) => (
        <div className="country_info_container" key={index}>
          <div className="country_info-img">
            <img src={country.flags.png} alt={country.name} />
          </div>

          <div className="country_info">
            <div className="country_info-left">
              <h3 id="country_info_title">{country.name.common}</h3>
              <h5>
                Population:{" "}
                <span>
                  {new Intl.NumberFormat().format(country.population)}
                </span>
              </h5>
              <h5>
                Region: <span>{country.region}</span>
              </h5>
              <h5>
                Sub-region: <span>{country.subregion}</span>
              </h5>
              <h5>
                Capital: <span>{country.capital}</span>
              </h5>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default CountryInfo;
