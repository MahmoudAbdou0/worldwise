import PropTypes from "prop-types";

import Spinner from "./Spinner";
import styles from "./CountryList.module.css";
import CountryItem from "./CountryItem";
import Message from "./Message";
import { useCities } from "../contexts/CitiesContext";

function CountryList() {
  const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message
        message="Add your first city 
        by clicking on a city on the map"
      />
    );

  const countries = cities.reduce((arr, city) => {
    if (!arr.map((ele) => ele.country).includes(city.country))
      return [
        ...arr,
        { country: city.country, emoji: city.emoji, id: city.id },
      ];
    else return arr;
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.id} />
      ))}
    </ul>
  );
}

CountryList.propTypes = {
  cities: PropTypes.array,
  countries: PropTypes.array,
  isLoading: PropTypes.bool,
  map: PropTypes.func,
};

export default CountryList;
