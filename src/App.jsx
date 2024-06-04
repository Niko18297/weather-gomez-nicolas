import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import WeatherCard from './components/WeatherCard';
const key = '79185023bb18b034f2bf4c2e376ad2e2'

function App() {
  
  const [weather, setWeather] = useState();
  const [coords, setCoords] = useState();
  const [temp, setTemp] = useState();
  const [isLoading, setIsLoading] = useState(true);
  
  const success = (pos) => {
   console.log(pos);
   setCoords({
    lat: pos.coords.latitude,
    lon: pos.coords.longitude,
  });
   
  }
  
  useEffect(() => {
     navigator.geolocation.getCurrentPosition(success);
       },[]);

  useEffect(() => {
    if (coords) {
      
    const {lat, lon} = coords;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`;
    axios.get(url)
    .then(res => {
      const kel = res.data.main.temp;
      const cel = (kel - 273.15).toFixed(2);
      const fah = (cel *9/5 + 32).toFixed(2);
      setTemp({cel: cel, fah: fah})
      setWeather(res.data)})
    .catch(err => console.log(err))
    .finally(() => {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    });
  }
  }, [coords]);
  
      
  

  return (
   <div className='app'>
    {
      isLoading ? 
      <figure className='app__img'>
        <img src="https://lh3.googleusercontent.com/proxy/xKp9u_l-R_ltGvNHclAindXcVAmIfCeXtfA4tr98SvL2cV1tKqydrpoWlQjOSeopJ6Awc8ubufTCZnkg7KyrPpP_q2sTwZbyo2M0GCVSqFMXiL5WUXgz0r0HO0VcqKAKiw" alt="is loading" />
      </figure>
    :
    <WeatherCard
    weather= {weather}
    temp= {temp}
    />
}
   </div>
  )
}

export default App;


