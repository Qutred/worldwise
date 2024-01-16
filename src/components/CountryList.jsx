import CountryItem from './CountryItem'
import styles from './CountryList.module.css'
import Message from './Message'
import Spinner from './Spinner'

const CountryList = ({cities, isLoading}) => {
  if (isLoading) return <Spinner />
  console.log(cities)

  if (!cities.length)
    return <Message message='Add your first city by clicking city on the map' />

  const countries = cities.reduce((arr, city) => {
    if (!arr.map(el => el.country).includes(city.country)) {
      return [...arr, {country: city.country, id: city.id, emoji: city.emoji}]
    } else {
      return arr
    }
  }, [])

  return (
    <ul className={styles.countryList}>
      {countries.map(country => (
        <CountryItem key={country.id} country={country} />
      ))}
    </ul>
  )
}

export default CountryList
