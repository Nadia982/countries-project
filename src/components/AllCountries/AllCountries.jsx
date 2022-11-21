import React, { useState, useEffect } from "react";
import { apiURL } from "../util/api";

import SearchInput from "../Search/SearchInput";
import FilterCountry from "../FilterCountry/FilterCountry";

import { Link } from "react-router-dom";

const AllCountries = () => {
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const getAllCountries = async () => {
    try {
      const res = await fetch(`${apiURL}/all`);

      if (!res.ok) throw new Error("Something went wrong!");

      const data = await res.json();

      console.log(data);

      setCountries(data);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  const getCountryByName = async (countryName) => {
    try {
      const res = await fetch(`${apiURL}/name/${countryName}`);

      if (!res.ok) throw new Error("No countries found!");

      const data = await res.json();
      setCountries(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  const getCountryByRegion = async (regionName) => {
    try {
      const res = await fetch(`${apiURL}/region/${regionName}`);

      if (!res.ok) throw new Error("Failed............");

      const data = await res.json();
      setCountries(data);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(false);
    }
  };

  useEffect(() => {
    getAllCountries();
  }, []);

  return (
    <div className="all_country_wrapper">
      <div className="country_top">
        <div className="search">
          <SearchInput onSearch={getCountryByName} />
        </div>
        <div className="filter">
          <FilterCountry onSelect={getCountryByRegion} />
        </div>
      </div>
      <div className="country_bottom">
        {isLoading && !error && <h4>Loading..........</h4>}
        {error && !isLoading && <h4>{error}</h4>}
        {countries?.map((country) => (
          <Link to={`/country/${country.name.common}`}>
            <div className="country_card">
              <div className="country_img">
                <img src={country.flags.png} alt={country.name.common} />
              </div>
              <div className="country_data">
                <h3>{country.name.common}</h3>
                <p>
                  Population:{" "}
                  {new Intl.NumberFormat().format(country.population)}
                </p>
                <p>Region: {country.region}</p>
                <p>Capital: {country.capital}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllCountries;